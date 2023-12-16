import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Provider from "@components/Provider";
import { HeaderMegaMenu } from "@components/web/HeaderMegaMenu/HeaderMegaMenu";

import "@mantine/core/styles.css";
export const metadata = {
  title: "Velox Web",
  description: "App for managing shopping lists",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <ColorSchemeScript defaultColorScheme="auto" />
    </head>
    <body>
      <MantineProvider defaultColorScheme="auto">
        <Provider>
          <main>
            <HeaderMegaMenu />
            {children}
          </main>
        </Provider>
      </MantineProvider>
    </body>
  </html>
);

export default RootLayout;
