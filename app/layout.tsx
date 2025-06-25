import {ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider,SidebarTrigger } from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/app-sidebar'
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
    <body>
      <SidebarProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
      </SidebarProvider>
    </body>
  </html>
</ClerkProvider>
  );
}
