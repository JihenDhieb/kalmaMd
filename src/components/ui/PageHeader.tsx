type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ description, eyebrow, title }: PageHeaderProps) {
  return (
    <div>
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-wide text-primary-700">{eyebrow}</p> : null}
      <h1 className="mt-3 text-3xl font-bold text-foreground">{title}</h1>
      {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">{description}</p> : null}
    </div>
  );
}

