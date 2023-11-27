
import Provider from "@components/Provider";
import {ShoppingListProvider} from "@components/app/ShoppingListProvider";
import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";

export const metadata = {
  title: "Velox App",
  description: "App for managing shopping lists",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <ColorSchemeScript />
    </head>
    <body>
      <Provider>
        <MantineProvider defaultColorScheme="dark">
          <ShoppingListProvider>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app">{children}</main>
          </ShoppingListProvider>
        </MantineProvider>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
