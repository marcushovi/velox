"use client";

import { Group, Code, ScrollArea, Button, Badge } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import UserSettings from "@components/app/UserSettings/UserSettings";
import ActionButton from "@components/app/ActionButton/ActionButton";
import ShoppingListModal from "@components/app/modals/ShoppingListModal";
import classes from "./SideMenu.module.css";
import { useShoppingList } from "@components/app/ShoppingListProvider";

const SideMenu = () => {
  const { data: session } = useSession();

  const [modalOpened, setModalOpened] = useState(false);

  const { shoppingLists, addShoppingList, setArchived } = useShoppingList();

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-center" grow>
          <Button fullWidth onClick={() => setModalOpened(true)}>
            Create list
          </Button>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <Link href="/app" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="transparent"
            size="lg"
            color="green"
            onClick={() => setArchived(false)}
          >
            Active&nbsp;{" "}
            <Badge color="green">
              {shoppingLists.filter((item) => !item?.archived).length}
            </Badge>
          </Button>
        </Link>
        <Link href="/app" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            color="gray"
            variant="transparent"
            size="lg"
            onClick={() => setArchived(true)}
          >
            Archived&nbsp;{" "}
            <Badge color="gray">
              {shoppingLists.filter((item) => item?.archived).length}
            </Badge>
          </Button>
        </Link>
      </ScrollArea>

      <div className={classes.footer}>
        <UserSettings />
      </div>

      <ShoppingListModal
        opened={modalOpened}
        setOpened={setModalOpened}
        onSubmit={addShoppingList}
      />
    </nav>
  );
};

export default SideMenu;
