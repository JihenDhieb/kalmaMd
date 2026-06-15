import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MockSessionProvider } from "@/components/layout/MockSessionProvider";
import { RoleGuard } from "@/components/layout/RoleGuard";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MockSessionProvider>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main id="main-content" className="flex-1">
              <RoleGuard>{children}</RoleGuard>
            </main>
            <Footer />
          </div>
        </MockSessionProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
