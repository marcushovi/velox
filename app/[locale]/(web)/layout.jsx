import { Analytics } from "@vercel/analytics/react";

import Provider from "@components/Provider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { HeaderMegaMenu } from "@components/web/HeaderMegaMenu/HeaderMegaMenu";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export const metadata = {
  title: "Velox Web",
  description: "App for managing shopping lists",
};

const RootLayout = ({ children, params: { locale } }) => {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <head>
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
