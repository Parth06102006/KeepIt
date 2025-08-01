import {ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider
  appearance={{
    cssLayerName:'clerk'
  }}
  >
  <html lang="en" suppressHydrationWarning>
    <head/>
    <body className='bg-accent-foreground'>
       {children}
    </body>
  </html>
</ClerkProvider>
  );
}
