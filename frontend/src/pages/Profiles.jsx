import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Trophy, Search } from 'lucide-react';
import { getAllProfiles, getTopDevelopers } from '../services/api';
import { levelColor, formatNumber } from '../utils/helpers';
import SkeletonBox from '../components/ui/Skeleton';

function ProfileCard({ profile, rank, delay }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={() => navigate(`/analytics?user=${profile.username}`)}
      className="card p-4 cursor-pointer flex items-center gap-4"
    >
      {rank && (
        <span className="text-lg font-bold text-muted w-6 text-center flex-shrink-0">
          {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
        </span>
      )}
      <img
        src={profile.avatar}
        alt={profile.username}
        className="w-11 h-11 rounded-xl border border-white/10 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-semibold text-white text-sm truncate">
            {profile.name || profile.username}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${levelColor(profile.developer_level)}`}>
            {profile.developer_level}
          </span>
        </div>
        <span className="text-xs text-muted font-mono">@{profile.username}</span>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-lg font-bold text-accent">{Math.round(profile.developer_score)}</p>
        <p className="text-xs text-muted">score</p>
      </div>
    </motion.div>
  );
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);
  const [topDevs, setTopDevs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('recent');
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([getAllProfiles(), getTopDevelopers()])
      .then(([p, t]) => {
        setProfiles(p.data || []);
        setTopDevs(t.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const shown = tab === 'recent' ? profiles : topDevs;
  const filtered = shown.filter(
    (p) =>
      !search ||
      p.username.toLowerCase().includes(search.toLowerCase()) ||
      (p.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Developer Profiles</h1>
          <p className="text-muted">Browse analyzed profiles and top developers.</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex p-1 rounded-xl bg-card border border-white/6 gap-1">
            {[
              { key: 'recent', label: 'Recent', Icon: Users },
              { key: 'top', label: 'Top Devs', Icon: Trophy },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === key
                    ? 'bg-accent text-black'
                    : 'text-muted hover:text-white'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name…"
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-white/10 rounded-xl text-sm text-white placeholder-muted focus:outline-none focus:border-accent/30 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card p-4 flex items-center gap-4">
                <SkeletonBox className="w-11 h-11 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <SkeletonBox className="h-4 w-36" />
                  <SkeletonBox className="h-3 w-24" />
                </div>
                <SkeletonBox className="h-8 w-12" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted">No profiles found. Analyze some GitHub users first.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((profile, i) => (
              <ProfileCard
                key={profile.username}
                profile={profile}
                rank={tab === 'top' ? i + 1 : null}
                delay={i * 0.04}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
