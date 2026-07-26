export interface GuestbookNote {
  quote: string;
  signature?: string;
}

export interface GuestbookSnapshot {
  updatedAt: string | null;
  totalKudos: number;
  responses: number;
  foundWhatTheyNeeded: number | null;
  notes: GuestbookNote[];
}

// This is the public, curated layer. Raw submissions remain in Gmail and are
// never bundled into the site. Update this snapshot only with approved totals
// and quotes; keeping it in Git makes every published revision recoverable.
export const guestbookSnapshot: GuestbookSnapshot = {
  updatedAt: "2026-07-26",
  totalKudos: 6,
  responses: 6,
  foundWhatTheyNeeded: null,
  notes: [],
};
