import { useId } from "react";

type FlagProps = { className?: string };

export function FlagID({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="3" height="1" fill="#E70011" />
      <rect y="1" width="3" height="1" fill="#FFFFFF" />
    </svg>
  );
}

export function FlagGB({ className }: FlagProps) {
  const id = useId();
  const clip = `${id}-clip`;
  const diag = `${id}-diag`;

  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <clipPath id={clip}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={diag}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${diag})`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
