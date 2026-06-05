import { cn } from '@/lib/utils';

interface GoldDividerProps {
  className?: string;
  withDiamond?: boolean;
  withDot?: boolean;
}

export function GoldDivider({
  className,
  withDiamond = false,
  withDot = false,
}: GoldDividerProps) {
  if (withDiamond || withDot) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-gold/30" />
        {withDiamond ? (
          <div className="h-2 w-2 rotate-45 border border-gold/40 bg-gold/10 shrink-0" />
        ) : (
          <div className="h-1.5 w-1.5 rounded-full bg-gold/40 shrink-0" />
        )}
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/30 to-gold/30" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent',
        className
      )}
    />
  );
}
