'use client';

import Layout from '@/app/components/Layout';
import { useConversationStream } from '@/app/hooks/useConversationStream';

export default function ConversationsPage() {
  const conversations = useConversationStream();

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-[#344459] mb-8">Conversas de Hoje</h1>
      {conversations.length === 0 ? (
        <p className="text-gray-500">Nenhuma conversa registrada hoje.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {conversations.map((conv, i) => (
            <div
              key={i}
              className="p-5 bg-white rounded-xl shadow border hover:border-green-600 transition-all"
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                📱 {conv.contact}
              </h2>
              <p className="text-sm text-gray-600">Recebidas: {conv.received}</p>
              <p className="text-sm text-gray-600">Enviadas: {conv.sent}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}