"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

type MaskRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export default function MaskReveal({
  children,
  className = "",
  delay = 0,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`maskReveal ${on ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="maskRevealInner">{children}</div>
    </div>
  );
}
