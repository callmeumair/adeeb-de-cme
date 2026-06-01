import { cn } from '@/lib/utils';

type BadgeVariant = 'new' | 'sale' | 'bestseller' | 'limited';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: 'bg-gold text-black',
  sale: 'bg-red-700 text-white',
  bestseller: 'bg-deep border border-gold/30 text-gold',
  limited: 'bg-charcoal text-gold',
};

const defaultLabels: Record<BadgeVariant, string> = {
  new: 'New',
  sale: 'Sale',
  bestseller: 'Bestseller',
  limited: 'Limited Edition',
};

export function Badge({ variant, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-[9px] font-body font-semibold uppercase tracking-widest leading-none',
        variantStyles[variant],
        className
      )}
    >
      {children ?? defaultLabels[variant]}
    </span>
  );
}
