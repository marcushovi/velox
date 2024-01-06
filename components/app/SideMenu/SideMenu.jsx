"use client";

import DarkModeToggle from "@components/DarkModeToggle/DarkModeToggle";
import { LanguageSwitcher } from "@components/LanguageSwitcher/LanguageSwitcher";
import { useShoppingList } from "@components/app/ShoppingListProvider";
import UserSettings from "@components/app/UserSettings/UserSettings";
import ShoppingListModal from "@components/app/modals/ShoppingListModal";
import { Badge, Button, Group, ScrollArea, Skeleton } from "@mantine/core";
import { Link } from "@navigation.js";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import classes from "./SideMenu.module.css";

const SideMenu = ({ closeMenu }) => {
  const [loading, setLoading] = useState(true);

  const [modalOpened, setModalOpened] = useState(false);
  const [lists, setLists] = useState([]);

  const { shoppingLists, addShoppingList, setArchived } = useShoppingList();
  const t = useTranslations("app");

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
          <Button
            fullWidth
            onClick={() => {
              setModalOpened(true);
              closeMenu();
            }}
          >
            {t("menu.createList")}
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
            {t("menu.active")}&nbsp;{" "}
            <Badge color="green">
              {loading ? (
                <Skeleton height={10} width={8} radius="xl" />
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
            {t("menu.archive")}&nbsp;{" "}
            <Badge color="gray">
              {loading ? (
                <Skeleton height={10} width={8} radius="xl" />
              ) : (
                lists.filter((item) => item?.archived).length
              )}
            </Badge>
          </Button>
        </Link>
      </ScrollArea>

      <Group justify="center" gap="xl" grow py="md">
        <DarkModeToggle />
        <LanguageSwitcher />
      </Group>

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
