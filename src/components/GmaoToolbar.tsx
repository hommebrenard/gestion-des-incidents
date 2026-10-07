import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Save, 
  LogOut, 
  Eye, 
  RotateCw, 
  Filter, 
  HelpCircle, 
  ChevronDown,
  Check,
  FileText,
  Printer,
  Copy,
  Wrench,
  CheckCircle,
  XCircle,
  Download
} from 'lucide-react';

interface GmaoToolbarProps {
  onPrev: () => void;
  onNext: () => void;
  onNew: () => void;
  onSave: () => void;
  onExit: () => void;
  onToggleViewOnly: () => void;
  isViewOnly: boolean;
  onRefresh: () => void;
  onFilterPlus: () => void;
  onFilterClear: () => void;
  onHelp: () => void;
  onActionSelect: (action: string) => void;
  canPrev: boolean;
  canNext: boolean;
  hasUnsavedChanges?: boolean;
}

export const GmaoToolbar: React.FC<GmaoToolbarProps> = ({
  onPrev,
  onNext,
  onNew,
  onSave,
  onExit,
  onToggleViewOnly,
  isViewOnly,
  onRefresh,
  onFilterPlus,
  onFilterClear,
  onHelp,
  onActionSelect,
  canPrev,
  canNext,
  hasUnsavedChanges = false,
}) => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) {
        setIsActionMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: string) => {
    setIsActionMenuOpen(false);
    onActionSelect(action);
  };

  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-[#f8fafc] border-b border-slate-300 text-slate-700 select-none">
      {/* Left button group - icon controls */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={onPrev}
          disabled={!canPrev}
          title="Demande précédente"
          className="p-1 text-slate-700 hover:text-blue-700 hover:bg-slate-200 rounded disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={!canNext}
          title="Demande suivante"
          className="p-1 text-slate-700 hover:text-blue-700 hover:bg-slate-200 rounded disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="w-[1px] h-4 bg-slate-300 mx-1" />

        {/* New DI */}
        <button
          onClick={onNew}
          title="Nouvelle Demande d'Intervention (+)"
          className="p-1 text-slate-700 hover:text-blue-700 hover:bg-slate-200 rounded transition cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* Save */}
        <button
          onClick={onSave}
          title="Enregistrer les modifications (Ctrl+S)"
          className={`p-1 rounded transition cursor-pointer relative ${
            hasUnsavedChanges 
              ? 'text-blue-700 bg-blue-100/70 hover:bg-blue-200 ring-1 ring-blue-400' 
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200'
          }`}
        >
          <Save className="w-5 h-5 stroke-[2]" />
          {hasUnsavedChanges && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
          )}
        </button>

        {/* Exit / Return */}
        <button
          onClick={onExit}
          title="Retourner à l'Accueil Demandeur"
          className="p-1 text-slate-700 hover:text-blue-700 hover:bg-slate-200 rounded transition cursor-pointer"
        >
          <LogOut className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="w-[1px] h-4 bg-slate-300 mx-1" />

        {/* Toggle View/Edit */}
        <button
          onClick={onToggleViewOnly}
          title={isViewOnly ? "Mode consultation actif (Cliquer pour modifier)" : "Mode modification actif (Cliquer pour figer en consultation)"}
          className={`p-1 rounded transition cursor-pointer ${
            isViewOnly 
              ? 'text-blue-700 bg-blue-100 hover:bg-blue-200' 
              : 'text-slate-700 hover:text-blue-700 hover:bg-slate-200'
          }`}
        >
          <Eye className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Refresh */}
        <button
          onClick={onRefresh}
          title="Actualiser la fiche"
          className="p-1 text-slate-700 hover:text-blue-700 hover:bg-slate-200 rounded transition cursor-pointer"
        >
          <RotateCw className="w-4 h-4 stroke-[2]" />
        </button>

        <div className="w-[1px] h-4 bg-slate-300 mx-1" />

        {/* Filter Plus (search/filter) */}
        <button
          onClick={onFilterPlus}
          title="Filtres de recherche"
          className="p-1 text-slate-700 hover:text-emerald-700 hover:bg-slate-200 rounded transition cursor-pointer flex items-center"
        >
          <div className="relative">
            <Filter className="w-4 h-4 stroke-[2]" />
            <span className="absolute -top-1 -right-1 text-[10px] font-black text-emerald-600 leading-none">+</span>
          </div>
        </button>

        {/* Filter Clear */}
        <button
          onClick={onFilterClear}
          title="Réinitialiser les filtres"
          className="p-1 text-slate-700 hover:text-red-700 hover:bg-slate-200 rounded transition cursor-pointer flex items-center"
        >
          <div className="relative">
            <Filter className="w-4 h-4 stroke-[2]" />
            <span className="absolute -top-1 -right-1 text-[10px] font-black text-red-600 leading-none">×</span>
          </div>
        </button>

        {/* Help */}
        <button
          onClick={onHelp}
          title="Guide & Aide en ligne"
          className="p-1 text-slate-700 hover:text-blue-700 hover:bg-slate-200 rounded transition cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Select an action dropdown */}
        <div className="relative ml-2" ref={actionMenuRef}>
          <button
            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
            className="flex items-center gap-2 px-3 py-1 bg-[#e0edfd] hover:bg-[#cee2fc] text-[#0060b9] font-medium text-xs rounded border border-[#b2d2fa] transition cursor-pointer shadow-xs active:bg-[#bad8fb]"
          >
            <span>Sélect. une action</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {isActionMenuOpen && (
            <div className="absolute left-0 mt-1 w-64 bg-white rounded-md shadow-xl border border-slate-200 py-1.5 z-40 text-xs animate-in fade-in duration-100">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Actions sur la demande
              </div>
              <button
                onClick={() => handleAction('generate_ot')}
                className="w-full px-3 py-2 text-left hover:bg-blue-50 text-slate-700 hover:text-blue-700 flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">Générer un Ordre de Travail (OT)</span>
              </button>
              <button
                onClick={() => handleAction('validate')}
                className="w-full px-3 py-2 text-left hover:bg-blue-50 text-slate-700 hover:text-emerald-700 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Valider la demande</span>
              </button>
              <button
                onClick={() => handleAction('close_di')}
                className="w-full px-3 py-2 text-left hover:bg-blue-50 text-slate-700 hover:text-indigo-700 flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-indigo-600" />
                <span>Clôturer la demande</span>
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="w-full px-3 py-2 text-left hover:bg-red-50 text-slate-700 hover:text-red-700 flex items-center gap-2"
              >
                <XCircle className="w-4 h-4 text-red-600" />
                <span>Rejeter / Annuler la demande</span>
              </button>
              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={() => handleAction('duplicate')}
                className="w-full px-3 py-2 text-left hover:bg-blue-50 text-slate-700 flex items-center gap-2"
              >
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Dupliquer la DI</span>
              </button>
              <button
                onClick={() => handleAction('print')}
                className="w-full px-3 py-2 text-left hover:bg-blue-50 text-slate-700 flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Imprimer le Bon de DI</span>
              </button>
              <button
                onClick={() => handleAction('export_json')}
                className="w-full px-3 py-2 text-left hover:bg-blue-50 text-slate-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Exporter en JSON</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right status notification pill */}
      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
        {isViewOnly && (
          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] uppercase font-bold">
            Mode Consultation
          </span>
        )}
      </div>
    </div>
  );
};
