import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SuspendComponent } from "./SuspendComponent";
import { Suspense, type ReactNode } from "react";

function wrapper({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div>loading...</div>}>{children}</Suspense>;
}

describe("SuspendComponent", () => {
  it("rendered with await act(async () => ...)", async () => {
    await act(async () => {
      render(<SuspendComponent data={Promise.resolve("foo")} />, { wrapper });
    });
    expect(await screen.findByText("Hello, foo!")).toBeInTheDocument();
  });

  it.fails("rendered with act(() => ...)", async () => {
    act(() => {
      render(<SuspendComponent data={Promise.resolve("foo")} />, { wrapper });
    });
    expect(await screen.findByText("Hello, foo!")).toBeInTheDocument();
  });

  it.fails("rendered without act(async () => ...)", async () => {
    render(<SuspendComponent data={Promise.resolve("foo")} />);
    expect(await screen.findByText("Hello, foo!")).toBeInTheDocument();
  });
});
