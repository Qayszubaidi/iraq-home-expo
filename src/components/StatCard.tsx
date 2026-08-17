"use client";
import { useEffect, useRef, useState } from "react";

type StatCardProps = {
  value: string;
  label: string;
  description: string;
  index: number;
};

export default function StatCard({ value, label, description, index }: StatCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`statCard ${visible ? "in" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="statIndex">{String(index + 1).padStart(2, "0")}</span>
      <strong className="statValue">{value}</strong>
      <span className="statLabel">{label}</span>
      <small>{description}</small>
    </article>
  );
}
