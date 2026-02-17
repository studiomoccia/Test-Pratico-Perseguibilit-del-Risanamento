
import React, { useState, useEffect, useCallback } from 'react';
import { TestData, TestResult } from './types';
import { calculateTest, formatCurrency } from './utils/calculations';
import InputGroup from './components/InputGroup';

const initialData: TestData = {
  azienda: '',
  piva: '',
  data_test: new Date().toISOString().split('T')[0],
  n1: 0,
  n1_ruolo: 0,
  n2: 0,
  n3: 0,
  n4: 0,
  n5: 0,
  n6: 0,
  n7: 0,
  n8: 0,
  d1: 0,
  d2: 0,
  d3: 0,
};

const App: React.FC = () => {
  const [data, setData] = useState<TestData>(initialData);
  const [result, setResult] = useState<TestResult>(calculateTest(initialData));

  useEffect(() => {
    setResult(calculateTest(data));
  }, [data]);

  const handleInputChange = (id: string, value: string | number) => {
    setData(prev => ({ ...prev, [id]: value }));
  };

  const exportPDF = () => {
    const element = document.getElementById('report-container');
    const opt = {
      margin: 10,
      filename: `Test_Risanamento_${data.azienda || 'Export'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div id="report-container" className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <header className="bg-slate-900 text-white p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Test Pratico – Perseguibilità del Risanamento
              </h1>
              <p className="text-slate-400 mt-2 text-sm md:text-base font-medium">
                Art. 3, comma 3, D.Lgs. 14/2019 – DD Min. Giustizia 21/03/2023
              </p>
            </div>
            <div className="no-print">
              <button 
                onClick={exportPDF}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Esporta PDF
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-10">
          
          {/* Sezione Identificativa - Campi Opzionali */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 border-b border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Denominazione Impresa (opzionale)</label>
              <input 
                type="text" 
                value={data.azienda}
                onChange={(e) => handleInputChange('azienda', e.target.value)}
                className="w-full border-b border-gray-200 focus:border-indigo-500 outline-none py-1 transition-colors"
                placeholder="Ragione Sociale"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">P.IVA / C.F. (opzionale)</label>
              <input 
                type="text" 
                value={data.piva}
                onChange={(e) => handleInputChange('piva', e.target.value)}
                className="w-full border-b border-gray-200 focus:border-indigo-500 outline-none py-1 transition-colors"
                placeholder="00000000000"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Data del Test</label>
              <input 
                type="date" 
                value={data.data_test}
                onChange={(e) => handleInputChange('data_test', e.target.value)}
                className="w-full border-b border-gray-200 focus:border-indigo-500 outline-none py-1 transition-colors"
              />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* INPUTS COLUMN */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Numeratore */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">N</span>
                  <h2 className="text-xl font-bold text-gray-800">Numeratore: Debito da Ristrutturare</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <InputGroup 
                    label="Debito scaduto" 
                    id="n1" 
                    value={data.n1} 
                    onChange={handleInputChange}
                    sign="+"
                    tooltip="Debiti esigibili comprensivi di interessi e sanzioni. Includere debiti tributari e contributivi."
                  />
                  <InputGroup 
                    label="di cui iscrizioni a ruolo" 
                    id="n1_ruolo" 
                    value={data.n1_ruolo} 
                    onChange={handleInputChange}
                    sign="info"
                    tooltip="Sottodettaglio informativo del debito scaduto relativo a iscrizioni a ruolo (non si somma al totale)."
                  />
                  <InputGroup 
                    label="Debito riscadenziato / moratorie" 
                    id="n2" 
                    value={data.n2} 
                    onChange={handleInputChange}
                    sign="+"
                    tooltip="Debito temporaneamente non esigibile: dilazioni fornitori, sospensione riscossione, moratorie bancarie."
                  />
                  <InputGroup 
                    label="Linee di credito non rinnovabili" 
                    id="n3" 
                    value={data.n3} 
                    onChange={handleInputChange}
                    sign="+"
                    tooltip="Linee di credito bancarie utilizzate delle quali non si attende il rinnovo."
                  />
                  <InputGroup 
                    label="Rate finanziamenti (prossimi 2 anni)" 
                    id="n4" 
                    value={data.n4} 
                    onChange={handleInputChange}
                    sign="+"
                    tooltip="Rate in scadenza nei successivi 2 anni, comprensive di interessi."
                  />
                  <InputGroup 
                    label="Investimenti iniziative industriali" 
                    id="n5" 
                    value={data.n5} 
                    onChange={handleInputChange}
                    sign="+"
                    tooltip="Investimenti nei prossimi 12 mesi per ripristinare la normale gestione (Capitale fisso, CCN, riorganizzazione)."
                  />
                  <InputGroup 
                    label="Risorse da dismissioni" 
                    id="n6" 
                    value={data.n6} 
                    onChange={handleInputChange}
                    sign="-"
                    tooltip="Risorse ritraibili da dismissione cespiti o rami d'azienda (contrattualizzate o previste)."
                  />
                  <InputGroup 
                    label="Nuovi conferimenti / finanziamenti" 
                    id="n7" 
                    value={data.n7} 
                    onChange={handleInputChange}
                    sign="-"
                    tooltip="Aumenti di capitale, finanziamenti soci (anche postergati) o nuovi fin. esterni."
                  />
                  <InputGroup 
                    label="Stima MON negativo primo anno" 
                    id="n8" 
                    value={data.n8} 
                    onChange={handleInputChange}
                    sign="-"
                    tooltip="Inserire come valore positivo se il MON stimato per il primo anno è negativo. Agisce a riduzione del debito netto se coperto da cassa."
                  />
                </div>
              </section>

              {/* Denominatore */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">D</span>
                  <h2 className="text-xl font-bold text-gray-800">Denominatore: Flussi Liberi Operativi</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <InputGroup 
                    label="MOL prospettico normalizzato annuo" 
                    id="d1" 
                    value={data.d1} 
                    onChange={handleInputChange}
                    sign="+"
                    tooltip="Margine Operativo Lordo a regime, normalizzato, al netto di componenti non ricorrenti."
                  />
                  <InputGroup 
                    label="Investimenti mantenimento (CAPEX)" 
                    id="d2" 
                    value={data.d2} 
                    onChange={handleInputChange}
                    sign="-"
                    tooltip="Investimenti di rinnovo necessari a regime per mantenere la continuità aziendale."
                  />
                  <InputGroup 
                    label="Imposte sul reddito annue" 
                    id="d3" 
                    value={data.d3} 
                    onChange={handleInputChange}
                    sign="-"
                    tooltip="Imposte sul reddito stimate che l'impresa dovrà assolvere a regime."
                  />
                </div>
              </section>
            </div>

            {/* RESULTS STICKY COLUMN */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                
                {/* Score Card */}
                <div className={`p-6 rounded-2xl shadow-xl transition-colors duration-500 ${result.colore}`}>
                  <div className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">Rapporto N/D</div>
                  <div className="text-5xl font-extrabold mb-4">
                    {typeof result.rapporto === 'number' ? result.rapporto.toFixed(2) : result.rapporto}
                  </div>
                  
                  <div className="h-2 w-full bg-white/30 rounded-full mb-6 overflow-hidden flex">
                    <div className={`h-full ${result.livello === 'CRITICO' ? 'w-full' : (typeof result.rapporto === 'number' ? Math.min((result.rapporto / 6) * 100, 100) + '%' : '0%')} bg-white`}></div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider opacity-70">Esito del Test</h4>
                      <p className="text-xl font-bold">{result.livello}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider opacity-70">Diagnosi</h4>
                      <p className="text-sm leading-relaxed">{result.diagnosi}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider opacity-70">Azione Consigliata</h4>
                      <p className="text-sm leading-relaxed italic">{result.azione}</p>
                    </div>
                  </div>
                </div>

                {/* Calculation Recap */}
                <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Riepilogo Dati</h3>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Debito Netto (N)</span>
                    <span className="font-mono font-bold text-red-600">{formatCurrency(result.numeratore)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Flussi Annui (D)</span>
                    <span className="font-mono font-bold text-emerald-600">{formatCurrency(result.denominatore)}</span>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 leading-tight uppercase font-bold tracking-tighter">
                      Disclaimer Normativo
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 italic leading-snug">
                      Il presente test ha valenza indicativa ai sensi del par. 2.3, Sezione III del Decreto dirigenziale Min. Giustizia 21 marzo 2023. È da evitare una lettura standardizzata dello stesso.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        
        <footer className="bg-gray-50 border-t border-gray-100 p-8 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            Supporto alla gestione della crisi d'impresa – D.Lgs. 14/2019
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
