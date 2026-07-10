export interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
}

export const navItems: NavItem[] = [
  { id: "bio", label: "Field Note", shortLabel: "Start" },
  { id: "work", label: "Work Ledger", shortLabel: "Work" },
  { id: "talks", label: "Public Record", shortLabel: "Links" },
  { id: "community-building", label: "Civic Practice", shortLabel: "Civic" },
  { id: "art", label: "Image Archive", shortLabel: "Images" },
  { id: "side-projects", label: "Marginalia", shortLabel: "Notes" },
  { id: "resume", label: "Dossier", shortLabel: "CV" },
  { id: "mentorship", label: "Correspondence", shortLabel: "Contact" },
];
