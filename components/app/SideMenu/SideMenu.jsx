"use client";

import {
  Group,
  Code,
  ScrollArea,
  Button,
  Badge,
  Skeleton,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import UserSettings from "@components/app/UserSettings/UserSettings";
import ActionButton from "@components/app/ActionButton/ActionButton";
import ShoppingListModal from "@components/app/modals/ShoppingListModal";
import classes from "./SideMenu.module.css";
import { useShoppingList } from "@components/app/ShoppingListProvider";

const SideMenu = ({ closeMenu }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const [modalOpened, setModalOpened] = useState(false);
  const [lists, setLists] = useState([]);

  const { shoppingLists, addShoppingList, setArchived } = useShoppingList();

  useEffect(() => {
    const getLists = async () => {
      setLists(shoppingLists);
      setLoading(false);
    };

    if (shoppingLists !== null) getLists();
  }, [shoppingLists]);


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
            onClick={() => {
              setArchived(false);
              closeMenu();
            }}
          >
            Active&nbsp;{" "}
            <Badge color="green">
              {loading ? (
                <Skeleton height={10} width={8} radius="xl" animate={false} />
              ) : (
                lists.filter((item) => !item?.archived).length
              )}
            </Badge>
          </Button>
        </Link>
        <Link href="/app" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            color="gray"
            variant="transparent"
            size="lg"
            onClick={() => {
              setArchived(true);
              closeMenu();
            }}
          >
            Archived&nbsp;{" "}
            <Badge color="gray">
              {loading ? (
                <Skeleton height={10} width={8} radius="xl" animate={false} />
              ) : (
                lists.filter((item) => item?.archived).length
              )}
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
