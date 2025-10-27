import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/10 ${className}`}>
      {children}
    </div>
  );
}