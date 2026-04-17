type FooterProps = {
  links?: string[];
  copyrightText?: string;
};

export default function Footer({ links, copyrightText }: FooterProps) {
  const parsedLinks = (links || []).map((raw) => {
    const [label, href] = raw.split("|");
    return { label: label?.trim() ?? raw, href: href?.trim() ?? "/" };
  });

  return (
    <footer className="mt-12 border-t px-6 py-6 text-sm text-gray-600 flex justify-content-between bg-brown-700 text-white">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 mb-3">
          {parsedLinks.map(({ label, href }, i) => (
            <a key={i} href={href} className="hover:underline cursor-pointer font-avenir">
              {label}
            </a>
          ))}
        </div>
        <p className="font-avenir">{copyrightText}</p>
      </div>
    </footer>
  );
}