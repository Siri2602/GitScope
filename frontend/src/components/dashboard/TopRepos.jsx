import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { timeAgo, getLangColor } from '../../utils/helpers';

export default function TopRepos({ repos }) {
  if (!repos?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="card p-6"
    >
      <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-5">Top Repositories</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {repos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * i }}
            className="group p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-accent/20 hover:bg-white/[0.05] transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-sm font-semibold text-white group-hover:text-accent transition-colors truncate">
                {repo.name}
              </span>
              <ExternalLink
                size={12}
                className="text-muted flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
              />
            </div>
            {repo.description && (
              <p className="text-xs text-muted line-clamp-2 mb-3 leading-relaxed">{repo.description}</p>
            )}
            <div className="flex items-center gap-3">
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getLangColor(repo.language) }}
                  />
                  <span className="text-xs text-muted">{repo.language}</span>
                </div>
              )}
              <span className="flex items-center gap-1 text-xs text-muted ml-auto">
                <Star size={11} />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted">
                <GitFork size={11} />
                {repo.forks}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
