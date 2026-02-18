import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function DropdownPortal({ triggerRef, isOpen, children }) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left: rect.left,
        zIndex: 99999,
      });
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;
  return createPortal(<div style={style}>{children}</div>, document.body);
}
