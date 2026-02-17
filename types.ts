
export interface TestData {
  // Identification
  azienda: string;
  piva: string;
  data_test: string;

  // Numerator (N)
  n1: number;
  n1_ruolo: number;
  n2: number;
  n3: number;
  n4: number;
  n5: number;
  n6: number;
  n7: number;
  n8: number;

  // Denominator (D)
  d1: number;
  d2: number;
  d3: number;
}

export enum DifficultyLevel {
  FAVOREVOLE = 'FAVOREVOLE',
  CONTENUTO = 'CONTENUTO',
  SIGNIFICATIVO = 'SIGNIFICATIVO',
  GRAVE = 'GRAVE',
  CRITICO = 'CRITICO'
}

export interface TestResult {
  numeratore: number;
  denominatore: number;
  rapporto: number | 'N/A';
  livello: DifficultyLevel;
  colore: string;
  diagnosi: string;
  azione: string;
}
