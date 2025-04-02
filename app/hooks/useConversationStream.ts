import { useEffect, useState } from 'react';
import { Conversation } from '../types/interfaces';

export function useConversationStream() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/whatsapp/conversations/stream');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setConversations(data);
    };

    eventSource.onerror = () => {
      console.error('Erro na conexão com o stream de conversas.');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return conversations;
}
