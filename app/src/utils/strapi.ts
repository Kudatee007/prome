export const toAbsoluteUrl = (maybeUrl?: string | null) => {
    if (!maybeUrl) return "";
    if (maybeUrl.startsWith("http")) return maybeUrl;
    const base = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, ""); // e.g. http://localhost:1337
    return `${base}${maybeUrl}`;
  };
  