"use client";
import AppLogo from "@components/AppLogo/AppLogo";
import { Link } from "@navigation.js";
import {
  Avatar,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Menu,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./HeaderMegaMenu.module.css";
import { LanguageSwitcher } from "@components/LanguageSwitcher/LanguageSwitcher";

import DarkModeToggle from "@components/DarkModeToggle/DarkModeToggle";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data: session } = useSession();
  const t = useTranslations("web");

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const getPro = async () => {
      const res = await getProviders();
      setProviders(res);
      setLoading(false);
    };

    const isLoggedIn = async () => {
      setIsLoggedIn(true);
      setLoading(false);
    };

    if (session?.user?.id === undefined) getPro();
    else isLoggedIn();
  }, [session]);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <AppLogo />
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              {t("menu.api")}
            </a>
            {isLoggedIn ? (
              loading ? (
                <Skeleton height={40} width={44} radius="md" p="md" />
              ) : (
                <Link href="/app" className={classes.link}>
                  {t("menu.app")}
                </Link>
              )
            ) : (
              ""
            )}
          </Group>

          {loading ? (
            <Skeleton height={40} width={300} radius="md" p="md" />
          ) : (
            <Group>
              {isLoggedIn ? (
                <Menu
                  width={260}
                  position="bottom-end"
                  transitionProps={{ transition: "pop-top-right" }}
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
                  withinPortal
                >
                  <Menu.Target>
                    <UnstyledButton
                      className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                      })}
                    >
                      <Group gap={7}>
                        <Avatar
                          src={session?.user.image}
                          alt={session?.user.name}
                          radius="xl"
                          size={20}
                        />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                          {session?.user.name}
                        </Text>
                        <IconChevronDown
                          style={{ width: rem(12), height: rem(12) }}
                          stroke={1.5}
                        />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>{session?.user.email}</Menu.Item>
                    <Menu.Item
                      color="red"
                      onClick={signOut}
                      leftSection={
                        <IconLogout
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      }
                    >
                      {t("signOut")}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Group visibleFrom="sm">
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <Button
                        type="button"
                        key={provider.name}
                        onClick={() => {
                          signIn(provider.id);
                        }}
                        variant="light"
                      >
                        {t("signIn")}
                      </Button>
                    ))}
                </Group>
              )}
              <Group visibleFrom="md">
                <DarkModeToggle />
                <LanguageSwitcher />
              </Group>
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                hiddenFrom="md"
              />
            </Group>
          )}
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Group h="100%" gap={0}>
            <a href="#" className={classes.link}>
              {t("menu.api")}
            </a>
            {isLoggedIn ? (
              loading ? (
                <Skeleton height={40} width={44} radius="md" p="md" />
              ) : (
                <a href="/app" className={classes.link}>
                  {t("menu.app")}
                </a>
              )
            ) : (
              ""
            )}
          </Group>

          <Divider my="sm" />
          <Group justify="center" gap="xl" grow px="md" hiddenFrom="md">
            <DarkModeToggle />
            <LanguageSwitcher />
          </Group>
          <Divider my="sm" />

          {loading ? (
            <Skeleton height={40} width={84} radius="md" p="md" />
          ) : (
            <>
              {isLoggedIn ? (
                <>
                  <Group gap={7} p="md">
                    <Avatar
                      src={session?.user.image}
                      alt={session?.user.name}
                      radius="xxl"
                      size={80}
                    />
                    <Stack justify="space-around" h="100%" ml={30}>
                      <Text fw={500} size="md" lh={1} mr={3}>
                        {session?.user.name}
                      </Text>
                      <Text fw={500} c="dimmed" size="md" lh={1} mr={3}>
                        {session?.user.email}
                      </Text>
                    </Stack>
                  </Group>

                  <Button
                    color="red"
                    fullWidth
                    onClick={signOut}
                    mt="md"
                    leftSection={
                      <IconLogout
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                  >
                    {t("signOut")}
                  </Button>
                </>
              ) : (
                <Group>
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <Button
                        type="button"
                        key={provider.name}
                        fullWidth
                        onClick={() => {
                          signIn(provider.id);
                        }}
                        variant="light"
                      >
                        {t("signIn")}
                      </Button>
                    ))}
                </Group>
              )}
            </>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
