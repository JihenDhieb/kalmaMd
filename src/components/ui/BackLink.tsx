import Link from "next/link";

type BackLinkProps = {
  href: string;
  label: string;
};

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900 hover:underline" href={href}>
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
        <path d="m15 18-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
      {label}
    </Link>
  );
}

