export interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
}

export const navItems: NavItem[] = [
  { id: "bio", label: "About", shortLabel: "Start" },
  { id: "work", label: "Work", shortLabel: "Work" },
  { id: "talks", label: "Engagements", shortLabel: "Engagements" },
  { id: "community-building", label: "Community", shortLabel: "Civic" },
  { id: "art", label: "Art", shortLabel: "Art" },
  { id: "side-projects", label: "Notes", shortLabel: "Notes" },
  { id: "resume", label: "Résumé", shortLabel: "CV" },
  { id: "mentorship", label: "Contact", shortLabel: "Contact" },
];
