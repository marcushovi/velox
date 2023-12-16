"use client";

import {
  Avatar,
  Group,
  Menu,
  Skeleton,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight, IconHome, IconLogout } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./UserSettings.module.css";

const UserSettings = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const getuser = async () => {
      setLoading(false);
    };

    if (session?.user?.id !== undefined) getuser();
  }, [session]);

  if (loading) {
    return (
      <>
        <Menu position="right" arrowPosition="center">
          <Menu.Target>
            <UnstyledButton className={classes.user}>
              <Group p={10}>
                <Skeleton height={50} circle />

                <div style={{ flex: 1 }}>
                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} mt={6} radius="xl" />
                </div>
              </Group>
            </UnstyledButton>
          </Menu.Target>
        </Menu>
      </>
    );
  }

  return (
    <Menu
      position="top-end"
      withArrow
      arrowPosition="center"
      transitionProps={{ transition: "pop", duration: 150 }}
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group p={10}>
            <Avatar src={session?.user.image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {session?.user.name}
              </Text>

              <Text c="dimmed" size="xs">
                {session?.user.email}
              </Text>
            </div>

            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            router.push("/");
          }}
          leftSection={<IconHome style={{ width: rem(14), height: rem(14) }} />}
        >
          Homepage
        </Menu.Item>

        <Menu.Item
          color="red"
          onClick={handleSignOut}
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Sing Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserSettings;
