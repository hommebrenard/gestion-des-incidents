import React, { useState } from 'react';
import { Search, X, Check, ArrowRight } from 'lucide-react';
import { 
  DemandeurRef, 
  EquipementRef, 
  SourceConstatationRef, 
  PrioriteRef, 
  SuperviseurRef 
} from '../types/gmao';

export type LookupType = 'demandeur' | 'equipement' | 'source' | 'priorite' | 'superviseur' | 'di' | 'ot';

interface LookupModalProps {
  isOpen: boolean;
  type: LookupType;
  onClose: () => void;
  onSelectDemandeur?: (item: DemandeurRef) => void;
  onSelectEquipement?: (item: EquipementRef) => void;
  onSelectSource?: (item: SourceConstatationRef) => void;
  onSelectPriorite?: (item: PrioriteRef) => void;
  onSelectSuperviseur?: (item: SuperviseurRef) => void;
  demandeurs: DemandeurRef[];
  equipements: EquipementRef[];
  sources: SourceConstatationRef[];
  priorites: PrioriteRef[];
  superviseurs: SuperviseurRef[];
}

export const LookupModal: React.FC<LookupModalProps> = ({
  isOpen,
  type,
  onClose,
  onSelectDemandeur,
  onSelectEquipement,
  onSelectSource,
  onSelectPriorite,
  onSelectSuperviseur,
  demandeurs,
  equipements,
  sources,
  priorites,
  superviseurs,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const getTitle = () => {
    switch (type) {
      case 'demandeur': return 'Sélection d\'un Demandeur (Annuaire du personnel)';
      case 'equipement': return 'Sélection d\'un Équipement source (Parc machine)';
      case 'source': return 'Sélection de la Source de constatation';
      case 'priorite': return 'Sélection du Niveau de Priorité d\'intervention';
      case 'superviseur': return 'Sélection du Superviseur de maintenance';
      case 'ot': return 'Détails de l\'Ordre de Travail (OT)';
      default: return 'Sélection';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-3xl rounded-lg bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[85vh] animate-in fade-in duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0078d7] text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-wide">{getTitle()}</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-sm transition"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search filter */}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filtrer par code, libellé, désignation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded shadow-inner focus:outline-none focus:border-[#0078d7] focus:ring-1 focus:ring-[#0078d7]"
              autoFocus
            />
          </div>
        </div>

        {/* Body / List */}
        <div className="p-2 overflow-y-auto flex-1 text-xs">
          {type === 'demandeur' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-2">Code</th>
                  <th className="p-2">Nom & Prénom</th>
                  <th className="p-2">Département</th>
                  <th className="p-2">Courriel</th>
                  <th className="p-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {demandeurs
                  .filter(d => 
                    d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    d.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    d.departement.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(d => (
                    <tr 
                      key={d.code} 
                      className="hover:bg-blue-50 cursor-pointer transition"
                      onClick={() => { onSelectDemandeur?.(d); onClose(); }}
                    >
                      <td className="p-2 font-mono font-medium text-blue-700">{d.code}</td>
                      <td className="p-2 font-semibold text-slate-800">{d.nom}</td>
                      <td className="p-2 text-slate-600">{d.departement}</td>
                      <td className="p-2 text-slate-500 font-mono text-[11px]">{d.courriel}</td>
                      <td className="p-2 text-right">
                        <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                          Choisir
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {type === 'equipement' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-2">Code</th>
                  <th className="p-2">Désignation Équipement</th>
                  <th className="p-2">Catégorie</th>
                  <th className="p-2">Localisation</th>
                  <th className="p-2">Statut</th>
                  <th className="p-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {equipements
                  .filter(e => 
                    e.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    e.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    e.localisation.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(e => (
                    <tr 
                      key={e.code} 
                      className="hover:bg-blue-50 cursor-pointer transition"
                      onClick={() => { onSelectEquipement?.(e); onClose(); }}
                    >
                      <td className="p-2 font-mono font-medium text-blue-700">{e.code}</td>
                      <td className="p-2 font-semibold text-slate-800">{e.nom}</td>
                      <td className="p-2 text-slate-600">{e.categorie}</td>
                      <td className="p-2 text-slate-500 text-[11px]">{e.localisation}</td>
                      <td className="p-2">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          e.statut === 'Opérationnel' ? 'bg-emerald-100 text-emerald-800' :
                          e.statut === 'Dégradé' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {e.statut}
                        </span>
                      </td>
                      <td className="p-2 text-right">
                        <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                          Choisir
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {type === 'source' && (
            <div className="space-y-2 p-1">
              {sources
                .filter(s => 
                  s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  s.nom.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(s => (
                  <div
                    key={s.code}
                    onClick={() => { onSelectSource?.(s); onClose(); }}
                    className="p-3 border border-slate-200 rounded hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">{s.code}</span>
                        <span className="font-semibold text-slate-800">{s.nom}</span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-1">{s.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </div>
                ))}
            </div>
          )}

          {type === 'priorite' && (
            <div className="space-y-2.5 p-1">
              {priorites
                .filter(p => 
                  p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  p.nom.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(p => (
                  <div
                    key={p.code}
                    onClick={() => { onSelectPriorite?.(p); onClose(); }}
                    className="p-3 border border-slate-200 rounded hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold tracking-wider ${p.couleur}`}>
                        {p.code}
                      </span>
                      <div>
                        <div className="font-bold text-slate-800">{p.nom}</div>
                        <div className="text-slate-500 text-[11px]">{p.delaiSLA}</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                      Sélectionner
                    </button>
                  </div>
                ))}
            </div>
          )}

          {type === 'superviseur' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-2">Code</th>
                  <th className="p-2">Nom Superviseur</th>
                  <th className="p-2">Spécialité Maintenance</th>
                  <th className="p-2">Contact</th>
                  <th className="p-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {superviseurs
                  .filter(s => 
                    s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.specialite.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(s => (
                    <tr 
                      key={s.code} 
                      className="hover:bg-blue-50 cursor-pointer transition"
                      onClick={() => { onSelectSuperviseur?.(s); onClose(); }}
                    >
                      <td className="p-2 font-mono font-medium text-blue-700">{s.code}</td>
                      <td className="p-2 font-semibold text-slate-800">{s.nom}</td>
                      <td className="p-2 text-slate-600">{s.specialite}</td>
                      <td className="p-2 text-slate-500 text-[11px]">{s.telephone}</td>
                      <td className="p-2 text-right">
                        <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                          Choisir
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 font-medium"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};
