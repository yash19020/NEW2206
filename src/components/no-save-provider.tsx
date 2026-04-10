"use client";

import { useEffect } from "react";

/**
 * Soft deterrent only.
 * - Blocks right-click "Save image as…" on decorative layers marked with `data-no-save`.
 * - Does NOT prevent downloading via DevTools or direct URLs.
 */
export function NoSaveProvider() {
  useEffect(() => {
    const isProtected = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest("[data-no-save]"));
    };

    const onContextMenu = (e: Event) => {
      if (!isProtected(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
    };

    const onDragStart = (e: Event) => {
      if (!isProtected(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("contextmenu", onContextMenu, { capture: true });
    document.addEventListener("dragstart", onDragStart, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("dragstart", onDragStart, true);
    };
  }, []);

  return null;
}

