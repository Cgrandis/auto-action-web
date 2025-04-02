export interface AccountInfo {
    number: string;
    pushname: string;
    platform: string;
  }

export interface Conversation {
  contact: string;
  received: number;
  sent: number;
}

export interface Orcamento {
  timestamp: string;
  from: string;
  service: string;
  quantity: string;
  artwork: string;
  deadline: string;
  status?: 'pendente' | 'confirmado' | 'cancelado'; 
}