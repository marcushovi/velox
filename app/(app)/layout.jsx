import Provider from "@components/Provider";
import { ShoppingListProvider } from "@components/app/ShoppingListProvider";
import { UserProvider } from "@components/app/UserProvider";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Suspense } from "react";
import Loading from "./loading";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import AppContainer from "@components/app/AppContainer";

export const metadata = {
  title: "Velox App",
  description: "App for managing shopping lists",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>
          <MantineProvider defaultColorScheme="light">
            <Notifications />
            <ModalsProvider>
              <UserProvider>
                <ShoppingListProvider>
                  <main className="app">
                    <AppContainer>
                      <Suspense fallback={<Loading />}>{children}</Suspense>
                    </AppContainer>
                  </main>
                </ShoppingListProvider>
              </UserProvider>
            </ModalsProvider>
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
