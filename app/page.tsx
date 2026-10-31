"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeftRight,
  AudioLines,
  ChevronRight,
  CircleHelp,
  Dices,
  Expand,
  Home,
  Landmark,
  Pause,
  Play,
  Radio,
  RotateCcw,
  ShieldCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { BOARD, GROUPS, PLAYER_STYLES } from "@/lib/game-data";
import {
  Action,
  OrbitState,
  Trade,
  Trader,
  buildReason,
  buildingCost,
  createGame,
  inventory,
  netWorth,
  orbitReducer,
  ownerOf,
  rentFor,
  rents,
} from "@/lib/orbit-engine";
import OrbitBoard from "@/components/game/OrbitBoard";
import LocationScene from "@/components/game/LocationScene";

const SAVE = "capital-wars-orbit-v2";
const money = (n: number) => `◈ ${Math.round(n).toLocaleString("en")}`;
const LEVELS = [
  "Land only",
  "1 house",
  "2 houses",
  "3 houses",
  "4 houses",
  "Hotel",
];
export default function CapitalWars() {
  const [game, setGame] = useState<OrbitState | null>(null),
    [saved, setSaved] = useState<OrbitState | null>(null),
    [count, setCount] = useState(2),
    [mode, setMode] = useState<"classic" | "sprint">("classic"),
    [names, setNames] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null),
    [rules, setRules] = useState(false),
    [trading, setTrading] = useState(false),
    [rolling, setRolling] = useState(false),
    [preview, setPreview] = useState(0),
    [motion, setMotion] = useState(true),
    [paused, setPaused] = useState(false),
    [restart, setRestart] = useState(false),
    [saveError, setSaveError] = useState(false);
  const [displayDice, setDisplayDice] = useState<[number, number]>([1, 1]);
  const rollingRef = useRef(false);
  const [travel, setTravel] = useState<number | null>(null);
  const dispatch = (a: Action) => setGame((s) => (s ? orbitReducer(s, a) : s));
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVE);
      if (raw) {
        const s = JSON.parse(raw);
        if (
          s.version === 2 &&
          s.players?.length >= 2 &&
          s.players.every(
            (p: Trader) => p.position >= 0 && p.position < BOARD.length,
          ) &&
          s.phase !== "over"
        )
          setSaved(s);
      }
    } catch {
      setSaveError(true);
    }
  }, []);
  useEffect(() => {
    if (game) {
      try {
        localStorage.setItem(SAVE, JSON.stringify(game));
        setSaveError(false);
      } catch {
        setSaveError(true);
      }
    }
  }, [game]);
  useEffect(() => {
    if (
      !game ||
      paused ||
      rolling ||
      game.phase === "over" ||
      rules ||
      selected !== null ||
      trading
    )
      return;
    const t = window.setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(t);
  }, [!!game, paused, rolling, game?.phase, rules, selected, trading]);
  const start = () => {
    setGame(createGame(count, mode, names));
    setSelected(null);
    setPaused(false);
  };
  const roll = async () => {
    if (!game || rollingRef.current || paused) return;
    rollingRef.current = true;
    setRolling(true);
    for (let i = 0; i < 8; i++) {
      setDisplayDice([
        1 + Math.floor(Math.random() * 6),
        1 + Math.floor(Math.random() * 6),
      ]);
      await new Promise((r) => setTimeout(r, 65));
    }
    const d: [number, number] = [
      1 + Math.floor(Math.random() * 6),
      1 + Math.floor(Math.random() * 6),
    ];
    setDisplayDice(d);
    const p = game.players[game.current];
    if (
      !p.frozen &&
      !(game.doubles === 2 && d[0] === d[1]) &&
      (p.jail < 0 || d[0] === d[1] || p.jail === 2)
    ) {
      for (let step = 1; step <= d[0] + d[1]; step++) {
        setTravel((p.position + step) % BOARD.length);
        await new Promise((r) => setTimeout(r, 95));
      }
    }
    setTravel(null);
    dispatch({ type: "ROLL", dice: d });
    setRolling(false);
    rollingRef.current = false;
  };
  const scene =
      travel ?? (game ? game.players[game.current].position : preview),
    player = game?.players[game.current];
  const debtor = game?.debt[0] ? game.players[game.debt[0].payer] : null,
    manager = debtor || player;
  const space = selected !== null ? BOARD[selected] : null,
    owner = game && space ? ownerOf(game, space.id) : undefined;
  const unresolved =
    (game?.pending !== null && game?.pending !== undefined) ||
    !!game?.auction ||
    !!game?.card ||
    !!game?.debt.length ||
    !!game?.trade;
  const select = (id: number) => {
    if (game) setSelected(id);
    else setPreview(id);
  };
  return (
    <main className={`capital-app ${!motion ? "motion-off" : ""}`}>
      <LocationScene space={scene} />
      <div className="scene-vignette" />
      <header className="topbar">
        <a href="/" className="brand" aria-label="Capital Wars home">
          <span className="brand-symbol">
            C<span>W</span>
          </span>
          <div>
            CAPITAL WARS<small>THE ORBITAL ECONOMY</small>
          </div>
        </a>
        <div className="top-status">
          <i /> {game ? "EXCHANGE OPEN" : "ACCELERATOR ONLINE"}{" "}
          <span>2050</span>
        </div>
        <nav>
          <button
            title={
              motion ? "Reduce background motion" : "Enable background motion"
            }
            aria-label={
              motion ? "Reduce background motion" : "Enable background motion"
            }
            onClick={() => setMotion(!motion)}
          >
            <AudioLines size={17} />
          </button>
          <button onClick={() => setRules(true)}>
            <CircleHelp size={16} />
            <span>How to play</span>
          </button>
          {game && (
            <button onClick={() => setPaused(true)}>
              <Pause size={16} />
              <span>Pause</span>
            </button>
          )}
        </nav>
      </header>
      {!game ? (
        <>
          <div className="lobby-layout">
            <section className="lobby-copy">
              <div className="edition">
                <span>01 / ORBITAL EDITION</span>
                <i /> A WORLD IN MOTION
              </div>
              <h1>
                Wealth has
                <br />a new <em>orbit.</em>
              </h1>
              <p className="lede">
                The world is your portfolio. Buy the skyline. Own the networks.
                Build an empire that survives the next shock.
              </p>
              <div className="feature-strip">
                <span>
                  <Landmark size={15} /> Own & develop
                </span>
                <span>
                  <ArrowLeftRight size={15} /> Trade & outbid
                </span>
                <span>
                  <Zap size={15} /> Survive the pulse
                </span>
              </div>
              <section className="setup-panel">
                <div className="panel-label">
                  <span>CONFIGURE YOUR SESSION</span>
                  <span>LOCAL MULTIPLAYER</span>
                </div>
                <div className="setup-row">
                  <div>
                    <label>PLAYERS</label>
                    <div className="segmented">
                      {[2, 3, 4].map((n) => (
                        <button
                          key={n}
                          aria-pressed={count === n}
                          onClick={() => setCount(n)}
                          className={count === n ? "active" : ""}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mode-picker">
                    <label>GAME MODE</label>
                    <div className="segmented">
                      <button
                        className={mode === "classic" ? "active" : ""}
                        onClick={() => setMode("classic")}
                      >
                        Classic
                      </button>
                      <button
                        className={mode === "sprint" ? "active" : ""}
                        onClick={() => setMode("sprint")}
                      >
                        60-min Sprint
                      </button>
                    </div>
                  </div>
                </div>
                <div className="name-inputs">
                  {PLAYER_STYLES.slice(0, count).map((p, i) => (
                    <label key={i}>
                      <i style={{ background: p.color }} />
                      <input
                        aria-label={`Player ${i + 1} name`}
                        value={names[i] || ""}
                        maxLength={24}
                        placeholder={p.name}
                        onChange={(e) =>
                          setNames((a) => {
                            const n = [...a];
                            n[i] = e.target.value;
                            return n;
                          })
                        }
                      />
                    </label>
                  ))}
                </div>
                <p className="mode-note">
                  {mode === "classic"
                    ? "Last solvent player wins. No round limit."
                    : "60 minutes of active play. Highest net worth wins."}{" "}
                  Pass the device to take turns.
                </p>
                <button className="primary" onClick={start}>
                  ENTER THE ACCELERATOR <ArrowRight size={19} />
                </button>
                {saved && (
                  <button
                    className="resume"
                    onClick={() => {
                      setGame(saved);
                      setDisplayDice(saved.dice);
                    }}
                  >
                    <Play size={14} /> Resume saved session{" "}
                    <span>Turn {saved.turn + 1}</span>
                  </button>
                )}
              </section>
              <div className="lobby-footer">
                <ShieldCheck size={14} /> Automatic rent, auctions &
                settlements. Your session saves here.
              </div>
            </section>
            <section className="lobby-board">
              <div className="board-heading">
                <span>THE WORLD EXCHANGE</span>
                <span>
                  LIVE BOARD PREVIEW <Radio size={13} />
                </span>
              </div>
              <OrbitBoard state={null} selected={preview} onSelect={select}>
                <span className="core-kicker">DESTINATION SPOTLIGHT</span>
                <span className="core-coordinates">
                  {String(preview).padStart(2, "0")} / 32
                </span>
                <h2>{BOARD[preview].name}</h2>
                <div className="core-divider" />
                <p>
                  {BOARD[preview].region || "Global exchange"}
                  <br />
                  {BOARD[preview].cost
                    ? `${money(BOARD[preview].cost!)} acquisition`
                    : "Every orbit starts somewhere."}
                </p>
                <span className="core-hint">SELECT A SECTOR TO EXPLORE</span>
              </OrbitBoard>
              <div className="board-caption">
                <span>32 DESTINATIONS / 6 COLOUR SETS</span>
                <span>BUY. BUILD. BEND THE ECONOMY.</span>
              </div>
            </section>
          </div>
          <footer className="bottom-bar">
            <span>CAPITAL WARS / AN ORIGINAL PROPERTY STRATEGY GAME</span>
            <button onClick={() => setRules(true)}>
              THE RULES OF THIS WORLD <ChevronRight size={12} />
            </button>
          </footer>
        </>
      ) : (
        <>
          <div className="session-bar">
            <span>
              <i style={{ background: player!.color }} />
              {player!.name}&apos;s turn
            </span>
            <span>
              TURN {game.turn + 1} <b>/</b>{" "}
              {game.mode === "classic"
                ? "CLASSIC · LAST PLAYER STANDING"
                : `${Math.floor(game.remaining / 60)
                    .toString()
                    .padStart(
                      2,
                      "0",
                    )}:${(game.remaining % 60).toString().padStart(2, "0")} · SPRINT`}
            </span>
            <span className="autosave">
              {saveError ? "SAVE UNAVAILABLE" : "SAVED ON THIS DEVICE"}{" "}
              <ShieldCheck size={12} />
            </span>
          </div>
          <div className="play-layout">
            <section className="exchange-floor">
              <div className="board-heading">
                <span>
                  <Radio size={12} /> CAPITAL ACCELERATOR
                </span>
                <span>NOW AT / {BOARD[scene].region || "GLOBAL"}</span>
              </div>
              <OrbitBoard
                state={
                  travel === null
                    ? game
                    : {
                        ...game,
                        players: game.players.map((p) =>
                          p.id === game.current
                            ? { ...p, position: travel }
                            : p,
                        ),
                      }
                }
                selected={selected ?? undefined}
                onSelect={select}
              >
                <span className="core-kicker">CURRENT DESTINATION</span>
                <h2>{BOARD[scene].name}</h2>
                <p className="destination-kind">
                  {BOARD[scene].group
                    ? GROUPS[BOARD[scene].group!].label
                    : BOARD[scene].kind === "corner"
                      ? "GLOBAL EXCHANGE"
                      : BOARD[scene].kind.toUpperCase()}
                </p>
                <div className={`dice-pair ${rolling ? "rolling" : ""}`}>
                  {(rolling ? displayDice : game.dice).map((n, i) => (
                    <div
                      key={i}
                      aria-label={`Die ${i + 1}: ${n}`}
                      className={`die die-${n}`}
                    >
                      {Array.from({ length: 9 }, (_, j) => (
                        <i
                          key={j}
                          className={
                            [
                              [],
                              [4],
                              [0, 8],
                              [0, 4, 8],
                              [0, 2, 6, 8],
                              [0, 2, 4, 6, 8],
                              [0, 2, 3, 5, 6, 8],
                            ][n].includes(j)
                              ? "pip"
                              : ""
                          }
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <span className="turn-name" style={{ color: player!.color }}>
                  {player!.name}
                </span>
                <p className="turn-instruction">
                  {unresolved
                    ? "Resolve the action in your exchange panel."
                    : player!.jail >= 0
                      ? "Under audit. Roll doubles or pay 50."
                      : game.phase === "roll"
                        ? "Your next empire is a roll away."
                        : game.doubles
                          ? "Doubles! Continue to roll again."
                          : "Manage your portfolio or pass the dice."}
                </p>
                <div className="core-actions">
                  <button
                    className="primary"
                    onClick={roll}
                    disabled={
                      rolling || unresolved || game.phase !== "roll" || paused
                    }
                  >
                    <Dices size={17} />
                    {rolling
                      ? "ACCELERATING"
                      : player!.frozen
                        ? "SERVE TURN"
                        : "ROLL DICE"}
                  </button>
                  <button
                    onClick={() => dispatch({ type: "END" })}
                    disabled={rolling || unresolved || game.phase !== "end"}
                  >
                    {game.doubles ? "ROLL AGAIN" : "END TURN"}
                    <ArrowRight size={14} />
                  </button>
                </div>
                {player!.jail >= 0 && (
                  <button
                    className="bail-button"
                    disabled={
                      unresolved || player!.cash < 50 || game.phase !== "roll"
                    }
                    onClick={() => dispatch({ type: "BAIL" })}
                  >
                    Pay 50 to leave audit
                  </button>
                )}
              </OrbitBoard>
              <div className="group-legend">
                {Object.values(GROUPS).map((g) => (
                  <span key={g.label}>
                    <i style={{ background: g.color }} />
                    {g.label}
                  </span>
                ))}
              </div>
              <p className="mobile-hint">
                <Expand size={12} /> Scroll the ring sideways to inspect every
                destination.
              </p>
            </section>
            <aside className="exchange-panel">
              <div className="panel-label">
                <span>THE PLAYERS</span>
                <Users size={14} />
              </div>
              <div className="players">
                {game.players.map((p) => (
                  <div
                    key={p.id}
                    className={`trader ${p.id === game.current ? "current" : ""} ${p.bankrupt ? "bankrupt" : ""}`}
                    style={{ "--player": p.color } as React.CSSProperties}
                  >
                    <span className="avatar">{p.avatar}</span>
                    <div>
                      <b>{p.name}</b>
                      <small>
                        {p.bankrupt
                          ? "BANKRUPT"
                          : p.jail >= 0
                            ? "UNDER AUDIT"
                            : BOARD[p.position].shortName}
                      </small>
                    </div>
                    <div className="trader-cash">
                      <b>{money(p.cash)}</b>
                      <small>{money(netWorth(p))} NET</small>
                    </div>
                  </div>
                ))}
              </div>
              {game.pending !== null && !game.card && !game.debt.length && (
                <section className="action-panel">
                  <span className="eyebrow">UNCLAIMED OPPORTUNITY</span>
                  <h3>{BOARD[game.pending].name}</h3>
                  <p>
                    Acquire for {money(BOARD[game.pending].cost!)} or send it to
                    an open auction. Every player can bid.
                  </p>
                  <button
                    className="primary"
                    disabled={player!.cash < BOARD[game.pending].cost!}
                    onClick={() => dispatch({ type: "BUY" })}
                  >
                    BUY PROPERTY <ArrowRight size={15} />
                  </button>
                  <button
                    className="outline"
                    onClick={() => dispatch({ type: "AUCTION" })}
                  >
                    SEND TO AUCTION
                  </button>
                </section>
              )}
              {game.auction && (
                <section className="action-panel auction">
                  <span className="eyebrow">LIVE AUCTION</span>
                  <h3>{BOARD[game.auction.space].name}</h3>
                  <div className="auction-price">
                    {money(game.auction.bid)}
                    <small>
                      {game.auction.leader === null
                        ? "NO BIDS YET"
                        : `LEADING: ${game.players[game.auction.leader].name}`}
                    </small>
                  </div>
                  <p>
                    <b
                      style={{ color: game.players[game.auction.bidder].color }}
                    >
                      {game.players[game.auction.bidder].name}
                    </b>{" "}
                    is bidding. Available:{" "}
                    {money(game.players[game.auction.bidder].cash)}.
                  </p>
                  <div className="bid-buttons">
                    {[1, 10, 50].map((n) => (
                      <button
                        key={n}
                        disabled={
                          game.auction!.bid + n >
                          game.players[game.auction!.bidder].cash
                        }
                        onClick={() =>
                          dispatch({
                            type: "BID",
                            amount: game.auction!.bid + n,
                          })
                        }
                      >
                        +{n}
                      </button>
                    ))}
                  </div>
                  <button
                    className="outline"
                    onClick={() => dispatch({ type: "PASS" })}
                  >
                    PASS & WITHDRAW
                  </button>
                </section>
              )}
              {!!game.debt.length && !game.card && (
                <section className="action-panel debt-panel">
                  <span className="eyebrow">SETTLEMENT REQUIRED</span>
                  <h3>
                    {debtor!.name} owes {money(game.debt[0].amount)}
                  </h3>
                  <p>
                    To{" "}
                    {game.debt[0].creditor === null
                      ? "the bank"
                      : game.players[game.debt[0].creditor!].name}
                    . Sell buildings or mortgage assets below. The full debt
                    settles when enough cash is available.
                  </p>
                  <button
                    className="outline"
                    onClick={() => dispatch({ type: "BANKRUPT" })}
                  >
                    DECLARE BANKRUPTCY
                  </button>
                  <small>
                    Available only when liquidation cannot cover the debt.
                  </small>
                </section>
              )}
              <div className="portfolio-heading">
                <span className="panel-label">
                  {debtor ? "DEBT RECOVERY" : "YOUR PORTFOLIO"}
                </span>
                <button
                  disabled={unresolved || rolling}
                  onClick={() => setTrading(true)}
                >
                  <ArrowLeftRight size={13} /> Trade
                </button>
              </div>
              <div className="portfolio-list">
                {Object.keys(manager!.assets).length ? (
                  Object.keys(manager!.assets).map((id) => (
                    <button key={id} onClick={() => setSelected(+id)}>
                      <i
                        style={{
                          background: BOARD[+id].group
                            ? GROUPS[BOARD[+id].group!].color
                            : "#b6c9d5",
                        }}
                      />
                      <span>{BOARD[+id].shortName}</span>
                      <small>
                        {manager!.mortgages.includes(+id)
                          ? "MORTGAGED"
                          : LEVELS[manager!.assets[+id]]}
                      </small>
                      <ChevronRight size={12} />
                    </button>
                  ))
                ) : (
                  <p className="empty-portfolio">
                    No deeds yet. Land somewhere worth owning.
                  </p>
                )}
              </div>
              <div className="bank-stock">
                <Home size={13} /> BANK: {inventory(game).houses} HOUSES /{" "}
                {inventory(game).hotels} HOTELS
              </div>
              {!!game.modifiers.length && (
                <div className="world-events">
                  <div className="panel-label">MARKET CONDITIONS</div>
                  {game.modifiers.map((m, i) => (
                    <p key={i}>
                      <Zap size={12} />
                      <b>{m.title}</b>
                      <span>
                        {m.multiplier}× {m.type} · {m.until - game.turn} turns
                      </span>
                    </p>
                  ))}
                </div>
              )}
              <div className="activity">
                <div className="panel-label">
                  <span>THE LIVE WIRE</span>
                  <Radio size={12} />
                </div>
                <div aria-live="polite">
                  {game.logs
                    .slice(-5)
                    .reverse()
                    .map((l, i) => (
                      <p key={`${l}-${i}`}>
                        <span>
                          {String(game.logs.length - i).padStart(2, "0")}
                        </span>
                        {l}
                      </p>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
      {space && game && !game.card && (
        <Modal title={space.name} onClose={() => setSelected(null)}>
          <div
            className="deed-stripe"
            style={{
              background: space.group ? GROUPS[space.group].color : "#a8d5c9",
            }}
          />
          <span className="eyebrow">
            {space.region || "GLOBAL SYSTEM"} / DESTINATION {space.id}
          </span>
          <p>
            {owner
              ? `Owned by ${owner.name}`
              : space.cost
                ? `Available from the bank · ${money(space.cost)}`
                : space.id === 0
                  ? "Pass Launch to collect 200."
                  : space.id === 11
                    ? "Just visiting unless sent here. Leave audit with doubles, a 50 payment, or the mandatory third-turn fine."
                    : space.id === 31
                      ? "Move directly to Audit. Do not collect Launch salary."
                      : space.kind === "tax"
                        ? `Pay ${money(space.amount || 0)} to the bank.`
                        : "Draw an event. Its effects settle automatically."}
          </p>
          {space.cost && (
            <>
              <div className="deed-stats">
                <div>
                  <span>RENT NOW</span>
                  <b>{owner ? money(rentFor(game, space.id)) : "—"}</b>
                </div>
                <div>
                  <span>MORTGAGE VALUE</span>
                  <b>{money(Math.floor(space.cost / 2))}</b>
                </div>
              </div>
              {space.rent && (
                <div className="rent-table">
                  {rents(space.id).map((r, i) => (
                    <div
                      key={i}
                      className={owner?.assets[space.id] === i ? "active" : ""}
                    >
                      <span>{LEVELS[i]}</span>
                      <b>{money(r)}</b>
                    </div>
                  ))}
                </div>
              )}
              {space.kind === "transit" && (
                <p>Network rent: 25 / 50 / 100 for 1 / 2 / 3 links owned.</p>
              )}
              {space.kind === "utility" && (
                <p>
                  Rent is 4× the dice total, or 10× when both utilities are
                  owned.
                </p>
              )}
              {owner &&
                owner.id === manager?.id &&
                !game.auction &&
                !game.trade &&
                !rolling && (
                  <div className="deed-actions">
                    {space.kind === "asset" && (
                      <>
                        <button
                          className="primary"
                          disabled={
                            !!buildReason(game, space.id) || !!game.debt.length
                          }
                          onClick={() =>
                            dispatch({ type: "BUILD", space: space.id })
                          }
                        >
                          BUILD{" "}
                          {owner.assets[space.id] === 4 ? "HOTEL" : "HOUSE"} ·{" "}
                          {money(buildingCost(space.id))}
                        </button>
                        <small>
                          {buildReason(game, space.id) ||
                            "Build evenly. A complete colour set is required."}
                        </small>
                        <button
                          className="outline"
                          disabled={!owner.assets[space.id]}
                          onClick={() =>
                            dispatch({ type: "SELL", space: space.id })
                          }
                        >
                          SELL ONE BUILDING ·{" "}
                          {money(buildingCost(space.id) / 2)}
                        </button>
                        <button
                          className="outline"
                          onClick={() =>
                            dispatch({ type: "LIQUIDATE", space: space.id })
                          }
                        >
                          SELL ALL BUILDINGS IN THIS COLOUR SET
                        </button>
                      </>
                    )}
                    <button
                      className="outline"
                      onClick={() =>
                        dispatch({ type: "MORTGAGE", space: space.id })
                      }
                    >
                      {owner.mortgages.includes(space.id)
                        ? `REDEEM · ${money(Math.ceil(Math.floor(space.cost / 2) * 1.1))}`
                        : `MORTGAGE · ${money(Math.floor(space.cost / 2))}`}
                    </button>
                    <small>
                      Sell all buildings in this colour set before mortgaging.
                      Mortgaged properties earn no rent. Redemption costs
                      principal + 10%.
                    </small>
                  </div>
                )}
            </>
          )}
        </Modal>
      )}
      {game?.card && (
        <Modal
          title={game.card.title}
          className={`event-modal tone-${game.card.tone}`}
        >
          <span className="eyebrow">
            {game.card.deck === "pulse" ? "PUBLIC PULSE" : "THE GROUP CHAT"} /{" "}
            {game.card.kicker}
          </span>
          <div className="event-symbol">
            <Zap size={56} strokeWidth={1} />
          </div>
          <p className="event-body">{game.card.body}</p>
          <p className="event-settled">
            {game.debt.length
              ? "Payment queued. Manage debt after closing this card."
              : "Effect applied to the economy."}
          </p>
          <button
            className="primary"
            onClick={() => dispatch({ type: "DISMISS" })}
          >
            BACK TO THE EXCHANGE <ArrowRight size={16} />
          </button>
        </Modal>
      )}
      {trading && game && (
        <TradeForm
          game={game}
          onClose={() => setTrading(false)}
          onPropose={(t) => {
            dispatch({ type: "TRADE", trade: t });
            setTrading(false);
          }}
        />
      )}
      {game?.trade && (
        <Modal title="A deal is on the table.">
          <span className="eyebrow">
            PASS THE DEVICE TO{" "}
            {game.players[game.trade.partner].name.toUpperCase()}
          </span>
          <p>
            {player!.name} offers {money(game.trade.cashGive)}
            {game.trade.give.map((id) => ` + ${BOARD[id].name}`).join("")}.
          </p>
          <p>
            In exchange for {money(game.trade.cashTake)}
            {game.trade.take.map((id) => ` + ${BOARD[id].name}`).join("")}.
          </p>
          <div className="modal-actions">
            <button
              className="primary"
              onClick={() => dispatch({ type: "ACCEPT" })}
            >
              ACCEPT TRADE
            </button>
            <button
              className="outline"
              onClick={() => dispatch({ type: "REJECT" })}
            >
              REJECT
            </button>
          </div>
        </Modal>
      )}
      {rules && (
        <Modal
          title="The rules of this world."
          onClose={() => setRules(false)}
          className="rules-modal"
        >
          <span className="eyebrow">
            FAMILIAR STRATEGY / DIFFERENT GEOMETRY
          </span>
          <p>
            2–4 people on one device. Everyone starts with 1,500. Travel
            clockwise through 32 destinations. Select any sector to inspect its
            deed.
          </p>
          <ol>
            <li>
              <b>Roll, land, resolve.</b> Collect 200 when crossing Launch. Buy
              an unowned property or auction it to all players. Bids start at 1.
              A pass withdraws you from that auction.
            </li>
            <li>
              <b>Own a colour. Build an empire.</b> A complete colour set
              doubles undeveloped rent. Build evenly: four houses, then one
              hotel. The bank has 32 houses and 12 hotels. Sell evenly for half
              the building price.
            </li>
            <li>
              <b>Negotiate.</b> Trade cash and undeveloped, unmortgaged deeds.
              Both players must approve. Sell every building in a colour set
              before trading a deed from it.
            </li>
            <li>
              <b>Debt has consequences.</b> Mortgage unimproved properties for
              half their price. They stop earning rent. Redeem for principal +
              10%. Settle debt before proceeding. If liquidation cannot cover
              it, declare bankruptcy.
            </li>
            <li>
              <b>Doubles and audit.</b> Doubles earn another roll; three
              consecutive doubles send you to Audit. Final Bell Gate also sends
              you there. Escape with doubles or pay 50; after three failed
              attempts the fine is mandatory. Visiting Audit is harmless.
            </li>
            <li>
              <b>A living economy.</b> Pulse and Group Chat cards add payouts,
              costs, movement, frozen turns and temporary rent effects. Two
              decks cycle without replacement. Card movement resolves its
              destination.
            </li>
            <li>
              <b>Win your way.</b> Classic ends with one solvent player. Sprint
              ends after 60 minutes of active play and ranks survivors by net
              worth. Modal decisions and pauses stop the clock.
            </li>
          </ol>
          <p className="rules-note">
            An original 32-space variant, not an official Monopoly edition.
            Local multiplayer only. Building shortages wait for supply; they do
            not trigger building auctions. Mortgaged deeds are excluded from
            voluntary trades. Bankruptcy to the bank auctions returned deeds;
            creditor bankruptcies transfer deeds and charge mortgage interest.
          </p>
          <div className="rules-sources">
            <a
              href="https://www.hasbro.com/common/instruct/monins.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Hasbro rules reference ↗
            </a>
            <a
              href="https://www.ubisoft.com/en-us/games/new-monopoly"
              target="_blank"
              rel="noreferrer"
            >
              Animated world precedent ↗
            </a>
          </div>
        </Modal>
      )}
      {paused && game && game.phase !== "over" && (
        <Modal title="The exchange is paused.">
          <p>Your session is saved on this device. Take your time.</p>
          <button className="primary" onClick={() => setPaused(false)}>
            <Play size={16} /> RESUME SESSION
          </button>
          <button className="outline" onClick={() => setRestart(true)}>
            START A NEW SESSION
          </button>
        </Modal>
      )}
      {restart && (
        <Modal title="Start a fresh economy?" onClose={() => setRestart(false)}>
          <p>This replaces the saved session on this device.</p>
          <button
            className="primary"
            onClick={() => {
              setGame(null);
              setSaved(null);
              setPaused(false);
              setRestart(false);
              setSelected(null);
              try {
                localStorage.removeItem(SAVE);
              } catch {
                setSaveError(true);
              }
            }}
          >
            NEW SESSION <RotateCcw size={16} />
          </button>
        </Modal>
      )}
      {game?.phase === "over" && (
        <Modal title={`${game.players[game.winner!].name} owns the orbit.`}>
          <span className="eyebrow">
            THE FINAL BELL /{" "}
            {game.mode === "classic"
              ? "LAST EMPIRE STANDING"
              : "SPRINT COMPLETE"}
          </span>
          <div className="rankings">
            {[...game.players]
              .sort(
                (a, b) =>
                  Number(a.bankrupt) - Number(b.bankrupt) ||
                  netWorth(b) - netWorth(a),
              )
              .map((p, i) => (
                <div key={p.id}>
                  <span>0{i + 1}</span>
                  <b style={{ color: p.color }}>{p.name}</b>
                  <strong>
                    {p.bankrupt ? "BANKRUPT" : money(netWorth(p))}
                  </strong>
                </div>
              ))}
          </div>
          <button
            className="primary"
            onClick={() => {
              setGame(null);
              setSaved(null);
              setSelected(null);
            }}
          >
            PLAY AGAIN <ArrowRight size={16} />
          </button>
        </Modal>
      )}
    </main>
  );
}
function Modal({
  title,
  onClose,
  children,
  className = "",
}: {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null),
    closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current?.();
      if (e.key === "Tab") {
        const els = ref.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled),a,input,select,[tabindex="0"]',
        );
        if (!els?.length) {
          e.preventDefault();
          return;
        }
        const first = els[0],
          last = els[els.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          (document.activeElement === last ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      previous?.focus();
    };
  }, []);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <section
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`modal ${className}`}
      >
        {onClose && (
          <button className="close" aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </button>
        )}
        <h2>{title}</h2>
        {children}
      </section>
    </div>
  );
}
function TradeForm({
  game,
  onClose,
  onPropose,
}: {
  game: OrbitState;
  onClose: () => void;
  onPropose: (t: Trade) => void;
}) {
  const p = game.players[game.current],
    [partner, setPartner] = useState(
      game.players.find((q) => !q.bankrupt && q.id !== p.id)!.id,
    ),
    [give, setGive] = useState<number[]>([]),
    [take, setTake] = useState<number[]>([]),
    [cashGive, setCashGive] = useState(0),
    [cashTake, setCashTake] = useState(0);
  const q = game.players[partner];
  const deeds = (who: Trader) =>
    Object.keys(who.assets)
      .map(Number)
      .filter(
        (id) =>
          !who.mortgages.includes(id) &&
          !BOARD.some(
            (b) =>
              b.group && b.group === BOARD[id].group && who.assets[b.id] > 0,
          ),
      );
  const toggle = (id: number, a: number[], set: (a: number[]) => void) =>
    set(a.includes(id) ? a.filter((i) => i !== id) : [...a, id]);
  return (
    <Modal title="Make your next move." onClose={onClose}>
      <span className="eyebrow">A PROPOSAL NEEDS TWO YES VOTES</span>
      <label className="field">
        TRADE WITH
        <select
          value={partner}
          onChange={(e) => {
            setPartner(+e.target.value);
            setTake([]);
            setCashTake(0);
          }}
        >
          {game.players
            .filter((q) => !q.bankrupt && q.id !== p.id)
            .map((q) => (
              <option key={q.id} value={q.id}>
                {q.name}
              </option>
            ))}
        </select>
      </label>
      <div className="trade-columns">
        {[
          {
            who: p,
            title: "YOU OFFER",
            ids: give,
            set: setGive,
            cash: cashGive,
            setCash: setCashGive,
          },
          {
            who: q,
            title: "YOU REQUEST",
            ids: take,
            set: setTake,
            cash: cashTake,
            setCash: setCashTake,
          },
        ].map((c) => (
          <div key={c.title}>
            <h4>{c.title}</h4>
            <label className="field">
              CASH (MAX {c.who.cash})
              <input
                type="number"
                min="0"
                max={c.who.cash}
                step="1"
                value={c.cash}
                onChange={(e) =>
                  c.setCash(
                    Math.max(
                      0,
                      Math.min(c.who.cash, Math.floor(+e.target.value)),
                    ),
                  )
                }
              />
            </label>
            {deeds(c.who).map((id) => (
              <label className="trade-deed" key={id}>
                <input
                  type="checkbox"
                  checked={c.ids.includes(id)}
                  onChange={() => toggle(id, c.ids, c.set)}
                />
                {BOARD[id].name}
              </label>
            ))}
            {!deeds(c.who).length && <p>No eligible deeds.</p>}
          </div>
        ))}
      </div>
      <p className="rules-note">
        Only undeveloped, unmortgaged deeds can be exchanged. Cash transfers
        happen together when accepted.
      </p>
      <button
        className="primary"
        disabled={!give.length && !take.length && !cashGive && !cashTake}
        onClick={() => onPropose({ partner, give, take, cashGive, cashTake })}
      >
        PROPOSE TRADE <ArrowLeftRight size={16} />
      </button>
    </Modal>
  );
}
