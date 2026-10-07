import React, { useState, useEffect } from 'react';
import { 
  RotateCw, 
  X, 
  Building2, 
  CheckCircle, 
  AlertCircle,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  DemandeIntervention, 
  DemandeurRef, 
  EquipementRef, 
  SourceConstatationRef, 
  PrioriteRef, 
  SuperviseurRef 
} from './types/gmao';
import { 
  INITIAL_DIS, 
  DEMANDEURS_CATALOG, 
  EQUIPEMENTS_CATALOG, 
  SOURCES_CATALOG, 
  PRIORITES_CATALOG, 
  SUPERVISEURS_CATALOG 
} from './data/mockData';
import { GmaoToolbar } from './components/GmaoToolbar';
import { GmaoDetailForm } from './components/GmaoDetailForm';
import { GmaoAccueilTable } from './components/GmaoAccueilTable';
import { LookupModal, LookupType } from './components/LookupModal';
import { EquipmentTreeModal } from './components/EquipmentTreeModal';
import { GenerateOtModal } from './components/GenerateOtModal';
import { PrintBonModal } from './components/PrintBonModal';
import { HelpModal } from './components/HelpModal';

const LOCAL_STORAGE_KEY = 'gmao_fadesol_dis_v1';

export default function App() {
  // Persistence state
  const [dis, setDis] = useState<DemandeIntervention[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return INITIAL_DIS;
  });

  // Active view tab: 'accueil' or 'detail'
  const [activeTab, setActiveTab] = useState<'accueil' | 'detail'>('detail');
  const [currentDiId, setCurrentDiId] = useState<string>('DI-2024-0018');
  const [isViewOnly, setIsViewOnly] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [lookupState, setLookupState] = useState<{ isOpen: boolean; type: LookupType }>({
    isOpen: false,
    type: 'demandeur',
  });
  const [isEquipmentTreeOpen, setIsEquipmentTreeOpen] = useState(false);
  const [isGenerateOtOpen, setIsGenerateOtOpen] = useState(false);
  const [isPrintBonOpen, setIsPrintBonOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dis));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [dis]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Find current DI
  const currentIndex = dis.findIndex(d => d.id === currentDiId);
  const currentDi = currentIndex >= 0 ? dis[currentIndex] : dis[0] || INITIAL_DIS[0];

  // Navigation handlers
  const canPrev = currentIndex > 0;
  const canNext = currentIndex >= 0 && currentIndex < dis.length - 1;

  const handlePrev = () => {
    if (canPrev) {
      setCurrentDiId(dis[currentIndex - 1].id);
      setActiveTab('detail');
    }
  };

  const handleNext = () => {
    if (canNext) {
      setCurrentDiId(dis[currentIndex + 1].id);
      setActiveTab('detail');
    }
  };

  // Field change handler
  const handleFieldChange = (field: keyof DemandeIntervention, value: any) => {
    setDis(prev => prev.map(item => {
      if (item.id === currentDi.id) {
        return {
          ...item,
          [field]: value,
          updatedAt: new Date().toISOString(),
        };
      }
      return item;
    }));
    setHasUnsavedChanges(true);
  };

  // Save changes
  const handleSave = () => {
    setHasUnsavedChanges(false);
    showToast(`Demande d'Intervention ${currentDi.id} enregistrée avec succès.`);
  };

  // Create new DI
  const handleNewDi = () => {
    const nextNumber = dis.length + 19;
    const newId = `DI-2024-00${nextNumber < 100 ? nextNumber : nextNumber}`;
    const today = new Date().toISOString().split('T')[0];
    const nowIso = new Date().toISOString().slice(0, 16);

    const newDi: DemandeIntervention = {
      id: newId,
      numeroDaf: `DAF-${7600 + nextNumber}`,
      etat: '0. Créée',
      demandeurCode: DEMANDEURS_CATALOG[0].code,
      demandeurNom: DEMANDEURS_CATALOG[0].nom,
      courriel: DEMANDEURS_CATALOG[0].courriel,
      descriptionIncident: '',
      equipementCode: EQUIPEMENTS_CATALOG[0].code,
      equipementNom: EQUIPEMENTS_CATALOG[0].nom,
      dateDeclaration: nowIso,
      dateFinPrevue: today,
      typeRepartition: '0. Sans répartition',
      sourceConstatationCode: SOURCES_CATALOG[0].code,
      sourceConstatationNom: SOURCES_CATALOG[0].nom,
      prioriteCode: 'U2',
      prioriteNom: 'NORMAL',
      superviseurCode: SUPERVISEURS_CATALOG[0].code,
      superviseurNom: SUPERVISEURS_CATALOG[0].nom,
      otNumero: '',
      otEtat: '',
      otTechnicien: '',
      otCommentaire: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDis(prev => [newDi, ...prev]);
    setCurrentDiId(newId);
    setActiveTab('detail');
    setIsViewOnly(false);
    showToast(`Nouvelle demande ${newId} créée.`);
  };

  // Open DI from Accueil Table
  const handleOpenDi = (id: string) => {
    setCurrentDiId(id);
    setActiveTab('detail');
  };

  // Delete DI
  const handleDeleteDi = (id: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la demande ${id} ?`)) {
      setDis(prev => prev.filter(d => d.id !== id));
      showToast(`Demande ${id} supprimée.`);
      if (currentDiId === id) {
        const remaining = dis.filter(d => d.id !== id);
        if (remaining.length > 0) {
          setCurrentDiId(remaining[0].id);
        }
      }
    }
  };

  // Action Select Handler
  const handleActionSelect = (action: string) => {
    switch (action) {
      case 'generate_ot':
        setIsGenerateOtOpen(true);
        break;
      case 'validate':
        handleFieldChange('etat', '1. Validée');
        showToast(`La demande ${currentDi.id} a été validée.`);
        break;
      case 'close_di':
        handleFieldChange('etat', '4. Clôturée');
        showToast(`La demande ${currentDi.id} a été clôturée avec succès.`);
        break;
      case 'reject':
        handleFieldChange('etat', '5. Rejetée');
        showToast(`La demande ${currentDi.id} a été rejetée.`);
        break;
      case 'duplicate': {
        const dupId = `DI-2024-00${dis.length + 25}`;
        const duplicated: DemandeIntervention = {
          ...currentDi,
          id: dupId,
          etat: '0. Créée',
          otNumero: '',
          otEtat: '',
          otTechnicien: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setDis(prev => [duplicated, ...prev]);
        setCurrentDiId(dupId);
        showToast(`DI dupliquée sous la référence ${dupId}`);
        break;
      }
      case 'print':
        setIsPrintBonOpen(true);
        break;
      case 'export_json': {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dis, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `gmao_demandes_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast("Export JSON téléchargé avec succès.");
        break;
      }
      default:
        break;
    }
  };

  // Lookup selections
  const handleSelectDemandeur = (d: DemandeurRef) => {
    handleFieldChange('demandeurCode', d.code);
    handleFieldChange('demandeurNom', d.nom);
    handleFieldChange('courriel', d.courriel);
  };

  const handleSelectEquipement = (e: EquipementRef) => {
    handleFieldChange('equipementCode', e.code);
    handleFieldChange('equipementNom', e.nom);
  };

  const handleSelectSource = (s: SourceConstatationRef) => {
    handleFieldChange('sourceConstatationCode', s.code);
    handleFieldChange('sourceConstatationNom', s.nom);
  };

  const handleSelectPriorite = (p: PrioriteRef) => {
    handleFieldChange('prioriteCode', p.code);
    handleFieldChange('prioriteNom', p.nom);
  };

  const handleSelectSuperviseur = (s: SuperviseurRef) => {
    handleFieldChange('superviseurCode', s.code);
    handleFieldChange('superviseurNom', s.nom);
  };

  const handleConfirmOt = (otData: {
    otNumero: string;
    otEtat: string;
    otTechnicien: string;
    otCommentaire: string;
  }) => {
    handleFieldChange('otNumero', otData.otNumero);
    handleFieldChange('otEtat', otData.otEtat);
    handleFieldChange('otTechnicien', otData.otTechnicien);
    handleFieldChange('otCommentaire', otData.otCommentaire);
    handleFieldChange('etat', '3. Prise en charge (OT généré)');
    showToast(`Ordre de travail ${otData.otNumero} associé avec succès.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f5f9] text-slate-900 font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP TAB BAR (Faithful reproduction of the screenshot header) */}
      <header className="bg-white border-b border-[#0078d7] flex items-stretch px-2 pt-1 select-none">
        <div className="flex items-end gap-1 flex-1">
          {/* Tab 1: ACCUEIL DEMANDEUR */}
          <button
            onClick={() => setActiveTab('accueil')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase transition tracking-wide rounded-t cursor-pointer ${
              activeTab === 'accueil'
                ? 'bg-[#0078d7] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-t border-l border-r border-slate-300'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>ACCUEIL DEMANDEUR</span>
          </button>

          {/* Tab 2: DÉTAIL DE LA DEMANDE D'INTERVENTION (Active in screenshot) */}
          <div
            onClick={() => setActiveTab('detail')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase transition tracking-wide rounded-t cursor-pointer ${
              activeTab === 'detail'
                ? 'bg-[#0078d7] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-t border-l border-r border-slate-300'
            }`}
          >
            <span>DÉTAIL DE LA DEMANDE D'INTERVENTION</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('accueil');
              }}
              title="Fermer l'onglet de détail"
              className="ml-2 hover:bg-white/20 p-0.5 rounded transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Brand / Enterprise Name */}
        <div className="flex items-center gap-2 px-3 text-slate-500 text-[11px] font-medium hidden md:flex">
          <Building2 className="w-4 h-4 text-[#0078d7]" />
          <span className="font-bold text-slate-700">FADESOL GMAO</span>
          <span className="text-slate-400">| Module Interventions</span>
        </div>
      </header>

      {/* Main View Area */}
      {activeTab === 'detail' ? (
        <div className="flex flex-col flex-1">
          {/* Toolbar (Directly beneath tabs as in screenshot) */}
          <GmaoToolbar
            onPrev={handlePrev}
            onNext={handleNext}
            onNew={handleNewDi}
            onSave={handleSave}
            onExit={() => setActiveTab('accueil')}
            onToggleViewOnly={() => setIsViewOnly(!isViewOnly)}
            isViewOnly={isViewOnly}
            onRefresh={() => showToast("Données de la demande actualisées.")}
            onFilterPlus={() => setLookupState({ isOpen: true, type: 'di' })}
            onFilterClear={() => showToast("Filtres réinitialisés.")}
            onHelp={() => setIsHelpOpen(true)}
            onActionSelect={handleActionSelect}
            canPrev={canPrev}
            canNext={canNext}
            hasUnsavedChanges={hasUnsavedChanges}
          />

          {/* Detail Form */}
          <main className="flex-1 p-4 overflow-y-auto">
            <div className="bg-white rounded border border-slate-200 shadow-xs">
              <GmaoDetailForm
                di={currentDi}
                allDis={dis}
                isViewOnly={isViewOnly}
                onChange={handleFieldChange}
                onSelectDiId={(id) => setCurrentDiId(id)}
                onOpenLookup={(type) => {
                  if (type === 'ot') {
                    setIsGenerateOtOpen(true);
                  } else {
                    setLookupState({ isOpen: true, type });
                  }
                }}
                onOpenEquipmentTree={() => setIsEquipmentTreeOpen(true)}
              />
            </div>
          </main>
        </div>
      ) : (
        <GmaoAccueilTable
          dis={dis}
          onOpenDi={handleOpenDi}
          onNewDi={handleNewDi}
          onPrintDi={(diItem) => {
            setCurrentDiId(diItem.id);
            setIsPrintBonOpen(true);
          }}
          onGenerateOt={(diItem) => {
            setCurrentDiId(diItem.id);
            setIsGenerateOtOpen(true);
          }}
          onDeleteDi={handleDeleteDi}
        />
      )}

      {/* BOTTOM STATUS BAR (Faithfully mirrors the soft blue line/bar at bottom left of screenshot) */}
      <footer className="bg-white border-t border-slate-200 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-500 select-none">
        <div className="flex items-center gap-3">
          {/* Soft blue progress indicator from screenshot */}
          <div className="w-16 h-2 bg-blue-100 rounded-full overflow-hidden border border-blue-200">
            <div className="h-full bg-[#0078d7] w-3/4 rounded-full" />
          </div>
          <span className="font-mono text-slate-600">
            Fiche active : <strong className="text-slate-800">{currentDi.id}</strong> ({currentIndex + 1}/{dis.length})
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-500">
            Équipement : {currentDi.equipementNom.slice(0, 45)}...
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Connecté au serveur GMAO
          </span>
          <span className="font-mono text-[10px] text-slate-400">v4.8.2-PROD</span>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Generic Lookup Modal */}
      <LookupModal
        isOpen={lookupState.isOpen}
        type={lookupState.type}
        onClose={() => setLookupState(prev => ({ ...prev, isOpen: false }))}
        onSelectDemandeur={handleSelectDemandeur}
        onSelectEquipement={handleSelectEquipement}
        onSelectSource={handleSelectSource}
        onSelectPriorite={handleSelectPriorite}
        onSelectSuperviseur={handleSelectSuperviseur}
        demandeurs={DEMANDEURS_CATALOG}
        equipements={EQUIPEMENTS_CATALOG}
        sources={SOURCES_CATALOG}
        priorites={PRIORITES_CATALOG}
        superviseurs={SUPERVISEURS_CATALOG}
      />

      {/* 2. Equipment Tree Hierarchy Modal */}
      <EquipmentTreeModal
        isOpen={isEquipmentTreeOpen}
        onClose={() => setIsEquipmentTreeOpen(false)}
        onSelectEquipement={handleSelectEquipement}
        currentCode={currentDi.equipementCode}
        equipements={EQUIPEMENTS_CATALOG}
      />

      {/* 3. Generate Work Order (OT) Modal */}
      <GenerateOtModal
        isOpen={isGenerateOtOpen}
        di={currentDi}
        onClose={() => setIsGenerateOtOpen(false)}
        onConfirmOt={handleConfirmOt}
      />

      {/* 4. Print Bon de DI Modal */}
      <PrintBonModal
        isOpen={isPrintBonOpen}
        di={currentDi}
        onClose={() => setIsPrintBonOpen(false)}
      />

      {/* 5. User Help & Guide Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
