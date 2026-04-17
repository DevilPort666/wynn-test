import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getHeader, getFooter } from '@/lib/api';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [header, footer] = await Promise.all([
    getHeader(),
    getFooter(),
  ]);

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/libre-caslon-display" rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/avenir" rel="stylesheet"/>
      </head>

      <body className="font-caslon antialiased min-h-screen flex flex-col">
        {header?.fields && <Header {...header.fields} />}
        <main className="flex-1 flex flex-col">{children}</main>
        {footer?.fields && <Footer {...footer.fields} />}
      </body>
    </html>
  );
}