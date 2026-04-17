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

      <body className="font-caslon antialiased">
        {header?.fields && <Header {...header.fields} />}
        <main>{children}</main>
        {footer?.fields && <Footer {...footer.fields} />}
      </body>
    </html>
  );
}