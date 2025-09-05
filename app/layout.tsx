import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlashTrade Sim - Master Flash Trading Risk-Free',
  description: 'A simulated trading environment for users to practice flash trading strategies and improve their skills in real-time without financial risk.',
  keywords: 'trading, simulation, flash trading, practice, risk-free, education',
  authors: [{ name: 'FlashTrade Sim' }],
  openGraph: {
    title: 'FlashTrade Sim - Master Flash Trading Risk-Free',
    description: 'Practice flash trading strategies in a risk-free environment',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
