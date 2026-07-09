import { useState } from "react";
import { DossierButton, SectionBand, SectionHeader, StampBadge } from "@/components/design-system/Dossier";

const accomplishments = [
  {
    id: "1",
    title: "Strategic Business Plan Award",
    organization: "tecBRIDGE radio",
    year: "2018",
    icon: "award",
  },
  {
    id: "2",
    title: "Award for Excellence in Applied Computing, Magna Cum Laude",
    organization: "University of Scranton",
    year: "2021",
    icon: "award",
  },
  {
    id: "3",
    title: "First Place: Autonomous Maze-Solving Robotics Competition",
    organization: "University of Scranton",
    year: "2018",
    icon: "trophy",
  },
  {
    id: "4",
    title: "Technical Competition Finalist: SumoBot Engineering",
    organization: "IEEE Hackathon",
    year: "2019",
    icon: "star",
  },
  {
    id: "5",
    title: "Leadership Award",
    organization: "The Ronald Reagan Presidential Foundation & Institute",
    year: "2017",
    icon: "star",
  },
  {
    id: "6",
    title: "Philanthropic Leadership: Grand Champion Fundraiser",
    organization: "Walk to End Alzheimer’s",
    year: "2017",
    icon: "trophy",
  },
  {
    id: "7",
    title: "Exemplary Leadership Award",
    organization: "21st Century Cyber Charter",
    year: "2018",
    icon: "star",
  },
  {
    id: "8",
    title: "Regional Leadership Recognition",
    organization: "NBC10 / Widener University",
    year: "2018",
    icon: "award",
  },
  {
    id: "9",
    title: "Graphic Design Competition Runner-Up",
    organization: "Instructables.com",
    year: "2015",
    icon: "star",
  },
  {
    id: "10",
    title: "Scholastic Art & Writing Silver Key",
    organization: "Greater Philadelphia Region",
    year: "2015",
    icon: "award",
  },
  {
    id: "11",
    title: "Academic Excellence: Top 3% of Class",
    organization: "21st Century Cyber Charter",
    year: "2018",
    icon: "star",
  },
  {
    id: "12",
    title: "Dean’s List for Academic Achievement",
    organization: "University of Scranton",
    year: "2021",
    icon: "star",
  },
  {
    id: "13",
    title: "University Merit Grant",
    organization: "University of Scranton",
    year: "2018",
    icon: "award",
  },
  {
    id: "14",
    title: "Freedom Credit Union Grant",
    organization: "Freedom Credit Union",
    year: "2018",
    icon: "award",
  },
  {
    id: "15",
    title: "AAWC Merit Award",
    organization: "FISDU & Asian American Women’s Coalition",
    year: "2018",
    icon: "award",
  },
];

export function AccomplishmentsSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialLimit = 3;
  const visibleList = isExpanded ? accomplishments : accomplishments.slice(0, initialLimit);
  const totalCount = accomplishments.length;
  const remainingCount = totalCount - initialLimit;

  return (
    <SectionBand id="accomplishments">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          marker="03"
          eyebrow="Background"
          title="Honors as dated records."
          description="Selected honors, awards, and recognitions retained as a compact ledger."
          className="mb-8"
        />

        <div className="notched border border-[var(--rule)] bg-[var(--paper-card)]">
          <div className="flex items-center justify-between border-b border-[var(--rule)] px-4 py-3">
            <span className="small-label">Evidence schedule</span>
            <span className="font-display text-2xl text-[var(--civic-blue)]">{totalCount}</span>
          </div>
          {visibleList.map((item) => {
            return (
              <div key={item.id} className="grid gap-3 border-b border-[rgba(213,198,177,0.7)] px-4 py-3 transition-colors last:border-b-0 hover:bg-[var(--civic-blue-soft)] md:grid-cols-[72px_minmax(0,1fr)_auto] md:items-center">
                <span className="font-display text-2xl text-[var(--civic-blue)]">{item.year}</span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-sm font-semibold text-[var(--ink)]">
                      {item.title}
                    </span>
                  </div>
                  <span className="mt-0.5 block text-xs text-[var(--ink-muted)]">
                    {item.organization}
                  </span>
                </div>
                <StampBadge tone={item.icon === "trophy" ? "ochre" : "blue"}>{item.icon}</StampBadge>
              </div>
            );
          })}
        </div>

        {!isExpanded && remainingCount > 0 && (
          <div className="mt-8 flex justify-center">
            <DossierButton
              onClick={() => setIsExpanded(true)}
            >
              Show {remainingCount} more
            </DossierButton>
          </div>
        )}
      </div>
    </SectionBand>
  );
}
