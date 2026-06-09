import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export default function InsightsCard({ insights }) {
  if (!insights) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="card p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <Lightbulb size={15} className="text-accent" />
        </div>
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Profile Insights</h3>
      </div>
      <p className="text-[15px] text-slate-300 leading-relaxed">{insights}</p>
    </motion.div>
  );
}
