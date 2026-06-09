import { motion } from 'framer-motion';

const scoreMap = {
  Inactive: 10,
  'Moderately Active': 35,
  Active: 65,
  'Highly Active': 95,
  Low: 15,
  Medium: 45,
  High: 72,
  'Very High': 95,
  Weak: 15,
  Average: 40,
  Strong: 70,
  Excellent: 95,
};

function ProgressBar({ label, value, caption, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm text-white font-medium">{label}</span>
        <span className="text-xs text-accent font-semibold">{caption}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #22C55E, #4ADE80)',
            boxShadow: '0 0 8px rgba(34,197,94,0.4)',
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ActivityMetrics({ data }) {
  const metrics = [
    { label: 'Activity Score', value: scoreMap[data.activity_status] || 50, caption: data.activity_status },
    { label: 'Portfolio Strength', value: scoreMap[data.portfolio_strength] || 50, caption: data.portfolio_strength },
    { label: 'Community Influence', value: scoreMap[data.community_influence] || 50, caption: data.community_influence },
    { label: 'Developer Score', value: data.developer_score, caption: `${Math.round(data.developer_score)}/100` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="card p-6"
    >
      <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">Activity Metrics</h3>
      <div className="space-y-5">
        {metrics.map((m, i) => (
          <ProgressBar key={m.label} {...m} delay={0.05 * i} />
        ))}
      </div>
    </motion.div>
  );
}
