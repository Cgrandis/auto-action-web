'use client';

import Layout from '@/app/components/Layout';
import { useOrcamentos } from '@/app/hooks/useOrcamentos';

const statusColors: Record<string, string> = {
  pendente: 'bg-yellow-100 text-yellow-800',
  confirmado: 'bg-green-100 text-green-800',
  cancelado: 'bg-red-100 text-red-800',
};

export default function OrcamentosPage() {
  const { orcamentos, filtros, setFiltros, atualizarStatus } = useOrcamentos();

  return (
    <Layout>
      <div className="min-h-screen px-6 py-10 bg-gray-50">
        <h1 className="text-3xl font-bold text-[#344459] mb-6 text-center">
          📋 Orçamentos Recebidos
        </h1>

        {/* Filtros */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <input
            type="text"
            placeholder="Filtrar por cliente"
            value={filtros.cliente}
            onChange={(e) => setFiltros({ ...filtros, cliente: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Filtrar por serviço"
            value={filtros.servico}
            onChange={(e) => setFiltros({ ...filtros, servico: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="date"
            value={filtros.data}
            onChange={(e) => setFiltros({ ...filtros, data: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {/* Lista de cards */}
        {orcamentos.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum orçamento encontrado.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
            {orcamentos.map((orcamento, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow border border-[#05AFF2] hover:border-[#0583F2] transition-all"
              >
                <p className="text-xs text-gray-400 mb-2">
                  {new Date(orcamento.timestamp).toLocaleString()}
                </p>
                <p><strong>📞 Cliente:</strong> {orcamento.from}</p>
                <p><strong>🧾 Serviço:</strong> {orcamento.service}</p>
                <p><strong>📦 Quantidade:</strong> {orcamento.quantity}</p>
                <p><strong>🎨 Arte final:</strong> {orcamento.artwork}</p>
                <p><strong>⏱ Prazo:</strong> {orcamento.deadline}</p>

                <div className="mt-3">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${statusColors[orcamento.status || 'pendente']}`}>
                    {orcamento.status || 'pendente'}
                  </span>

                  <select
                    value={orcamento.status || 'pendente'}
                    onChange={(e) => atualizarStatus(i, e.target.value)}
                    className="ml-3 px-2 py-1 text-sm border border-gray-300 rounded"
                  >
                    <option value="pendente">Pendente</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
