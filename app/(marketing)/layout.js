

import '../globals.css';

export const metadata = {
  title: 'News App',
  description: 'News App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

          {children}

    
      </body>
    </html>
  );
}










