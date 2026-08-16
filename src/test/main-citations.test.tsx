import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ArtSection } from "@/components/sections/ArtSection";
import { BioSection } from "@/components/sections/BioSection";
import { SideProjectsSection } from "@/components/sections/SideProjectsSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { TooltipProvider } from "@/components/ui/tooltip";

function renderMainCitationSections() {
  return render(
    <TooltipProvider delayDuration={0}>
      <MemoryRouter>
        <BioSection />
        <WorkSection />
        <ArtSection />
        <SideProjectsSection />
      </MemoryRouter>
    </TooltipProvider>,
  );
}

describe("main-page citations", () => {
  it("links homepage claims to full citation tooltips", async () => {
    renderMainCitationSections();

    const agencySource = screen.getByRole("link", { name: /source 1: ryan/i });
    expect(agencySource).toHaveAttribute("href", "https://doi.org/10.1037/0003-066X.55.1.68");
    fireEvent.focus(agencySource);
    await waitFor(() => expect(screen.getAllByRole("tooltip").some((tooltip) => (
      tooltip.textContent?.includes("autonomy and competence informs how I think about agency")
    ))).toBe(true));

    expect(screen.getByRole("link", { name: /source 2: cohen/i })).toHaveAttribute(
      "href",
      "https://pubmed.ncbi.nlm.nih.gov/17395573/",
    );
    expect(screen.getByRole("link", { name: /source 3: trofimova/i })).toHaveAttribute(
      "href",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC12941731/",
    );
    expect(screen.queryByText(/acceptable option is enough/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/interleaving and serendipitous learning/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Fashion" })).toHaveAttribute("href", "/art?section=fashion");
  });

  it("places self-efficacy source inside the behavior change thought", () => {
    renderMainCitationSections();

    expect(screen.queryByText(/premature closure/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /source 4: bandura/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /read more about behavior change/i }));
    expect(screen.getByText(/build evidence that they are capable/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /source 4: bandura/i })).toHaveAttribute(
      "href",
      "https://doi.org/10.1037/0033-295X.84.2.191",
    );
  });
});

describe("work interactions", () => {
  it("groups core skills and reveals mapped secondary experience", () => {
    render(
      <TooltipProvider>
        <WorkSection />
      </TooltipProvider>,
    );

    expect(screen.getByRole("heading", { name: "Product & AI" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Build & Communicate" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Lead & Serve" })).toBeInTheDocument();
    expect(screen.queryByText("Patient Assistance Volunteer")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Customer-Facing" }));

    expect(screen.getAllByText("Patient Assistance Volunteer").length).toBeGreaterThan(0);
    expect(screen.queryByText("Automation / DevOps Engineer I")).not.toBeInTheDocument();
  });
});
