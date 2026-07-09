export interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
}

export const navItems: NavItem[] = [
  { id: "bio", label: "Field note", shortLabel: "Start" },
  { id: "work", label: "Product work", shortLabel: "Work" },
  { id: "talks", label: "Public links", shortLabel: "Links" },
  { id: "community-building", label: "Community", shortLabel: "Field" },
  { id: "mentorship", label: "Contact", shortLabel: "Contact" },
  { id: "art", label: "Image studies", shortLabel: "Images" },
  { id: "side-projects", label: "Marginalia", shortLabel: "Margin" },
  { id: "resume", label: "Résumé", shortLabel: "Résumé" },
];
