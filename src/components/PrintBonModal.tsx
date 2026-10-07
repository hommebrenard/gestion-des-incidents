import React from 'react';
import { Printer, X, Download } from 'lucide-react';
import { DemandeIntervention } from '../types/gmao';

interface PrintBonModalProps {
  isOpen: boolean;
  di: DemandeIntervention;
  onClose: () => void;
}

export const PrintBonModal: React.FC<PrintBonModalProps> = ({
  isOpen,
  di,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-3xl rounded-lg bg-white shadow-2xl border border-slate-300 flex flex-col my-8">
        {/* Header - Not printed */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 text-white rounded-t-lg print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-sm">Aperçu avant impression : Bon de Demande d'Intervention</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-[#0078d7] hover:bg-blue-600 text-white rounded text-xs font-semibold flex items-center gap-1 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimer le bon
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 text-slate-900 bg-white space-y-6 text-xs font-sans print:p-0 print:m-0">
          {/* Company & Document Title */}
          <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4">
            <div>
              <div className="text-xl font-black tracking-wider text-slate-900">FADESOL INDUSTRIE S.A.</div>
              <div className="text-[11px] text-slate-500 font-medium">DIRECTION TECHNIQUE & MAINTENANCE GÉNÉRALE (GMAO)</div>
              <div className="text-[10px] text-slate-400">Site Industriel Principal - Zone Franche Nord</div>
            </div>
            <div className="text-right">
              <div className="text-base font-extrabold text-[#0078d7] border-2 border-[#0078d7] px-3 py-1 rounded inline-block">
                BON DE DEMANDE D'INTERVENTION
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-slate-800">
                N° : {di.id}
              </div>
              <div className="text-[10px] text-slate-500">Date émission : {new Date().toLocaleDateString('fr-FR')}</div>
            </div>
          </div>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-4 gap-3 border border-slate-300 p-3 bg-slate-50 rounded">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">N° DAF</div>
              <div className="font-mono font-bold text-slate-800 text-xs">{di.numeroDaf || '---'}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Statut DI</div>
              <div className="font-semibold text-slate-800 text-xs">{di.etat}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Priorité</div>
              <div className="font-bold text-red-600 text-xs">{di.prioriteCode} - {di.prioriteNom}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Ordre de Travail (OT)</div>
              <div className="font-mono font-bold text-blue-700 text-xs">{di.otNumero || 'Non généré'}</div>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left box: Demandeur */}
            <div className="border border-slate-300 rounded p-3 space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-1">
                Informations Demandeur
              </div>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">Code & Nom :</span>
                <span className="col-span-2 font-bold text-slate-800">{di.demandeurCode} - {di.demandeurNom}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">Courriel :</span>
                <span className="col-span-2 text-slate-700 font-mono">{di.courriel}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">Déclaration :</span>
                <span className="col-span-2 text-slate-700">{di.dateDeclaration}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">Fin prévue :</span>
                <span className="col-span-2 text-slate-700 font-bold">{di.dateFinPrevue}</span>
              </div>
            </div>

            {/* Right box: Source & Supervision */}
            <div className="border border-slate-300 rounded p-3 space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-1">
                Supervision & Constatation
              </div>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">Superviseur :</span>
                <span className="col-span-2 font-bold text-slate-800">{di.superviseurCode} - {di.superviseurNom}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">Source :</span>
                <span className="col-span-2 text-slate-700">{di.sourceConstatationNom}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">Répartition :</span>
                <span className="col-span-2 text-slate-700">{di.typeRepartition}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">Technicien OT :</span>
                <span className="col-span-2 text-slate-700 font-semibold">{di.otTechnicien || 'En attente d\'affectation'}</span>
              </div>
            </div>
          </div>

          {/* Equipement Source Box */}
          <div className="border border-slate-300 rounded p-3 space-y-1 bg-slate-50">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-1">
              Équipement Source Concerné
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-mono font-bold bg-white px-2 py-1 rounded border border-slate-300 text-blue-700">{di.equipementCode}</span>
              <span className="font-bold text-slate-900 text-xs">{di.equipementNom}</span>
            </div>
          </div>

          {/* Description de l'incident */}
          <div className="border-2 border-amber-300 bg-amber-50/50 rounded p-3 space-y-1">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
              Description de l'incident & Dysfonctionnement constaté
            </div>
            <p className="text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-wrap">
              {di.descriptionIncident}
            </p>
          </div>

          {/* Instructions de Travail si OT présent */}
          {di.otNumero && di.otCommentaire && (
            <div className="border border-blue-200 bg-blue-50/40 rounded p-3 space-y-1">
              <div className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                Prescriptions techniques pour l'intervention (OT {di.otNumero})
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {di.otCommentaire}
              </p>
            </div>
          )}

          {/* Signatures & Emargement */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-3 gap-4 text-center">
            <div className="border border-slate-300 rounded p-3 min-h-[90px] flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-500">Visa / Signature Demandeur</span>
              <span className="text-[9px] text-slate-400">Date & Émargement</span>
            </div>
            <div className="border border-slate-300 rounded p-3 min-h-[90px] flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-500">Visa Chef d'Équipe Maintenance</span>
              <span className="text-[9px] text-slate-400">Prise en compte</span>
            </div>
            <div className="border border-slate-300 rounded p-3 min-h-[90px] flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-500">Réception & Clôture Travaux</span>
              <span className="text-[9px] text-slate-400">Conformité intervention</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end gap-2 print:hidden rounded-b-lg">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 font-medium"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
