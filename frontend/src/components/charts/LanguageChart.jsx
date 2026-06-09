import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getLangColor } from '../../utils/helpers';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="glass px-3 py-2 rounded-lg text-sm">
      <p className="font-medium text-white">{name}</p>
      <p className="text-muted">{value}%</p>
    </div>
  );
};

export default function LanguageChart({ languages }) {
  if (!languages?.length) return null;

  const data = languages.slice(0, 8).map((l) => ({
    name: l.name,
    value: l.percentage,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card p-6"
    >
      <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">Language Distribution</h3>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="w-full sm:w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
                animationBegin={200}
                animationDuration={1000}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={getLangColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2.5 w-full">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: getLangColor(item.name) }}
              />
              <span className="text-sm text-white flex-1 font-medium">{item.name}</span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: getLangColor(item.name) }}
                  />
                </div>
                <span className="text-xs text-muted w-8 text-right">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
