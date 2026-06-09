import { motion } from 'framer-motion';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const scoreMap = {
  Inactive: 10,
  'Moderately Active': 35,
  Active: 65,
  'Highly Active': 90,
  Low: 20,
  Medium: 50,
  High: 75,
  'Very High': 95,
  Weak: 15,
  Average: 40,
  Strong: 70,
  Excellent: 95,
  Beginner: 20,
  Intermediate: 45,
  Advanced: 70,
  Expert: 95,
};

export default function PerformanceRadar({ data }) {
  const radarData = [
    { subject: 'Activity', value: scoreMap[data.activity_status] || 50 },
    { subject: 'Influence', value: scoreMap[data.community_influence] || 50 },
    { subject: 'Portfolio', value: scoreMap[data.portfolio_strength] || 50 },
    { subject: 'Skills', value: Math.min(((data.languages_data?.length || 1) / 8) * 100, 100) },
    { subject: 'Level', value: scoreMap[data.developer_level] || 50 },
    { subject: 'Score', value: data.developer_score || 50 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="card p-6"
    >
      <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">Performance Radar</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
            <PolarGrid stroke="rgba(255,255,255,0.06)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickLine={false}
            />
            <Radar
              name="Profile"
              dataKey="value"
              stroke="#22C55E"
              fill="#22C55E"
              fillOpacity={0.15}
              strokeWidth={2}
              animationBegin={200}
              animationDuration={1000}
            />
            <Tooltip
              contentStyle={{
                background: '#1E293B',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                color: '#fff',
                fontSize: 12,
              }}
              formatter={(v) => [`${v}`, '']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
