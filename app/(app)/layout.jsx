
import Provider from "@components/Provider";
import { Suspense } from "react"
import Loading from "./loading"
import { ShoppingListProvider } from "@components/app/ShoppingListProvider";
import { UserProvider } from "@components/app/UserProvider";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
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
            <UserProvider>
              <ShoppingListProvider>
                <main className="app">
                  <AppContainer>
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                  </AppContainer>
                </main>
              </ShoppingListProvider>
            </UserProvider>
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
