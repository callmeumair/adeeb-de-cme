'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-black hover:bg-gold-light active:bg-gold-light',
  secondary:
    'bg-charcoal text-ivory border border-gold/20 hover:border-gold/50',
  ghost:
    'bg-transparent text-gold border border-gold hover:bg-gold/10',
  danger:
    'bg-red-900/50 text-red-200 hover:bg-red-900/70',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-[10px]',
  md: 'px-8 py-3 text-[11px]',
  lg: 'px-10 py-4 text-xs',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'uppercase tracking-[0.3em] font-body font-medium',
          'rounded-none transition-all duration-300',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
