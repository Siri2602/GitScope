import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import { levelColor } from '../../utils/helpers';

function CircularProgress({ value, size = 120, strokeWidth = 8 }) {
  const r = (size - strokeWidth) / 2;
  const circumference = r * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#22C55E"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.5))',
        }}
      />
    </svg>
  );
}

export default function ScoreCard({ data }) {
  const score = useCountUp(Math.round(data.developer_score), 1400);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="card p-6 flex flex-col items-center gap-4"
    >
      <div className="w-full flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Developer Score</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${levelColor(data.developer_level)}`}>
          {data.developer_level}
        </span>
      </div>

      <div className="relative">
        <CircularProgress value={data.developer_score} size={130} strokeWidth={9} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white tabular-nums">{score}</span>
          <span className="text-xs text-muted">/100</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-3">
        {[
          { label: 'Portfolio', value: data.portfolio_strength },
          { label: 'Influence', value: data.community_influence },
        ].map(({ label, value }) => (
          <div key={label} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <p className="text-xs text-muted mb-1">{label}</p>
            <p className="text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
