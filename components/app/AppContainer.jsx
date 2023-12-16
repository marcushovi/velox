"use client";

import {
  AppShell,
  Burger,
  Flex,
} from "@mantine/core";
import AppLogo from "@components/AppLogo/AppLogo";
import { useDisclosure } from "@mantine/hooks";
import SideMenu from "@components/app/SideMenu/SideMenu";
import DarkModeToggle from "@components/DarkModeToggle/DarkModeToggle";

const AppContainer = ({ children }) => {

  const [opened, { toggle, close }] = useDisclosure(false);
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
        <Flex
          mih="100%"
          gap="md"
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
          px={10}
        >
          <AppLogo />

          <DarkModeToggle />

          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <SideMenu closeMenu={close} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppContainer;
