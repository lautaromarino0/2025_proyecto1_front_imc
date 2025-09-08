import React, { useEffect, useState } from 'react';
import { getHistorialImc } from '../service/ImcService';
import { ImcHistoryItem } from '../interfaces/ImcHistoryItem.interface';

const ImcHistory: React.FC = () => {
  const [history, setHistory] = useState<ImcHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getHistorialImc()
      .then((res) => setHistory(res.data))
      .catch(() => setError('Error al cargar el historial'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando historial...</div>;
  if (error) return <div>{error}</div>;
  if (!history.length) return <div>No hay historial de IMC.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Peso (kg)</th>
          <th>Altura (m)</th>
          <th>IMC</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item) => (
          <tr key={item.id}>
            <td>{new Date(item.fecha).toLocaleString()}</td>
            <td>{item.peso}</td>
            <td>{item.altura}</td>
            <td>{item.imc}</td>
            <td>{item.categoria}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ImcHistory;
