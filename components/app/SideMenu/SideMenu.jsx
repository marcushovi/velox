"use client";

import { Group, Code, ScrollArea, Button, Badge, Image } from "@mantine/core";
import { useState } from "react";

import UserSettings from "@components/app/UserSettings/UserSettings";
import ActionButton from "@components/app/ActionButton/ActionButton";
import ShoppingListModal from "@components/app/modals/listModal";
import classes from "./SideMenu.module.css";
import { useShoppingList } from "@components/app/ShoppingListProvider";

const menuItems = [
  {
    label: "Active Lists",
    link: "/active",
  },
  {
    label: "Archived Lists",
    link: "/archived",
  },
];
const SideMenu = () => {
  const links = menuItems.map((item) => (
    <ActionButton {...item} key={item.label} />
  ));

  const [modalOpened, setModalOpened] = useState(false);

  const { shoppingLists, addShoppingList, setArchived } = useShoppingList();

  const handleAddShoppingList = async (listName) => {
    addShoppingList(listName);
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-center">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/assets/images/velox.svg"
            alt="Velox Logo"
            width={100}
            height={37}
            priority
          />
        </Group>
      </div>

      <div className={classes.header}>
        <Group justify="space-center">
          <Button fullWidth onClick={() => setModalOpened(true)}>
            Create list
          </Button>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <Button
          fullWidth
          variant="transparent"
          size="lg"
          onClick={() => setArchived(false)}
        >
          Active&nbsp;{" "}
          <Badge color="blue">
            {shoppingLists.filter((item) => !item.archive).length}
          </Badge>
        </Button>
        <Button
          fullWidth
          color="teal"
          variant="transparent"
          size="lg"
          onClick={() => setArchived(true)}
        >
          Archived&nbsp;{" "}
          <Badge color="teal">
            {shoppingLists.filter((item) => item.archive).length}
          </Badge>
        </Button>
      </ScrollArea>

      <div className={classes.footer}>
        <UserSettings />
      </div>

      <ShoppingListModal
        opened={modalOpened}
        setOpened={setModalOpened}
        onSubmit={handleAddShoppingList}
      />
    </nav>
  );
};

export default SideMenu;
