import Nav from "@components/web/Nav";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <ColorSchemeScript />
    </head>
    <body>
      <MantineProvider defaultColorScheme="dark">
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </MantineProvider>
    </body>
  </html>
);

export default RootLayout;
