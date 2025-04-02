import { useEffect, useState, useCallback } from 'react';
import { AccountInfo } from '../types/interfaces';

interface WhatsappSession {
  connected: boolean;
  qrCode: string | null;
  account: AccountInfo | null;
  error: string;
  loading: boolean;
  resetSession: () => void;
}

export function useWhatsappSession(): WhatsappSession {
  const [connected, setConnected] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventSource = new EventSource('/api/whatsapp/connection/stream');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.connected) {
          setConnected(true);
          setQrCode(null);
          setAccount(data.account ?? null);
        } else {
          setConnected(false);
          setAccount(null);
          setQrCode(data.qrCode ?? null);
        }
        setLoading(false);
        setError('');
      } catch (err) {
        console.error('Erro ao processar dados do stream:', err);
        setError('Erro ao processar dados do servidor');
      }
    };

    eventSource.onerror = () => {
      setError('Erro ao conectar com o status do WhatsApp');
      setLoading(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const resetSession = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      await fetch('/api/whatsapp/reset', { method: 'POST' });
      setConnected(false);
      setQrCode(null);
      setAccount(null);
    } catch {
      setError('Erro ao resetar sessão');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    connected,
    qrCode,
    account,
    error,
    loading,
    resetSession,
  };
}
