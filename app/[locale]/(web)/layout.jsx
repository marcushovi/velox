import { Analytics } from "@vercel/analytics/react";

import Provider from "@components/Provider";
import { HeaderMegaMenu } from "@components/web/HeaderMegaMenu/HeaderMegaMenu";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { NextIntlClientProvider, useMessages } from "next-intl";

export const metadata = {
  title: "Velox Web",
  description: "App for managing shopping lists",
};

const RootLayout = ({ children, params: { locale } }) => {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/assets/icons/velox-icon.svg" sizes="any" />
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MantineProvider defaultColorScheme="auto">
            <Provider>
              <main>
                <HeaderMegaMenu />
                {children}
                <Analytics />
              </main>
            </Provider>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
