type IconProps = {
  className?: string;
  size?: number;
};

const defaults = { size: 18, strokeWidth: 1.75 };

function IconBase({
  className,
  size = defaults.size,
  strokeWidth = defaults.strokeWidth,
  children,
}: IconProps & { strokeWidth?: number; children: React.ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconChevron({ className, size = 12 }: IconProps) {
  return (
    <IconBase className={className} size={size} strokeWidth={2}>
      <path d="M6 9l6 6 6-6" />
    </IconBase>
  );
}

export function IconCalendar({ className, size }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </IconBase>
  );
}

export function IconLocation({ className, size }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </IconBase>
  );
}

export function IconClock({ className, size }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </IconBase>
  );
}

export function IconArrow({ className, size = 14 }: IconProps) {
  return (
    <IconBase className={className} size={size} strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </IconBase>
  );
}
