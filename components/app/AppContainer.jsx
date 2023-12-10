"use client";

import { AppShell, Burger, Image, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SideMenu from "@components/app/SideMenu/SideMenu";

const AppContainer = ({ children }) => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 400,
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Flex
          mih="100%"
          gap="md"
          justify="start"
          align="center"
          direction="row"
          wrap="wrap"
          px={10}
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/velox.svg"
            alt="Velox Logo"
            width={10}
            height={37}
          />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <SideMenu />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppContainer;
