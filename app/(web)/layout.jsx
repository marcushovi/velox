import Nav from "@components/web/Nav";
import Provider from "@components/Provider";
import { HeaderMegaMenu } from "@components/web/HeaderMegaMenu/HeaderMegaMenu";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
export const metadata = {
  title: "Velox Web",
  description: "App for managing shopping lists",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <ColorSchemeScript />
    </head>
    <body>
    <Provider>
      <MantineProvider defaultColorScheme="light">
        <main>
          <HeaderMegaMenu />
          {children}
        </main>
      </MantineProvider>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
