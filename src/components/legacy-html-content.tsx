"use client";

import { useSyncExternalStore } from "react";

function useClientMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function LegacyHtmlContent({ html }: { html: string }) {
  const mounted = useClientMounted();
  if (!mounted) {
    return <article className="legacy-content text-[#3d1620]" />;
  }
  return <article className="legacy-content text-[#3d1620]" dangerouslySetInnerHTML={{ __html: html }} />;
}

