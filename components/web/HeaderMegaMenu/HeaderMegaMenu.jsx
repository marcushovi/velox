"use client";
import cx from "clsx";
import {
  Avatar,
  Group,
  Button,
  UnstyledButton,
  Text,
  Menu,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Stack,
  Skeleton,
} from "@mantine/core";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import classes from "./HeaderMegaMenu.module.css";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data: session } = useSession();

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
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/velox.svg"
            alt="Velox Logo"
            width={100}
            height={37}
            priority
          />
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              API Docs
            </a>
            {isLoggedIn ? (
              loading ? (
                <Skeleton height={40} width={44} radius="md" p="md" />
              ) : (
                <a href="/app" className={classes.link}>
                  App
                </a>
              )
            ) : (
              ""
            )}
          </Group>

          {loading ? (
            <Skeleton height={40} width={84} radius="md" p="md" />
          ) : (
            <>
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
                      Sign Out
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
                        Sign in
                      </Button>
                    ))}
                </Group>
              )}
            </>
          )}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Group h="100%" gap={0}>
            <a href="#" className={classes.link}>
              API Docs
            </a>
            {isLoggedIn ? (
              loading ? (
                <Skeleton height={40} width={44} radius="md" p="md" />
              ) : (
                <a href="/app" className={classes.link}>
                  App
                </a>
              )
            ) : (
              ""
            )}
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
                    Sign Out
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
                        Sign in
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
