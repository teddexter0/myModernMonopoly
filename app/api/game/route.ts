import { NextResponse } from 'next/server';

// API route for game operations (future multiplayer)
export async function GET() {
  return NextResponse.json({ message: 'Game API endpoint' });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Handle game creation, joining, etc.
  
  return NextResponse.json({ success: true, data: body });
}