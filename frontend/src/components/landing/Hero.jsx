import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, GitBranch, Star, Users } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    navigate(`/analytics?user=${encodeURIComponent(username.trim())}`);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 animate-float-delayed"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div {...fadeUp(0)} className="mb-5">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium">
            <GitBranch size={14} />
            GitHub Profile Analytics
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          Understand any{' '}
          <span className="text-gradient">GitHub</span>
          <br />profile in seconds
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Analyze repositories, activity trends, technology usage, developer performance,
          and community impact through detailed GitHub profile analytics.
        </motion.p>

        <motion.form
          {...fadeUp(0.3)}
          onSubmit={handleAnalyze}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="w-full pl-11 pr-4 py-4 bg-card border border-white/10 rounded-xl text-white placeholder-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn-primary flex items-center gap-2 whitespace-nowrap px-6 py-4"
          >
            Analyze Profile
            <ArrowRight size={16} />
          </motion.button>
        </motion.form>

        <motion.div
          {...fadeUp(0.45)}
          className="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto"
        >
          {[
            { icon: GitBranch, value: '50K+', label: 'Repos Analyzed' },
            { icon: Users, value: '12K+', label: 'Developers' },
            { icon: Star, value: '99.9%', label: 'Accuracy' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-xl font-bold text-white">{value}</span>
              <span className="text-xs text-muted">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        {...fadeUp(0.6)}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-accent/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
