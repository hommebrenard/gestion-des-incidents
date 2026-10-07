import React from 'react';
import { 
  ExternalLink, 
  ChevronDown, 
  Calendar, 
  Network, 
  AlertCircle,
  FileText,
  User,
  Wrench,
  Clock
} from 'lucide-react';
import { DemandeIntervention, DiState } from '../types/gmao';

interface GmaoDetailFormProps {
  di: DemandeIntervention;
  allDis: DemandeIntervention[];
  isViewOnly: boolean;
  onChange: (field: keyof DemandeIntervention, value: any) => void;
  onSelectDiId: (id: string) => void;
  onOpenLookup: (type: 'demandeur' | 'equipement' | 'source' | 'priorite' | 'superviseur' | 'ot') => void;
  onOpenEquipmentTree: () => void;
}

export const GmaoDetailForm: React.FC<GmaoDetailFormProps> = ({
  di,
  allDis,
  isViewOnly,
  onChange,
  onSelectDiId,
  onOpenLookup,
  onOpenEquipmentTree,
}) => {
  return (
    <div className="bg-white p-6 font-sans text-xs text-slate-800 space-y-4 max-w-7xl mx-auto select-text">
      {/* LIGNE 1 : N° de DI, N° DAF, État */}
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* N° de DI */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-2">
          <label className="w-24 text-right font-medium text-slate-700 whitespace-nowrap">
            N° de DI
          </label>
          <div className="flex-1 relative">
            <select
              value={di.id}
              onChange={(e) => onSelectDiId(e.target.value)}
              disabled={isViewOnly}
              className="w-full appearance-none bg-white border border-slate-300 rounded px-2.5 py-1 pr-7 text-xs font-mono font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#0078d7]"
            >
              {allDis.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* N° DAF */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-2">
          <label className="w-20 text-right font-medium text-slate-700 whitespace-nowrap">
            N° DAF
          </label>
          <input
            type="text"
            value={di.numeroDaf}
            onChange={(e) => onChange('numeroDaf', e.target.value)}
            disabled={isViewOnly}
            className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0078d7]"
            placeholder="Ex: DAF-7412"
          />
        </div>

        {/* État */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-2 justify-end">
          <label className="w-14 text-right font-medium text-slate-700 whitespace-nowrap">
            État
          </label>
          <div className="w-56 relative">
            <select
              value={di.etat}
              onChange={(e) => onChange('etat', e.target.value as DiState)}
              disabled={isViewOnly}
              className={`w-full appearance-none bg-slate-100 border border-slate-300 rounded px-2.5 py-1 pr-7 text-xs font-medium shadow-inner focus:outline-none focus:border-[#0078d7] ${
                di.etat === '0. Créée' ? 'text-blue-700' :
                di.etat === '1. Validée' ? 'text-emerald-700' :
                di.etat === '3. Prise en charge (OT généré)' ? 'text-amber-800 font-semibold' :
                di.etat === '4. Clôturée' ? 'text-slate-600' : 'text-red-700'
              }`}
            >
              <option value="0. Créée">0. Créée</option>
              <option value="1. Validée">1. Validée</option>
              <option value="2. En attente validation">2. En attente validation</option>
              <option value="3. Prise en charge (OT généré)">3. Prise en charge (OT généré)</option>
              <option value="4. Clôturée">4. Clôturée</option>
              <option value="5. Rejetée">5. Rejetée</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* LIGNE 2 : Demandeur + Nom, Courriel */}
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Demandeur Code + Lookup + Nom */}
        <div className="col-span-12 md:col-span-8 flex items-center gap-2">
          <label className="w-24 text-right font-medium text-slate-700 whitespace-nowrap">
            Demandeur
          </label>
          <div className="flex items-center gap-1.5 flex-1">
            {/* Code Demandeur input with popup links */}
            <div className="relative w-44 flex items-center">
              <input
                type="text"
                value={di.demandeurCode}
                onChange={(e) => onChange('demandeurCode', e.target.value)}
                disabled={isViewOnly}
                placeholder="*"
                className="w-full bg-white border border-slate-300 rounded px-2 py-1 pr-12 text-xs font-mono font-medium focus:outline-none focus:border-[#0078d7]"
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-slate-600">
                <button
                  type="button"
                  onClick={() => onOpenLookup('demandeur')}
                  title="Rechercher un demandeur"
                  className="p-0.5 hover:text-blue-700 hover:bg-slate-100 rounded"
                >
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLookup('demandeur')}
                  title="Sélectionner dans la liste"
                  className="p-0.5 hover:text-blue-700 hover:bg-slate-100 rounded"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Readonly Name */}
            <input
              type="text"
              value={di.demandeurNom}
              readOnly
              className="flex-1 bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-700 font-semibold cursor-default"
              placeholder="Nom du demandeur..."
            />
          </div>
        </div>

        {/* Courriel */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-2">
          <label className="w-14 text-right font-medium text-slate-700 whitespace-nowrap">
            Courriel
          </label>
          <input
            type="email"
            value={di.courriel}
            onChange={(e) => onChange('courriel', e.target.value)}
            disabled={isViewOnly}
            placeholder="adresse@domaine.com"
            className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 font-mono focus:outline-none focus:border-[#0078d7]"
          />
        </div>
      </div>

      {/* LIGNE 3 : Description incident (YELLOW HIGHLIGHT / MANDATORY) */}
      <div className="flex items-center gap-2">
        <label className="w-24 text-right font-medium text-slate-700 whitespace-nowrap flex-shrink-0">
          Description incident
        </label>
        <div className="flex-1 relative">
          <input
            type="text"
            value={di.descriptionIncident}
            onChange={(e) => onChange('descriptionIncident', e.target.value)}
            disabled={isViewOnly}
            placeholder="Décrire avec précision l'incident ou la panne constatée (Champ obligatoire)"
            className="w-full bg-[#fef9c3] border border-amber-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-medium placeholder-amber-700/50 shadow-inner focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
      </div>

      {/* LIGNE 4 : Équipement source (YELLOW HIGHLIGHT) + Hierarchy Tree Icon + Description */}
      <div className="flex items-center gap-2">
        <label className="w-24 text-right font-medium text-slate-700 whitespace-nowrap flex-shrink-0">
          Équipement source
        </label>
        <div className="flex items-center gap-2 flex-1">
          {/* Equipment Code input with yellow highlight */}
          <div className="relative w-44 flex items-center flex-shrink-0">
            <input
              type="text"
              value={di.equipementCode}
              onChange={(e) => onChange('equipementCode', e.target.value)}
              disabled={isViewOnly}
              className="w-full bg-[#fef9c3] border border-amber-300 rounded px-2 py-1 pr-12 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-slate-600">
              <button
                type="button"
                onClick={() => onOpenLookup('equipement')}
                title="Consulter le parc équipement"
                className="p-0.5 hover:text-blue-700 hover:bg-amber-100 rounded"
              >
                <ExternalLink className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onOpenLookup('equipement')}
                title="Liste des équipements"
                className="p-0.5 hover:text-blue-700 hover:bg-amber-100 rounded"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Hierarchy Structure Button (as visible in screenshot next to equipment code) */}
          <button
            type="button"
            onClick={onOpenEquipmentTree}
            title="Consulter l'arborescence technique de l'équipement"
            className="p-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-slate-700 hover:text-blue-700 transition flex-shrink-0"
          >
            <Network className="w-4 h-4" />
          </button>

          {/* Readonly Equipment Name/Specs */}
          <input
            type="text"
            value={di.equipementNom}
            readOnly
            className="flex-1 bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-700 font-semibold cursor-default"
            placeholder="Désignation complète de l'équipement..."
          />
        </div>
      </div>

      {/* LIGNE 5 : Date de déclaration, Date de fin prévue (YELLOW), Type de répartition */}
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Date de déclaration */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-2">
          <label className="w-24 text-right font-medium text-slate-700 whitespace-nowrap">
            Date de déclaration
          </label>
          <div className="relative flex-1">
            <input
              type="datetime-local"
              value={di.dateDeclaration}
              onChange={(e) => onChange('dateDeclaration', e.target.value)}
              disabled={isViewOnly}
              className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0078d7]"
            />
          </div>
        </div>

        {/* Date de fin prévue (YELLOW HIGHLIGHT) */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-2">
          <label className="w-28 text-right font-medium text-slate-700 whitespace-nowrap">
            Date de fin prévue
          </label>
          <div className="relative flex-1">
            <input
              type="date"
              value={di.dateFinPrevue}
              onChange={(e) => onChange('dateFinPrevue', e.target.value)}
              disabled={isViewOnly}
              className="w-full bg-[#fef9c3] border border-amber-300 rounded px-2.5 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
            />
          </div>
        </div>

        {/* Type de répartition */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-2">
          <label className="w-28 text-right font-medium text-slate-700 whitespace-nowrap">
            Type de répartition
          </label>
          <div className="relative flex-1">
            <select
              value={di.typeRepartition}
              onChange={(e) => onChange('typeRepartition', e.target.value)}
              disabled={isViewOnly}
              className="w-full appearance-none bg-slate-100 border border-slate-300 rounded px-2.5 py-1 pr-7 text-xs font-medium text-slate-800 shadow-inner focus:outline-none focus:border-[#0078d7]"
            >
              <option value="0. Sans répartition">0. Sans répartition</option>
              <option value="1. Par centre de coût - Production">1. Par centre de coût - Production</option>
              <option value="2. Par centre de coût - Utilités">2. Par centre de coût - Utilités</option>
              <option value="3. Par centre de coût - Infrastructure">3. Par centre de coût - Infrastructure</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* LIGNE 6 & 7 : Left Column (Source, Priorité, Superviseur) / Right Column (Informations OT) */}
      <div className="grid grid-cols-12 gap-4 items-start pt-1">
        {/* LEFT COLUMN: Source, Priorité, Superviseur */}
        <div className="col-span-12 md:col-span-8 space-y-3">
          {/* Source de constatation (YELLOW HIGHLIGHT) */}
          <div className="flex items-center gap-2">
            <label className="w-24 text-right font-medium text-slate-700 whitespace-nowrap flex-shrink-0">
              Source de constatation
            </label>
            <div className="flex items-center gap-1.5 flex-1">
              <div className="relative w-44 flex items-center">
                <input
                  type="text"
                  value={di.sourceConstatationCode}
                  onChange={(e) => onChange('sourceConstatationCode', e.target.value)}
                  disabled={isViewOnly}
                  className="w-full bg-[#fef9c3] border border-amber-300 rounded px-2 py-1 pr-12 text-xs font-mono font-medium focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-slate-600">
                  <button
                    type="button"
                    onClick={() => onOpenLookup('source')}
                    title="Sélectionner la source"
                    className="p-0.5 hover:text-blue-700 hover:bg-amber-100 rounded"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenLookup('source')}
                    title="Liste des sources"
                    className="p-0.5 hover:text-blue-700 hover:bg-amber-100 rounded"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={di.sourceConstatationNom}
                readOnly
                className="flex-1 bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-700 font-medium cursor-default"
              />
            </div>
          </div>

          {/* Priorité */}
          <div className="flex items-center gap-2">
            <label className="w-24 text-right font-medium text-slate-700 whitespace-nowrap flex-shrink-0">
              Priorité
            </label>
            <div className="flex items-center gap-1.5 flex-1">
              <div className="relative w-44 flex items-center">
                <input
                  type="text"
                  value={di.prioriteCode}
                  onChange={(e) => onChange('prioriteCode', e.target.value)}
                  disabled={isViewOnly}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 pr-12 text-xs font-mono font-bold focus:outline-none focus:border-[#0078d7]"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-slate-600">
                  <button
                    type="button"
                    onClick={() => onOpenLookup('priorite')}
                    title="Choisir la priorité"
                    className="p-0.5 hover:text-blue-700 hover:bg-slate-100 rounded"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenLookup('priorite')}
                    title="Liste des priorités"
                    className="p-0.5 hover:text-blue-700 hover:bg-slate-100 rounded"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={di.prioriteNom}
                  readOnly
                  className={`w-full bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-xs font-bold uppercase cursor-default ${
                    di.prioriteCode === 'U0' ? 'text-red-600' :
                    di.prioriteCode === 'U1' ? 'text-orange-600' :
                    di.prioriteCode === 'U2' ? 'text-blue-600' : 'text-slate-600'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Superviseur */}
          <div className="flex items-center gap-2">
            <label className="w-24 text-right font-medium text-slate-700 whitespace-nowrap flex-shrink-0">
              Superviseur
            </label>
            <div className="flex items-center gap-1.5 flex-1">
              <div className="relative w-44 flex items-center">
                <input
                  type="text"
                  value={di.superviseurCode}
                  onChange={(e) => onChange('superviseurCode', e.target.value)}
                  disabled={isViewOnly}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 pr-12 text-xs font-mono font-medium focus:outline-none focus:border-[#0078d7]"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-slate-600">
                  <button
                    type="button"
                    onClick={() => onOpenLookup('superviseur')}
                    title="Choisir le superviseur"
                    className="p-0.5 hover:text-blue-700 hover:bg-slate-100 rounded"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenLookup('superviseur')}
                    title="Liste des superviseurs"
                    className="p-0.5 hover:text-blue-700 hover:bg-slate-100 rounded"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={di.superviseurNom}
                readOnly
                className="flex-1 bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-700 font-medium cursor-default"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Fieldset "Informations OT" */}
        <div className="col-span-12 md:col-span-4">
          <fieldset className="border border-slate-300 rounded p-3 pt-2 bg-slate-50/50">
            <legend className="px-1 text-[11px] text-slate-600 font-medium select-none">
              Informations OT
            </legend>

            <div className="space-y-2.5">
              {/* N° d'OT */}
              <div className="flex items-center gap-2">
                <label className="w-16 text-right font-medium text-slate-700 whitespace-nowrap">
                  N° d'OT
                </label>
                <div className="flex-1 relative flex items-center">
                  <input
                    type="text"
                    value={di.otNumero || ''}
                    readOnly
                    placeholder="Aucun OT associé"
                    className="w-full bg-slate-100 border border-slate-300 rounded px-2 py-1 pr-7 text-xs font-mono font-bold text-blue-700 cursor-pointer"
                    onClick={() => onOpenLookup('ot')}
                  />
                  <button
                    type="button"
                    onClick={() => onOpenLookup('ot')}
                    title={di.otNumero ? "Voir les détails de l'OT" : "Générer un OT"}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-blue-700 p-0.5"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* État OT */}
              <div className="flex items-center gap-2">
                <label className="w-16 text-right font-medium text-slate-700 whitespace-nowrap">
                  État OT
                </label>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={di.otEtat || ''}
                    readOnly
                    placeholder="---"
                    className="w-full bg-slate-100 border border-slate-300 rounded px-2 py-1 text-xs text-slate-700 font-medium cursor-default"
                  />
                </div>
              </div>

              {/* Quick actions within fieldset if OT exists */}
              {di.otNumero && (
                <div className="pt-1 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
                  <span className="font-semibold text-slate-600">{di.otTechnicien || 'Non assigné'}</span>
                  <button
                    type="button"
                    onClick={() => onOpenLookup('ot')}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Modifier OT
                  </button>
                </div>
              )}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};
