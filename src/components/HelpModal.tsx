import React from 'react';
import { HelpCircle, X, Check, ShieldAlert, Cpu, Wrench } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-lg bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0078d7] text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span className="font-semibold text-sm tracking-wide">
              Aide & Guide d'Utilisation GMAO
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-sm transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-xs text-slate-700">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0078d7]"></span>
              Cycle de vie d'une Demande d'Intervention (DI)
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Une Demande d'Intervention (DI) est émise par un exploitant ou opérateur pour signaler une anomalie, un dysfonctionnement ou une panne sur un équipement industriel.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded p-3 text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-yellow-200 border border-amber-400 inline-block"></span>
              Champs obligatoires (surlignés en jaune)
            </div>
            <p className="text-[11px] leading-relaxed">
              Conformément aux normes GMAO industrielles, les champs avec fond jaune (Description incident, Équipement source, Date de fin prévue, Source de constatation) sont indispensables pour permettre l'affectation et le traitement technique.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-800">Boutons et raccourcis de la barre d'outils :</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 border border-slate-200 rounded flex items-center gap-2">
                <span className="font-bold font-mono bg-slate-100 px-1 rounded">&lt; / &gt;</span>
                <span>Naviguer entre les DI précédentes / suivantes</span>
              </div>
              <div className="p-2 border border-slate-200 rounded flex items-center gap-2">
                <span className="font-bold font-mono bg-slate-100 px-1 rounded">+</span>
                <span>Créer une nouvelle DI vierge</span>
              </div>
              <div className="p-2 border border-slate-200 rounded flex items-center gap-2">
                <span className="font-bold font-mono bg-slate-100 px-1 rounded">💾</span>
                <span>Enregistrer les modifications en cours</span>
              </div>
              <div className="p-2 border border-slate-200 rounded flex items-center gap-2">
                <span className="font-bold font-mono bg-slate-100 px-1 rounded">↗</span>
                <span>Ouvrir la fenêtre de recherche rapide (Annuaire / Parc)</span>
              </div>
              <div className="p-2 border border-slate-200 rounded flex items-center gap-2">
                <span className="font-bold font-mono bg-slate-100 px-1 rounded">🗂️</span>
                <span>Explorer l'arborescence technique de l'usine</span>
              </div>
              <div className="p-2 border border-slate-200 rounded flex items-center gap-2">
                <span className="font-bold font-mono bg-slate-100 px-1 rounded">Sélect. action</span>
                <span>Générer un OT, imprimer le bon ou clôturer la DI</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900 space-y-1">
            <h4 className="font-bold flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" /> Passage en Ordre de Travail (OT)
            </h4>
            <p className="text-[11px] leading-relaxed">
              Une fois validée par le superviseur, la DI donne lieu à un Ordre de Travail (OT) numéroté, attribué à un technicien spécialiste avec les consignes de sécurité adaptées.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs bg-[#0078d7] text-white rounded hover:bg-blue-700 font-medium"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
};
