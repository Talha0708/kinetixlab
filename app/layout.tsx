import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'KINETIX | Neon Techwear Sneakers',
  description: 'An edgy, high-performance sneaker store engineered with black, white, and neon green aesthetics, new arrivals, interactive size selectors, and dynamic hover reveals.',
  openGraph: {
    title: 'KINETIX | Neon Techwear Sneakers',
    description: 'An edgy, high-performance sneaker store engineered with black, white, and neon green aesthetics, new arrivals, interactive size selectors, and dynamic hover reveals.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KINETIX | Neon Techwear Sneakers',
    description: 'An edgy, high-performance sneaker store engineered with black, white, and neon green aesthetics, new arrivals, interactive size selectors, and dynamic hover reveals.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-[#060709] text-zinc-100 antialiased selection:bg-[#10ff60] selection:text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
