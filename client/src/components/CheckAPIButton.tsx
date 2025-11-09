'use client';

import { useState } from 'react';

export default function CheckAPIButton() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState<string>('');

    const checkAPI = async () => {
        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/test', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.text();
                setStatus('success');
                setMessage(data);
            } else {
                setStatus('error');
                setMessage(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            setStatus('error');
            setMessage(`Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
                onClick={checkAPI}
                disabled={status === 'loading'}
                style={{
                    padding: '12px 24px',
                    backgroundColor: status === 'success' ? '#10b981' : status === 'error' ? '#ef4444' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: status === 'loading' ? 0.6 : 1,
                }}
            >
                {status === 'loading' ? '🔄 Checking...' : status === 'success' ? '✅ API Working!' : status === 'error' ? '❌ API Error' : '🔧 Check API Status'}
            </button>

            {message && (
                <div
                    style={{
                        marginTop: '12px',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: status === 'success' ? '#d1fae5' : '#fee2e2',
                        color: status === 'success' ? '#065f46' : '#991b1b',
                        fontSize: '14px',
                        fontWeight: '500',
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
}
