const iconClass = 'h-4 w-4';

// Every social icon here is a functioning link elsewhere (Contact.tsx) —
// this component only renders the glyph.
export function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'LinkedIn':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconClass}>
          <path d="M6.5 8.5V18" />
          <path d="M11 18v-5.2c0-1.7 1.1-2.8 2.6-2.8 1.6 0 2.4 1 2.4 2.8V18" />
          <circle cx="6.5" cy="5.8" r="1.2" fill="currentColor" stroke="none" />
          <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconClass}>
          <path d="M9 19c-4 1.2-4-2-6-2" />
          <path d="M15 21v-3.5c0-1 .2-1.6.7-2 2.1-.2 4.3-1 4.3-5.1 0-1.2-.4-2.2-1.2-3 .1-.3.5-1.5-.1-3.1 0 0-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C7 4 6 4.3 6 4.3c-.6 1.6-.2 2.8-.1 3.1-.8.8-1.2 1.8-1.2 3 0 4.1 2.2 4.9 4.3 5.1.5.4.7 1 .7 2V21" />
        </svg>
      );
    case 'X':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
          <path d="M4 4l16 16" />
          <path d="M20 4L8.5 17" />
          <path d="M14 4H20" />
          <path d="M4 20h6" />
        </svg>
      );
    case 'YouTube':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconClass}>
          <rect x="3.5" y="6" width="17" height="12" rx="3.5" />
          <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={iconClass}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <path d="M5.5 8l6.5 5 6.5-5" />
        </svg>
      );
  }
}
