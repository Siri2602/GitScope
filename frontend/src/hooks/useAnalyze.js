import { useState } from 'react';
import { analyzeProfile, getProfile } from '../services/api';

export const useAnalyze = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async (username) => {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await analyzeProfile(username.trim());
      setData(result.data);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Analysis failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const loadCached = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getProfile(username);
      setData(result.data);
    } catch {
      analyze(username);
      return;
    }
    setLoading(false);
  };

  return { data, loading, error, analyze, loadCached };
};
