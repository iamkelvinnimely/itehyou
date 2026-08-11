"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type WaitlistContextValue = {
  openWaitlist: () => void;
  showSuccess: boolean;
  dismissSuccess: () => void;
  celebrate: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return ctx;
}

declare global {
  interface Window {
    Tally?: {
      openPopup: (
        formId: string,
        options?: {
          layout?: "default" | "modal";
          width?: number;
          overlay?: boolean;
          hideTitle?: boolean;
          onSubmit?: (payload: unknown) => void;
        },
      ) => void;
    };
  }
}

export default function WaitlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSuccess, setShowSuccess] = useState(false);

  const celebrate = useCallback(() => {
    setShowSuccess(true);
  }, []);

  const dismissSuccess = useCallback(() => {
    setShowSuccess(false);
  }, []);

  const openWaitlist = useCallback(() => {
    const formId = process.env.NEXT_PUBLIC_TALLY_FORM_ID;

    // Portfolio / preview: no real form yet — still show branded success
    if (!formId || formId === "YOUR_TALLY_FORM_ID") {
      console.warn(
        "Set NEXT_PUBLIC_TALLY_FORM_ID in .env.local for the live Tally form.",
      );
      setShowSuccess(true);
      return;
    }

    if (window.Tally?.openPopup) {
      window.Tally.openPopup(formId, {
        layout: "modal",
        width: 520,
        overlay: true,
        onSubmit: () => {
          setShowSuccess(true);
        },
      });
      return;
    }

    window.open(`https://tally.so/r/${formId}`, "_blank", "noopener,noreferrer");
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.data !== "string") return;
      try {
        const data = JSON.parse(event.data) as {
          event?: string;
          payload?: unknown;
        };
        if (
          data.event === "Tally.FormSubmitted" ||
          data.event === "Tally.PopupClosed"
        ) {
          // Only celebrate on submit
          if (data.event === "Tally.FormSubmitted") {
            setShowSuccess(true);
          }
        }
      } catch {
        /* ignore non-JSON */
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const value = useMemo(
    () => ({ openWaitlist, showSuccess, dismissSuccess, celebrate }),
    [openWaitlist, showSuccess, dismissSuccess, celebrate],
  );

  return (
    <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>
  );
}
