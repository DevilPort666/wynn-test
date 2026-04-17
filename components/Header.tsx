type HeaderProps = {
  logo?: any;
  siteName?: string;
  navigation?: {
    fields?: {
      items?: string[];
    };
  };
};

export default function Header({ logo, siteName, navigation }: HeaderProps) {
  const logoUrl = logo?.fields?.file?.url
    ? `https:${logo.fields.file.url}`
    : null;

  const items = (navigation?.fields?.items || []).map((raw) => {
    const [label, href] = raw.split("|");
    return { label: label?.trim() ?? raw, href: href?.trim() ?? "/" };
  });

  return (
    <header className="flex px-6 py-4 border-b font-avenir">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logoUrl && (
            <img src={logoUrl} alt="logo" className="h-15 w-auto" />
          )}
        </div>

        <nav className="flex gap-6">
          {items.map(({ label, href }, i) => (
            <a key={i} href={href} className="text-sm hover:underline font-avenir">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}