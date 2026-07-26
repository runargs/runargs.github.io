import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Guestbook } from "@/components/feedback/Guestbook";
import { TooltipProvider } from "@/components/ui/tooltip";

function renderGuestbook(page: string, id: string) {
  return render(
    <TooltipProvider delayDuration={0}>
      <Guestbook id={id} page={page} />
    </TooltipProvider>,
  );
}

describe("Guestbook", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("accepts a one-click kudos with durable page metadata", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    renderGuestbook("main", "guestbook");
    const kudosCount = screen.getByRole("button", { name: "6 kudos" });
    expect(kudosCount).toBeInTheDocument();
    fireEvent.focus(kudosCount);
    await waitFor(() => expect(screen.getByRole("tooltip")).toHaveTextContent("Updated as of: 2026-07-26"));
    fireEvent.click(screen.getByRole("button", { name: "Leave kudos" }));

    await waitFor(() => expect(screen.getByText("Kudos received.")).toBeInTheDocument());
    expect(screen.getByText("7 kudos")).toBeInTheDocument();
    expect(window.localStorage.getItem("portfolio-guestbook-kudos:main")).toBe("6");
    const body = fetchMock.mock.calls[0][1].body as FormData;
    expect(body.get("signal")).toBe("kudos");
    expect(body.get("page")).toBe("main");
    expect(body.get("schema_version")).toBe("guestbook-v1");
    expect(body.get("submitted_at")).toBeTruthy();
  });

  it("keeps structured context optional and submits it with a note", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    renderGuestbook("art", "art-guestbook");
    fireEvent.click(screen.getByRole("button", { name: "Add a note" }));
    fireEvent.click(screen.getByRole("radio", { name: "Creative practice" }));
    fireEvent.click(screen.getByRole("radio", { name: "Yes" }));
    fireEvent.change(screen.getByRole("textbox", { name: /leave a note/i }), { target: { value: "The ceramics stayed with me." } });
    fireEvent.click(screen.getByRole("button", { name: /sign the guestbook/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const body = fetchMock.mock.calls[0][1].body as FormData;
    expect(body.get("visitor_intent")).toBe("Creative practice");
    expect(body.get("goal_success")).toBe("Yes");
    expect(body.get("note")).toBe("The ceramics stayed with me.");
  });
});
