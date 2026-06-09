import { motion } from 'framer-motion';
import { Star, Users, GitFork, Shield, TrendingUp } from 'lucide-react';

const iconMap = { star: Star, users: Users, 'git-fork': GitFork, shield: Shield, 'trending-up': TrendingUp };

export default function DeveloperBadges({ badges }) {
  if (!badges?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="card p-6"
    >
      <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">Developer Badges</h3>
      <div className="flex flex-wrap gap-3">
        {badges.map((badge, i) => {
          const Icon = iconMap[badge.icon] || Star;
          return (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-accent/20 bg-accent/5 cursor-default"
            >
              <Icon size={14} className="text-accent" />
              <span className="text-sm font-medium text-white">{badge.label}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
