import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function Modal({
  title,
  children,
  onClose,
  onSubmit,
  initialFocusRef,
}) {
  const formRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement;
    const animationFrame = requestAnimationFrame(() => {
      (initialFocusRef?.current ?? closeButtonRef.current)?.focus();
    });
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(animationFrame);
      document.body.style.overflow = previousBodyOverflow;
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [initialFocusRef]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab" || !formRef.current) return;

    const focusableElements = formRef.current.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  };

  return createPortal(
    <div className="theme-content fixed inset-0 z-[100] flex h-dvh w-full flex-col bg-app-panel text-app-text">
      <form
        ref={formRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={onSubmit}
        onKeyDown={handleKeyDown}
        className="flex h-full min-h-0 flex-col"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-brand/15 px-4 py-4 sm:px-8">
          <h2 id={titleId} className="text-lg font-bold text-brand-dark">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="بستن پنجره"
            className="rounded-xl p-2 text-brand-dark/70 transition hover:bg-brand-surface"
          >
            <X size={22} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          <div className="mx-auto w-full max-w-3xl space-y-5">{children}</div>
        </div>

        <footer className="flex shrink-0 justify-end gap-3 border-t border-brand/15 px-4 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-brand/20 px-5 py-2.5 text-sm text-brand-dark transition hover:bg-brand-surface/50"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark/90"
          >
            ذخیره
          </button>
        </footer>
      </form>
    </div>,
    document.body,
  );
}
