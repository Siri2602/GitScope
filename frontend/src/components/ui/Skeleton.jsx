import { motion } from 'framer-motion';

const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: { duration: 2, repeat: Infinity, ease: 'linear' },
  },
};

function SkeletonBox({ className = '' }) {
  return (
    <motion.div
      {...shimmer}
      className={`rounded-lg bg-white/5 ${className}`}
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
        backgroundSize: '400% 100%',
      }}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="card p-6 flex gap-6 items-start">
        <SkeletonBox className="w-24 h-24 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <SkeletonBox className="h-7 w-48" />
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-4 w-full max-w-lg" />
          <SkeletonBox className="h-4 w-40" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card p-4 space-y-3">
            <SkeletonBox className="h-4 w-20" />
            <SkeletonBox className="h-8 w-16" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 space-y-4">
          <SkeletonBox className="h-5 w-36" />
          <SkeletonBox className="h-64 w-full" />
        </div>
        <div className="card p-6 space-y-4">
          <SkeletonBox className="h-5 w-36" />
          <SkeletonBox className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonBox;
