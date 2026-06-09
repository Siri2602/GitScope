import { motion } from 'framer-motion';
import { Users, UserCheck, BookOpen, Star, GitFork } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';
import { formatNumber } from '../../utils/helpers';

const statConfigs = [
  { key: 'followers', label: 'Followers', Icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { key: 'following', label: 'Following', Icon: UserCheck, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { key: 'public_repos', label: 'Repos', Icon: BookOpen, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { key: 'total_stars', label: 'Stars', Icon: Star, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { key: 'total_forks', label: 'Forks', Icon: GitFork, color: 'text-green-400', bg: 'bg-green-400/10' },
];

function StatCard({ label, Icon, color, bg, value, index }) {
  const counted = useCountUp(value, 1200);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="stat-card"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted">{label}</span>
        <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
          <Icon size={15} className={color} />
        </div>
      </div>
      <p className="text-2xl font-bold text-white tabular-nums">{formatNumber(counted)}</p>
    </motion.div>
  );
}

export default function StatsGrid({ data }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {statConfigs.map((cfg, i) => (
        <StatCard key={cfg.key} {...cfg} value={data[cfg.key] || 0} index={i} />
      ))}
    </div>
  );
}
