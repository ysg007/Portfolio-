import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alexander Reeves — Creative Developer',
  description: 'Cinematic portfolio hero — immersive digital experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
