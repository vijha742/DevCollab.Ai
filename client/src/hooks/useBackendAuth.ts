"use client";

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { syncWithBackend, needsBackendSync } from '@/lib/syncAuth';

/**
 * Custom hook to ensure Auth0 user is synced with backend
 * Use this hook in components that require backend JWT authentication
 */
export function useBackendAuth() {
    const { user, error, isLoading } = useUser();
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncError, setSyncError] = useState<string | null>(null);
    const [isSynced, setIsSynced] = useState(false);

    useEffect(() => {
        async function sync() {
            // Only sync if user is logged in with Auth0 but not synced with backend
            if (user && needsBackendSync() && !isSyncing) {
                setIsSyncing(true);
                setSyncError(null);

                try {
                    const success = await syncWithBackend(user as any);
                    setIsSynced(success);

                    if (!success) {
                        setSyncError('Failed to sync with backend server');
                    }
                } catch (err) {
                    setSyncError(err instanceof Error ? err.message : 'Unknown error');
                    setIsSynced(false);
                } finally {
                    setIsSyncing(false);
                }
            } else if (user && !needsBackendSync()) {
                // Already synced
                setIsSynced(true);
            }
        }

        sync();
    }, [user, isSyncing]);

    return {
        user,
        isLoading: isLoading || isSyncing,
        error: error || syncError,
        isSynced,
    };
}
