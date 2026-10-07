export type PriorityCode = 'U0' | 'U1' | 'U2' | 'U3';

export type DiState = 
  | '0. Créée'
  | '1. Validée'
  | '2. En attente validation'
  | '3. Prise en charge (OT généré)'
  | '4. Clôturée'
  | '5. Rejetée';

export interface DemandeIntervention {
  id: string; // e.g. "DI-2024-0104"
  numeroDaf: string; // e.g. "DAF-8820"
  etat: DiState;
  
  // Demandeur
  demandeurCode: string; // e.g. "DEM-014"
  demandeurNom: string; // e.g. "LAAYOUNI EL OUDGHIRI"
  courriel: string; // e.g. "laayouni.oudghiri@entreprise.ma"
  
  // Description
  descriptionIncident: string;
  
  // Equipement
  equipementCode: string; // e.g. "EQ-OND-03"
  equipementNom: string; // e.g. "ONDULEUR N3 MARQUE: FADESOL, PUISSANCE: 10KVA"
  
  // Dates & repartition
  dateDeclaration: string; // YYYY-MM-DD or YYYY-MM-DDTHH:mm
  dateFinPrevue: string; // YYYY-MM-DD
  typeRepartition: string; // e.g. "0. Sans répartition"
  
  // Source
  sourceConstatationCode: string; // e.g. "SRC-CLI"
  sourceConstatationNom: string; // e.g. "Correctif-Demande du client"
  
  // Priorite & Superviseur
  prioriteCode: PriorityCode;
  prioriteNom: string; // e.g. "URGENT"
  superviseurCode: string; // e.g. "SUP-01"
  superviseurNom: string; // e.g. "BENALI MOHAMED"
  
  // Informations OT (Ordre de Travail)
  otNumero?: string; // e.g. "OT-2024-0089"
  otEtat?: string; // e.g. "10. Pris en charge" | "20. En cours d'exécution" | "30. Terminé"
  otTechnicien?: string;
  otCommentaire?: string;
  
  // Metadonnees
  createdAt: string;
  updatedAt: string;
}

export interface DemandeurRef {
  code: string;
  nom: string;
  courriel: string;
  departement: string;
  telephone: string;
}

export interface EquipementRef {
  code: string;
  nom: string;
  categorie: string;
  localisation: string;
  zone: string;
  statut: 'Opérationnel' | 'Dégradé' | 'En arrêt';
  cheminHierarchie?: string;
}

export interface SourceConstatationRef {
  code: string;
  nom: string;
  description: string;
}

export interface PrioriteRef {
  code: PriorityCode;
  nom: string;
  delaiSLA: string;
  couleur: string;
}

export interface SuperviseurRef {
  code: string;
  nom: string;
  specialite: string;
  email: string;
  telephone: string;
}
