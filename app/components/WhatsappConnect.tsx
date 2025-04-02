'use client';

import Image from 'next/image';
import { useWhatsappSession } from '@/app/hooks/useWhatsappSession';

export default function WhatsappConnect() {
  const {
    connected,
    qrCode,
    account,
    error,
    loading,
    resetSession,
  } = useWhatsappSession();

  return (
    <div className="flex justify-center pt-8">
      <div className="w-full max-w-md bg-[#70818C] rounded-2xl shadow-xl border border-[#05AFF2] p-6 text-center space-y-4 transition-all">
        {connected ? (
          <>
            <p className="text-[#031740] text-xl font-semibold flex items-center justify-center gap-2">
              ✅ Conectado ao WhatsApp!
            </p>

            {account && (
              <div className="text-sm text-[#344459] bg-[#F5F7FA] rounded-lg p-4">
                <p><strong>Número:</strong> {account.number}</p>
                <p><strong>Nome:</strong> {account.pushname}</p>
                <p><strong>Plataforma:</strong> {account.platform}</p>
              </div>
            )}

            <button
              onClick={resetSession}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition"
              disabled={loading}
            >
              {loading ? 'Resetando...' : 'Desconectar Sessão'}
            </button>
          </>
        ) : (
          <>
            {error && <p className="text-red-500">{error}</p>}

            {loading && (
              <p className="text-gray-500 animate-pulse">🔄 Buscando status da conexão...</p>
            )}

            {qrCode && !loading && (
              <div>
                <p className="text-[#344459] mb-2">📲 Escaneie o QR Code abaixo:</p>
                <div className="flex justify-center">
                  <Image
                    src={qrCode}
                    alt="QR Code"
                    width={220}
                    height={220}
                    className="rounded-lg shadow"
                  />
                </div>
              </div>
            )}

            <button
              onClick={resetSession}
              className="w-full bg-[#0583F2] hover:bg-[#05AFF2] text-white py-2 rounded-xl font-medium transition"
              disabled={loading}
            >
              {loading ? 'Atualizando...' : 'Recarregar QR Code'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
