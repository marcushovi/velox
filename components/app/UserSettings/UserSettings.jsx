'use client'

import { UnstyledButton, Group, Avatar, Text, Menu, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserSettings.module.css";
import { signOut, useSession } from "next-auth/react";


const UserSettings = () => {
  const {data: session} = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  }
  
  return (
    <Menu position="right" arrowPosition="center">
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar
              src={session?.user.image}
              radius="xl"
            />

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
        <Menu.Item onClick={handleSignOut}>Sing Out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserSettings;
