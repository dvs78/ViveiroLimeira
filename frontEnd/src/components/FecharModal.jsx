import { useEffect } from "react";

function FecharModal(onClose, { lockScroll = true, closeOnEsc = true } = {}) {
  // fechar com ESC
  useEffect(() => {
    if (!closeOnEsc) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [closeOnEsc, onClose]);

  // travar o scroll do fundo
  useEffect(() => {
    if (!lockScroll) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lockScroll]);
}

export default FecharModal;
