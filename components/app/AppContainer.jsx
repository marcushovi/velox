"use client";

import AppLogo from "@components/AppLogo/AppLogo";
import DarkModeToggle from "@components/DarkModeToggle/DarkModeToggle";
import { LanguageSwitcher } from "@components/LanguageSwitcher/LanguageSwitcher";
import SideMenu from "@components/app/SideMenu/SideMenu";
import { AppShell, Burger, Flex, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
