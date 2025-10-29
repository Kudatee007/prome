import { toAbsoluteUrl } from "./strapi";

describe("toAbsoluteUrl", () => {
  it("returns absolute url unchanged", () => {
    const url = "https://picsum.photos/200/300";
    expect(toAbsoluteUrl(url)).toBe(url);
  });

  it("converts relative path to absolute", () => {
    const rel = "/uploads/image.png";
    const out = toAbsoluteUrl(rel);
    expect(out).toMatch(/^https?:\/\//);
    expect(out).toContain("/uploads/image.png");
  });

  it("returns empty string for falsy input", () => {
    expect(toAbsoluteUrl("")).toBe("");
    expect(toAbsoluteUrl(undefined as unknown as string)).toBe("");
  });
});
