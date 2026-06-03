'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { api } from '@/lib/api';
import type { SubscriptionInfo, SubscriptionPlan, SubscriptionStatus } from '@/types/subscription';

// ── Context shape ──────────────────────────────────────────────────────────
interface SubscriptionContextValue {
  plan:     SubscriptionPlan;
  status:   SubscriptionStatus;
  isActive: boolean;          // plan != null && status == 'active'
  isLoading: boolean;
  refresh: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue>({
  plan:      null,
  status:    null,
  isActive:  false,
  isLoading: false,
  refresh:   () => {},
});

// ── Provider ───────────────────────────────────────────────────────────────
export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, getToken } = useAuth();
  const [info, setInfo]         = useState<SubscriptionInfo>({ subscription_plan: null, subscription_status: null });
  const [isLoading, setLoading] = useState(false);

  const fetchPlan = useCallback(async () => {
    if (!isSignedIn) {
      setInfo({ subscription_plan: null, subscription_status: null });
      return;
    }
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) return;
      const res = await api.getMyPlan(token);
      setInfo(res.data);
    } catch {
      // Silencieux — plan null par défaut
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, getToken]);

  useEffect(() => { fetchPlan(); }, [fetchPlan]);

  const isActive = info.subscription_plan != null && info.subscription_status === 'active';

  return (
    <SubscriptionContext.Provider value={{
      plan:      info.subscription_plan,
      status:    info.subscription_status,
      isActive,
      isLoading,
      refresh:   fetchPlan,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function useSubscription() {
  return useContext(SubscriptionContext);
}
