import './globals.css';

export const metadata = {
  title: 'Translator App',
  description: 'A simple translator app using Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
