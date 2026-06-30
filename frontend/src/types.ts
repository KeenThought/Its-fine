export interface FirstPrinciple {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface OracleVerse {
  reference: string;
  text: string;
  principleId: string;
  reflection: string;
}

export interface DailyOracleResponse {
  type: 'daily';
  date: string;
  dayOfYear: number;
  oracle: OracleVerse;
  principle: FirstPrinciple;
  firstPrinciples: FirstPrinciple[];
  journeyDay: number;
  journeyTotal: number;
}

export interface ConsultOracleResponse {
  type: 'consult';
  question: string;
  oracle: OracleVerse;
  principle: FirstPrinciple;
  closing: string;
}

export type AppView = 'daily' | 'consult' | 'principles';

export type OraclePhase = 'idle' | 'awakening' | 'speaking' | 'revealed';
