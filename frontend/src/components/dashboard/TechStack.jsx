import { motion } from 'framer-motion';
import { getLangColor } from '../../utils/helpers';

export default function TechStack({ languages }) {
  if (!languages?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.28 }}
      className="card p-6"
    >
      <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">Technology Stack</h3>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: 0.04 * i }}
            whileHover={{ scale: 1.06 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white/[0.03] cursor-default transition-colors hover:bg-white/[0.06]"
            style={{ borderColor: `${getLangColor(lang.name)}30` }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getLangColor(lang.name) }}
            />
            <span className="text-sm text-white font-medium">{lang.name}</span>
            <span className="text-xs text-muted">{lang.percentage}%</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
