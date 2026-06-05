import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
}

export function SkeletonLoader({ className }: SkeletonLoaderProps) {
  return (
    <div
      className={cn('relative overflow-hidden bg-charcoal', className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 skeleton-shimmer" />
      <style jsx>{`
        .skeleton-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(201, 168, 76, 0.06) 40%,
            rgba(201, 168, 76, 0.12) 50%,
            rgba(201, 168, 76, 0.06) 60%,
            transparent 100%
          );
          animation: shimmer 1.8s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

export function SkeletonText({ className }: SkeletonLoaderProps) {
  return <SkeletonLoader className={cn('h-4 w-full rounded-sm', className)} />;
}

export function SkeletonImage({ className }: SkeletonLoaderProps) {
  return (
    <SkeletonLoader className={cn('aspect-[3/4] w-full', className)} />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-3">
      <SkeletonImage />
      <SkeletonText className="w-3/4" />
      <SkeletonText className="w-1/2" />
      <SkeletonText className="w-1/3" />
    </div>
  );
}
