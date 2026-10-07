import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ExternalLink, 
  Printer, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText,
  Filter,
  Trash2,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { DemandeIntervention } from '../types/gmao';

interface GmaoAccueilTableProps {
  dis: DemandeIntervention[];
  onOpenDi: (id: string) => void;
  onNewDi: () => void;
  onPrintDi: (di: DemandeIntervention) => void;
  onGenerateOt: (di: DemandeIntervention) => void;
  onDeleteDi: (id: string) => void;
}

export const GmaoAccueilTable: React.FC<GmaoAccueilTableProps> = ({
  dis,
  onOpenDi,
  onNewDi,
  onPrintDi,
  onGenerateOt,
  onDeleteDi,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [etatFilter, setEtatFilter] = useState<string>('TOUS');
  const [prioriteFilter, setPrioriteFilter] = useState<string>('TOUTES');

  // Filter logic
  const filteredDis = dis.filter((di) => {
    const matchesSearch = 
      di.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      di.demandeurNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      di.equipementNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      di.descriptionIncident.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (di.numeroDaf && di.numeroDaf.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (di.otNumero && di.otNumero.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesEtat = etatFilter === 'TOUS' || di.etat.startsWith(etatFilter);
    const matchesPriorite = prioriteFilter === 'TOUTES' || di.prioriteCode === prioriteFilter;

    return matchesSearch && matchesEtat && matchesPriorite;
  });

  // KPI stats
  const totalCount = dis.length;
  const u0Count = dis.filter((d) => d.prioriteCode === 'U0').length;
  const otGenereCount = dis.filter((d) => Boolean(d.otNumero)).length;
  const clotureesCount = dis.filter((d) => d.etat.includes('Clôturée')).length;

  return (
    <div className="p-6 bg-[#f8fafc] flex-1 overflow-y-auto space-y-6">
      {/* Top Banner & KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase text-slate-500">Total Demandes (DI)</div>
            <div className="text-2xl font-black text-slate-800 mt-1">{totalCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Enregistrées dans la GMAO</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0078d7]">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase text-red-600">Urgences Critiques (U0)</div>
            <div className="text-2xl font-black text-red-600 mt-1">{u0Count}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Arrêt potentiel de production</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase text-blue-700">Ordres de Travail (OT)</div>
            <div className="text-2xl font-black text-blue-700 mt-1">{otGenereCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Affectés aux techniciens</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Wrench className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase text-emerald-700">DI Clôturées</div>
            <div className="text-2xl font-black text-emerald-700 mt-1">{clotureesCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Interventions finalisées</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Action & Filter Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par N° DI, Équipement, Demandeur, Incident..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:border-[#0078d7]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* État filter */}
            <select
              value={etatFilter}
              onChange={(e) => setEtatFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0078d7]"
            >
              <option value="TOUS">Tous les états</option>
              <option value="0">0. Créée</option>
              <option value="1">1. Validée</option>
              <option value="3">3. Prise en charge (OT généré)</option>
              <option value="4">4. Clôturée</option>
            </select>

            {/* Priorité filter */}
            <select
              value={prioriteFilter}
              onChange={(e) => setPrioriteFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#0078d7]"
            >
              <option value="TOUTES">Toutes les priorités</option>
              <option value="U0">U0 - Urgent</option>
              <option value="U1">U1 - Très important</option>
              <option value="U2">U2 - Normal</option>
              <option value="U3">U3 - Faible</option>
            </select>

            {/* New DI Button */}
            <button
              onClick={onNewDi}
              className="px-3.5 py-1.5 bg-[#0078d7] hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Créer une DI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th className="p-3 w-32">N° de DI</th>
                <th className="p-3 w-28">N° DAF</th>
                <th className="p-3 w-32">État</th>
                <th className="p-3 w-24">Priorité</th>
                <th className="p-3">Demandeur</th>
                <th className="p-3">Équipement source</th>
                <th className="p-3">Incident constaté</th>
                <th className="p-3 w-28">Date fin prévue</th>
                <th className="p-3 w-28">N° OT</th>
                <th className="p-3 w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDis.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-slate-400">
                    Aucune Demande d'Intervention ne correspond à vos critères de recherche.
                  </td>
                </tr>
              ) : (
                filteredDis.map((di) => (
                  <tr 
                    key={di.id}
                    className="hover:bg-blue-50/60 transition cursor-pointer group"
                    onClick={() => onOpenDi(di.id)}
                  >
                    <td className="p-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                      {di.id}
                    </td>
                    <td className="p-3 font-mono text-slate-600 whitespace-nowrap">
                      {di.numeroDaf || '---'}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        di.etat === '0. Créée' ? 'bg-blue-100 text-blue-800' :
                        di.etat === '1. Validée' ? 'bg-emerald-100 text-emerald-800' :
                        di.etat === '3. Prise en charge (OT généré)' ? 'bg-amber-100 text-amber-800' :
                        di.etat === '4. Clôturée' ? 'bg-slate-200 text-slate-700' : 'bg-red-100 text-red-800'
                      }`}>
                        {di.etat}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        di.prioriteCode === 'U0' ? 'bg-red-600 text-white' :
                        di.prioriteCode === 'U1' ? 'bg-orange-500 text-white' :
                        di.prioriteCode === 'U2' ? 'bg-blue-600 text-white' : 'bg-slate-500 text-white'
                      }`}>
                        {di.prioriteCode} - {di.prioriteNom}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-800 whitespace-nowrap">
                      {di.demandeurNom}
                    </td>
                    <td className="p-3 max-w-xs truncate text-slate-700 font-medium" title={di.equipementNom}>
                      {di.equipementNom}
                    </td>
                    <td className="p-3 max-w-sm truncate text-slate-600 text-[11px]" title={di.descriptionIncident}>
                      {di.descriptionIncident}
                    </td>
                    <td className="p-3 whitespace-nowrap text-slate-600 font-mono text-[11px]">
                      {di.dateFinPrevue}
                    </td>
                    <td className="p-3 whitespace-nowrap font-mono">
                      {di.otNumero ? (
                        <span className="text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                          {di.otNumero}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">---</span>
                      )}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onOpenDi(di.id)}
                          title="Consulter / Modifier la fiche"
                          className="p-1 hover:bg-blue-100 text-blue-700 rounded transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onPrintDi(di)}
                          title="Imprimer le bon de DI"
                          className="p-1 hover:bg-slate-200 text-slate-700 rounded transition"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onGenerateOt(di)}
                          title="Gérer l'Ordre de Travail"
                          className="p-1 hover:bg-amber-100 text-amber-700 rounded transition"
                        >
                          <Wrench className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteDi(di.id)}
                          title="Supprimer la DI"
                          className="p-1 hover:bg-red-100 text-red-600 rounded transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div>
            Affichage de <span className="font-semibold text-slate-700">{filteredDis.length}</span> sur <span className="font-semibold text-slate-700">{dis.length}</span> demande(s)
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span> U0 : Arrêt immédiat
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span> U1 : &lt; 4h
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> U2 : Normal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
