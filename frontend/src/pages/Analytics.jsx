import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { useAnalyze } from '../hooks/useAnalyze';
import { DashboardSkeleton } from '../components/ui/Skeleton';
import ErrorCard from '../components/ui/ErrorCard';
import ProfileHeader from '../components/dashboard/ProfileHeader';
import ScoreCard from '../components/dashboard/ScoreCard';
import StatsGrid from '../components/dashboard/StatsGrid';
import LanguageChart from '../components/charts/LanguageChart';
import PerformanceRadar from '../components/charts/PerformanceRadar';
import ActivityMetrics from '../components/dashboard/ActivityMetrics';
import TopRepos from '../components/dashboard/TopRepos';
import DeveloperBadges from '../components/dashboard/DeveloperBadges';
import InsightsCard from '../components/dashboard/InsightsCard';
import RepoNetwork from '../components/dashboard/RepoNetwork';
import TechStack from '../components/dashboard/TechStack';

export default function AnalyticsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const { data, loading, error, analyze } = useAnalyze();

  useEffect(() => {
    const user = searchParams.get('user');
    if (user) {
      setInput(user);
      analyze(user);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    navigate(`/analytics?user=${encodeURIComponent(input.trim())}`, { replace: true });
    analyze(input.trim());
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="py-8">
          <motion.form
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSearch}
            className="flex gap-3 max-w-xl"
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search GitHub username…"
                className="w-full pl-10 pr-4 py-3 bg-card border border-white/10 rounded-xl text-white placeholder-muted text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
              />
            </div>
            <button type="submit" className="btn-primary flex items-center gap-2 text-sm px-5 py-3">
              Analyze
              <ArrowRight size={15} />
            </button>
          </motion.form>
        </div>

        {loading && <DashboardSkeleton />}

        {error && !loading && (
          <div className="mt-8">
            <ErrorCard message={error} onRetry={() => analyze(input)} />
          </div>
        )}

        {data && !loading && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              <div className="lg:col-span-3">
                <ProfileHeader data={data} />
              </div>
              <ScoreCard data={data} />
            </div>

            <StatsGrid data={data} />

            <InsightsCard insights={data.insights} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LanguageChart languages={data.languages_data} />
              <PerformanceRadar data={data} />
            </div>

            <TechStack languages={data.languages_data} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ActivityMetrics data={data} />
              <RepoNetwork data={data} />
            </div>

            <TopRepos repos={data.top_repos} />
            <DeveloperBadges badges={data.badges} />
          </div>
        )}

        {!data && !loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 text-center"
          >
            <p className="text-muted text-lg">Enter a GitHub username above to get started.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
