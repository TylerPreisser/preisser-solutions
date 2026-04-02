interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  // TODO: Elevated card with border, hover lift + shadow transition
  return (
    <div className={`rounded-xl border border-border p-6 transition-all ${className}`}>
      {children}
    </div>
  );
}
