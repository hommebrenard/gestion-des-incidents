import React, { useState } from 'react';
import { Wrench, X, CheckCircle, Clock, User, FileText } from 'lucide-react';
import { DemandeIntervention } from '../types/gmao';

interface GenerateOtModalProps {
  isOpen: boolean;
  di: DemandeIntervention;
  onClose: () => void;
  onConfirmOt: (otData: {
    otNumero: string;
    otEtat: string;
    otTechnicien: string;
    otCommentaire: string;
  }) => void;
}

export const GenerateOtModal: React.FC<GenerateOtModalProps> = ({
  isOpen,
  di,
  onClose,
  onConfirmOt,
}) => {
  const generatedOtNumber = di.otNumero || `OT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const [otEtat, setOtEtat] = useState(di.otEtat || '10. Pris en charge');
  const [technicien, setTechnicien] = useState(di.otTechnicien || 'M. TAHIRI Nabil (Technicien Électromécanicien)');
  const [commentaire, setCommentaire] = useState(
    di.otCommentaire || `Intervention sur ${di.equipementNom} suite à DI : ${di.descriptionIncident}`
  );
  const [delaiHeures, setDelaiHeures] = useState('2');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmOt({
      otNumero: generatedOtNumber,
      otEtat,
      otTechnicien: technicien,
      otCommentaire: commentaire,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-lg bg-white shadow-2xl border border-slate-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0078d7] text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            <span className="font-semibold text-sm tracking-wide">
              {di.otNumero ? `Gestion de l'Ordre de Travail : ${di.otNumero}` : `Génération d'un Ordre de Travail (OT)`}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded-sm transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          {/* DI Context Banner */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-slate-700">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-900">Demande d'Intervention associée :</span>
              <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-blue-300 text-blue-800">{di.id}</span>
            </div>
            <div className="text-[11px] text-slate-600 line-clamp-2">
              <span className="font-semibold">Équipement:</span> {di.equipementNom}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">N° d'OT Généré</label>
              <input
                type="text"
                value={generatedOtNumber}
                readOnly
                className="w-full px-2.5 py-1.5 bg-slate-100 border border-slate-300 rounded font-mono font-bold text-blue-700 select-all"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Statut Initial de l'OT</label>
              <select
                value={otEtat}
                onChange={(e) => setOtEtat(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:border-[#0078d7]"
              >
                <option value="10. Pris en charge">10. Pris en charge</option>
                <option value="20. En cours d'exécution">20. En cours d'exécution</option>
                <option value="25. En attente pièces de rechange">25. En attente pièces de rechange</option>
                <option value="30. Terminé (Attente clôture)">30. Terminé (Attente clôture)</option>
                <option value="40. Clôturé / Réceptionné">40. Clôturé / Réceptionné</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" /> Technicien / Équipe affectée
            </label>
            <select
              value={technicien}
              onChange={(e) => setTechnicien(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:border-[#0078d7]"
            >
              <option value="M. TAHIRI Nabil (Technicien Électromécanicien)">M. TAHIRI Nabil (Technicien Électromécanicien)</option>
              <option value="S. KABBAJ Yassine (Électricien HT/BT & Onduleurs)">S. KABBAJ Yassine (Électricien HT/BT & Onduleurs)</option>
              <option value="H. BOUSFIHA Omar (Frigoriste / Climatisation HVAC)">H. BOUSFIHA Omar (Frigoriste / Climatisation HVAC)</option>
              <option value="A. RADI Mehdi (Automaticien Régulateur)">A. RADI Mehdi (Automaticien Régulateur)</option>
              <option value="PRESTATAIRE EXTERNE - FABRICANT / CONSTRUCTEUR">PRESTATAIRE EXTERNE - FABRICANT / CONSTRUCTEUR</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" /> Estimation durée d'intervention (Heures)
            </label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={delaiHeures}
              onChange={(e) => setDelaiHeures(e.target.value)}
              className="w-32 px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:border-[#0078d7]"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-500" /> Instructions & Travaux prescrits
            </label>
            <textarea
              rows={3}
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:border-[#0078d7] text-slate-800"
              placeholder="Consignes de sécurité, EPI obligatoires, modes opératoires..."
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#0078d7] text-white rounded hover:bg-blue-700 font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {di.otNumero ? 'Mettre à jour l\'OT' : 'Valider & Créer l\'OT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
