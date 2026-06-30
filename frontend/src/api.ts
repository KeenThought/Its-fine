import type { ConsultOracleResponse, DailyOracleResponse, FirstPrinciple } from './types';

const apiBase = import.meta.env.VITE_API_URL ?? '';

export async function fetchDailyOracle(): Promise<DailyOracleResponse> {
  const res = await fetch(`${apiBase}/api/oracle/daily`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<DailyOracleResponse>;
}

export async function fetchPrinciples(): Promise<FirstPrinciple[]> {
  const res = await fetch(`${apiBase}/api/oracle/principles`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as { principles: FirstPrinciple[] };
  return data.principles;
}

export async function consultOracle(question: string): Promise<ConsultOracleResponse> {
  const res = await fetch(`${apiBase}/api/oracle/consult`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<ConsultOracleResponse>;
}
