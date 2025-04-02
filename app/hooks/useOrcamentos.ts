'use client';

import { useState, useEffect } from 'react';
import { Orcamento } from '@/app/types/interfaces';

export function useOrcamentos() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
  const [filtered, setFiltered] = useState<Orcamento[]>([]);
  const [filtros, setFiltros] = useState({
    cliente: '',
    servico: '',
    data: '',
  });

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const res = await fetch('/api/whatsapp/orcamentos');
        const data = await res.json();
        if (res.ok) {
          setOrcamentos(data);
          setFiltered(data);
        }
      } catch (err) {
        console.error('Erro ao buscar orçamentos:', err);
      }
    };
    fetchOrcamentos();
  }, []);

  useEffect(() => {
    let resultado = [...orcamentos];
    if (filtros.cliente) {
      resultado = resultado.filter(o => o.from.includes(filtros.cliente));
    }
    if (filtros.servico) {
      resultado = resultado.filter(o => o.service.toLowerCase().includes(filtros.servico.toLowerCase()));
    }
    if (filtros.data) {
      resultado = resultado.filter(o => o.timestamp.startsWith(filtros.data));
    }
    setFiltered(resultado);
  }, [filtros, orcamentos]);

  const atualizarStatus = async (index: number, novoStatus: string) => {
    try {
      const orcamento = filtered[index];
      const res = await fetch('/api/whatsapp/orcamentos/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp: orcamento.timestamp, status: novoStatus }),
      });

      if (res.ok) {
        const atualizados = [...orcamentos].map((o) =>
          o.timestamp === orcamento.timestamp ? { ...o, status: novoStatus } : o
        );
        setOrcamentos(atualizados as Orcamento[]);
      }
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  return {
    orcamentos: filtered,
    filtros,
    setFiltros,
    atualizarStatus,
  };
}
