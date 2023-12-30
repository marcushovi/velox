import Provider from "@components/Provider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ShoppingListProvider } from "@components/app/ShoppingListProvider";
import { UserProvider } from "@components/app/UserProvider";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import AppContainer from "@components/app/AppContainer";

export const metadata = {
  title: "Velox App",
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
        <Provider>
          <NextIntlClientProvider messages={messages}>
            <MantineProvider defaultColorScheme="auto">
              <Notifications />
              <ModalsProvider>
                <UserProvider>
                  <ShoppingListProvider>
                    <main className="app">
                      <AppContainer>{children}</AppContainer>
                    </main>
                  </ShoppingListProvider>
                </UserProvider>
              </ModalsProvider>
            </MantineProvider>
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
