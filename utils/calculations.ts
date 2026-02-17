
import { TestData, TestResult, DifficultyLevel } from '../types.ts';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const calculateTest = (data: TestData): TestResult => {
  const numeratore = data.n1 + data.n2 + data.n3 + data.n4 + data.n5 - data.n6 - data.n7 - data.n8;
  const denominatore = data.d1 - data.d2 - data.d3;

  if (denominatore <= 0) {
    return {
      numeratore,
      denominatore,
      rapporto: 'N/A',
      livello: DifficultyLevel.CRITICO,
      colore: 'bg-black text-white',
      diagnosi: "Flussi di cassa operativi nulli o negativi",
      azione: "Risanamento non perseguibile con soli flussi operativi. Necessari interventi straordinari (es. apporti di capitale, dismissioni massive o ristrutturazione del debito con falcidie)."
    };
  }

  const rapporto = numeratore / denominatore;

  if (rapporto < 0) {
    return {
      numeratore,
      denominatore,
      rapporto,
      livello: DifficultyLevel.FAVOREVOLE,
      colore: 'bg-green-600 text-white',
      diagnosi: "Posizione finanziaria netta complessiva favorevole",
      azione: "Nessuna criticità rilevata. L'impresa dispone di risorse o flussi sufficienti a coprire il fabbisogno."
    };
  } else if (rapporto <= 2) {
    return {
      numeratore,
      denominatore,
      rapporto,
      livello: DifficultyLevel.CONTENUTO,
      colore: 'bg-green-500 text-white',
      diagnosi: `Difficoltà contenute. Rientro stimato in circa ${rapporto.toFixed(1)} anni.`,
      azione: "Soluzione endogena all'impresa (continuità diretta)."
    };
  } else if (rapporto <= 4) {
    return {
      numeratore,
      denominatore,
      rapporto,
      livello: DifficultyLevel.SIGNIFICATIVO,
      colore: 'bg-orange-500 text-white',
      diagnosi: `Squilibrio significativo. Rientro stimato in circa ${rapporto.toFixed(1)} anni.`,
      azione: "Necessario piano d'impresa solido. Il risanamento dipende strettamente dall'efficacia delle iniziative industriali previste."
    };
  } else {
    return {
      numeratore,
      denominatore,
      rapporto,
      livello: DifficultyLevel.GRAVE,
      colore: 'bg-red-600 text-white',
      diagnosi: `Squilibrio grave. Rientro stimato in circa ${rapporto.toFixed(1)} anni.`,
      azione: "Valutare cessioni/cessazioni di rami d'azienda, aggregazioni con altre imprese o disinvestimenti straordinari."
    };
  }
};
