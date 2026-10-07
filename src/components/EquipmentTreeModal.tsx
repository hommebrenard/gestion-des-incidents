import React, { useState } from 'react';
import { Network, Folder, ChevronRight, ChevronDown, Check, X, Cpu, Zap, Wind, Droplets } from 'lucide-react';
import { EquipementRef } from '../types/gmao';

interface EquipmentTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEquipement: (eq: EquipementRef) => void;
  currentCode?: string;
  equipements: EquipementRef[];
}

interface TreeNode {
  id: string;
  name: string;
  isFolder: boolean;
  code?: string;
  equipement?: EquipementRef;
  children?: TreeNode[];
}

export const EquipmentTreeModal: React.FC<EquipmentTreeModalProps> = ({
  isOpen,
  onClose,
  onSelectEquipement,
  currentCode,
  equipements,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'usine': true,
    'bat-a': true,
    'bat-b': true,
    'secours': true,
  });

  if (!isOpen) return null;

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getEq = (code: string) => equipements.find(e => e.code === code);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0078d7] text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4" />
            <span className="font-semibold text-sm tracking-wide">
              Arborescence Technique & Hiérarchie des Équipements
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-sm transition"
            title="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs text-slate-600">
          Naviguez dans l'arborescence des installations pour cibler l'équipement source concerné par la demande d'intervention.
        </div>

        {/* Tree Container */}
        <div className="p-4 overflow-y-auto flex-1 font-sans text-xs select-none">
          {/* Root: Usine */}
          <div className="space-y-1">
            <div 
              onClick={() => toggleNode('usine')} 
              className="flex items-center gap-1.5 font-bold text-slate-800 p-1 hover:bg-slate-100 rounded cursor-pointer"
            >
              {expandedNodes['usine'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
              <Folder className="w-4 h-4 text-amber-500" />
              <span>USINE PRINCIPALE FADESOL (SITE INDUSTRIEL)</span>
            </div>

            {expandedNodes['usine'] && (
              <div className="pl-5 space-y-1 border-l border-slate-200 ml-2">
                {/* Batiment A */}
                <div>
                  <div 
                    onClick={() => toggleNode('bat-a')} 
                    className="flex items-center gap-1.5 font-semibold text-slate-700 p-1 hover:bg-slate-100 rounded cursor-pointer"
                  >
                    {expandedNodes['bat-a'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                    <Folder className="w-4 h-4 text-amber-500" />
                    <span>BÂTIMENT A - PRODUCTION & DISTRIBUTION ÉLECTRIQUE</span>
                  </div>

                  {expandedNodes['bat-a'] && (
                    <div className="pl-5 space-y-1 border-l border-slate-200 ml-2">
                      {/* Salle Onduleurs */}
                      <div>
                        <div 
                          onClick={() => toggleNode('secours')} 
                          className="flex items-center gap-1.5 font-medium text-slate-700 p-1 hover:bg-slate-100 rounded cursor-pointer"
                        >
                          {expandedNodes['secours'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                          <Folder className="w-4 h-4 text-blue-500" />
                          <span>Local Technique Onduleurs Secours TGBT</span>
                        </div>

                        {expandedNodes['secours'] && (
                          <div className="pl-6 space-y-1 border-l border-slate-200 ml-2">
                            {/* ONDULEUR N3 */}
                            {getEq('EQ-OND-03') && (
                              <div 
                                onClick={() => {
                                  onSelectEquipement(getEq('EQ-OND-03')!);
                                  onClose();
                                }}
                                className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition border ${
                                  currentCode === 'EQ-OND-03' 
                                    ? 'bg-blue-100 border-blue-400 text-blue-900 font-bold' 
                                    : 'hover:bg-blue-50 border-transparent hover:border-blue-200'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                                  <span className="font-mono text-blue-700 font-bold">EQ-OND-03</span>
                                  <span className="text-slate-800">ONDULEUR N3 MARQUE: FADESOL, PUISSANCE: 10KVA</span>
                                </div>
                                <button className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px]">
                                  Sélectionner
                                </button>
                              </div>
                            )}

                            {/* TGBT 01 */}
                            {getEq('EQ-TGBT-01') && (
                              <div 
                                onClick={() => {
                                  onSelectEquipement(getEq('EQ-TGBT-01')!);
                                  onClose();
                                }}
                                className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition border ${
                                  currentCode === 'EQ-TGBT-01' 
                                    ? 'bg-blue-100 border-blue-400 text-blue-900 font-bold' 
                                    : 'hover:bg-blue-50 border-transparent hover:border-blue-200'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                                  <span className="font-mono text-blue-700 font-bold">EQ-TGBT-01</span>
                                  <span className="text-slate-800">TABLEAU GÉNÉRAL BASSE TENSION TGBT 01 - 2500A</span>
                                </div>
                                <button className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px]">
                                  Sélectionner
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Batiment B */}
                <div>
                  <div 
                    onClick={() => toggleNode('bat-b')} 
                    className="flex items-center gap-1.5 font-semibold text-slate-700 p-1 hover:bg-slate-100 rounded cursor-pointer"
                  >
                    {expandedNodes['bat-b'] ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                    <Folder className="w-4 h-4 text-amber-500" />
                    <span>BÂTIMENT B - UTILITÉS CENTRALES & FLUIDES</span>
                  </div>

                  {expandedNodes['bat-b'] && (
                    <div className="pl-6 space-y-1 border-l border-slate-200 ml-2">
                      {/* Compresseur */}
                      {getEq('EQ-COMP-02') && (
                        <div 
                          onClick={() => {
                            onSelectEquipement(getEq('EQ-COMP-02')!);
                            onClose();
                          }}
                          className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition border ${
                            currentCode === 'EQ-COMP-02' 
                              ? 'bg-blue-100 border-blue-400 text-blue-900 font-bold' 
                              : 'hover:bg-blue-50 border-transparent hover:border-blue-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Wind className="w-3.5 h-3.5 text-cyan-600" />
                            <span className="font-mono text-blue-700 font-bold">EQ-COMP-02</span>
                            <span className="text-slate-800">COMPRESSEUR D'AIR ATLAS COPCO GA-45</span>
                          </div>
                          <button className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px]">
                            Sélectionner
                          </button>
                        </div>
                      )}

                      {/* Pompe KSB */}
                      {getEq('EQ-POMP-07') && (
                        <div 
                          onClick={() => {
                            onSelectEquipement(getEq('EQ-POMP-07')!);
                            onClose();
                          }}
                          className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition border ${
                            currentCode === 'EQ-POMP-07' 
                              ? 'bg-blue-100 border-blue-400 text-blue-900 font-bold' 
                              : 'hover:bg-blue-50 border-transparent hover:border-blue-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Droplets className="w-3.5 h-3.5 text-blue-600" />
                            <span className="font-mono text-blue-700 font-bold">EQ-POMP-07</span>
                            <span className="text-slate-800">POMPE DE CIRCULATION KSB MULTITEC 65 EAU GLACÉE</span>
                          </div>
                          <button className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px]">
                            Sélectionner
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Batiment C */}
                <div className="pl-6 space-y-1">
                  {getEq('EQ-CLIM-12') && (
                    <div 
                      onClick={() => {
                        onSelectEquipement(getEq('EQ-CLIM-12')!);
                        onClose();
                      }}
                      className="flex items-center justify-between p-1.5 rounded cursor-pointer transition hover:bg-blue-50 border border-transparent hover:border-blue-200"
                    >
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-purple-600" />
                        <span className="font-mono text-blue-700 font-bold">EQ-CLIM-12</span>
                        <span className="text-slate-800">GROUPE DE CLIMATISATION CARRIER AQUASNAP 120KW</span>
                      </div>
                      <button className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px]">
                        Sélectionner
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end">
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
