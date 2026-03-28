export function VakmanIcon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    hammer: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.048.58.024 1.194-.14 1.743" />
      </svg>
    ),
    saw: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6L6 3.75l2.25 2.25L10.5 3.75l2.25 2.25L15 3.75l2.25 2.25L19.5 3.75 21 5.25v3L3.75 21 3 20.25V6z" />
      </svg>
    ),
    ruler: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364L18.364 5.636m0 0l-2.829-2.828m2.829 2.828L15.536 8.464m2.828-2.828L21.192 8.464M5.636 18.364l2.828 2.828m-2.828-2.828l2.828-2.828m-2.828 2.828L2.808 15.536" />
      </svg>
    ),
    drill: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h-6.75M21 10.5a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5m6 0a1.5 1.5 0 00-1.5-1.5h-3A1.5 1.5 0 0015 10.5m0 0V6a3 3 0 00-3-3H9a3 3 0 00-3 3v4.5m6 0H9m-3 0H3m3 0v7.5a3 3 0 003 3h3a3 3 0 003-3V10.5" />
      </svg>
    ),
    bricks: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 4h9v5H2V4zm11 0h9v5h-9V4zM2 11h6v5H2v-5zm8 0h6v5h-6v-5zm8 0h4v5h-4v-5zM2 18h9v3H2v-3zm11 0h9v3h-9v-3z" />
      </svg>
    ),
    trowel: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 5v2H4V8l8-5zm-8 9h16v2l-8 7-8-7v-2z" />
      </svg>
    ),
    wall: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 4h20v4H2V4zm0 6h10v4H2v-4zm12 0h8v4h-8v-4zM2 16h8v4H2v-4zm10 0h10v4H10v-4z" />
      </svg>
    ),
    tiles: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm10.5 0A2.25 2.25 0 0116.5 3.75h2.25A2.25 2.25 0 0121 6v2.25a2.25 2.25 0 01-2.25 2.25H16.5a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm10.5 0a2.25 2.25 0 012.25-2.25h2.25A2.25 2.25 0 0121 15.75V18a2.25 2.25 0 01-2.25 2.25H16.5a2.25 2.25 0 01-2.25-2.25v-2.25z" />
      </svg>
    ),
    level: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M2 12a2 2 0 002 2h16a2 2 0 002-2M2 12a2 2 0 012-2h16a2 2 0 012 2m-13 0a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0" />
      </svg>
    ),
    bathroom: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12V5a2 2 0 012-2h1m-3 9v5a3 3 0 003 3h12a3 3 0 003-3v-5M7 20v1m10-1v1" />
      </svg>
    ),
    floor: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M3.75 21V3.75m16.5 17.25V3.75M3.75 3.75h16.5m-16.5 0l4.5 4.5m12-4.5l-4.5 4.5M3.75 12h4.5m-4.5 0l4.5 4.5m12-4.5h-4.5m4.5 0l-4.5 4.5m-3.75-12v4.5m0 3h4.5m-4.5 0v4.5" />
      </svg>
    ),
    kitchen: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h20v4H2V6zm0 6h20v9H2v-9zm5 3v3m5-3v3m5-3v3" />
      </svg>
    ),
    wrench: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.048.58.024 1.194-.14 1.743" />
      </svg>
    ),
    scissors: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm9.304 0l-1.536.887M17.152 8.25a3 3 0 105.196-3 3 3 0 00-5.196 3zM12 17.25l-4.152-7.5m0 0L12 12.75m-4.152-3L3 21m9-3.75l4.152-7.5M12 12.75l4.152-3L21 21" />
      </svg>
    ),
    default: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  };

  return icons[name] || icons.default;
}
