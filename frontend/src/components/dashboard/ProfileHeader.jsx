import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { formatDate, levelColor } from '../../utils/helpers';

export default function ProfileHeader({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-6"
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div className="relative flex-shrink-0">
          <img
            src={data.avatar}
            alt={data.name || data.username}
            className="w-20 h-20 rounded-2xl border-2 border-white/10"
          />
          <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent border-2 border-bg" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1.5">
            <h2 className="text-xl font-bold text-white">{data.name || data.username}</h2>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold ${levelColor(data.developer_level)}`}
            >
              {data.developer_level}
            </span>
          </div>

          <a
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted hover:text-accent text-sm font-mono mb-3 transition-colors group"
          >
            @{data.username}
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          {data.bio && (
            <p className="text-muted text-sm leading-relaxed mb-3 max-w-xl">{data.bio}</p>
          )}

          <div className="flex flex-wrap gap-4">
            {data.location && (
              <span className="flex items-center gap-1.5 text-muted text-xs">
                <MapPin size={12} />
                {data.location}
              </span>
            )}
            {data.github_created_at && (
              <span className="flex items-center gap-1.5 text-muted text-xs">
                <Calendar size={12} />
                Joined {formatDate(data.github_created_at)}
              </span>
            )}
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-xs text-muted mb-1">Status</p>
          <div className="flex items-center gap-1.5 justify-end">
            <div
              className={`w-2 h-2 rounded-full ${
                data.activity_status === 'Highly Active' || data.activity_status === 'Active'
                  ? 'bg-accent animate-pulse'
                  : 'bg-yellow-400'
              }`}
            />
            <span className="text-sm font-medium text-white">{data.activity_status}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
