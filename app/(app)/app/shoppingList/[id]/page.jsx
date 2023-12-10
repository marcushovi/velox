"use client";

import {
  Group,
  ActionIcon,
  Badge,
  Button,
  Divider,
  Title,
} from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useShoppingList } from "@components/app/ShoppingListProvider";
import ShoppingListModal from "@components/app/modals/ShoppingListModal";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import RemoveMemberButton from "@components/app/RemoveMemberButton";
import { useRouter } from "next/navigation";
import ItemModal from "@components/app/modals/ItemModal";
import ItemsFeed from "@components/app/ItemsFeed";

export default function ShoppingList({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    shoppingLists,
    editShoppingList,
    removeMemberFromList,
    createItem,
    purchasedItem,
    archiveItem,
    deleteItem,
  } = useShoppingList();
  const [list, setList] = useState([]);
  const [editItemOpen, setEditItemOpen] = useState(false);
  const [editListOpen, setEditListOpen] = useState(false);

  useEffect(() => {
    const getList = async () => {
      const listById = await shoppingLists.filter(
        (item) => item._id === params.id
      )[0];
      setList(listById);

      if (listById === undefined) router.push("/app");
    };

    if (params.id) getList();
  }, [params.id, shoppingLists, router, list]);

  const handleCreateItem = (item) => {
    console.log(item)
    createItem(params.id, item);
  };

  const handleDeleteItem = (item) => {
    deleteItem(params.id, item);
  };
  const handlePurchasedItem = (item) => {
    purchasedItem(params.id, item);
  };

  const handleArchivedItem = (item) => {
    archiveItem(params.id, item);
  };

  return (
    <>
      <Group justify="space-between">
        <Title order={3} size="h1">
          {list?.name}
        </Title>
        <Divider my="md" />

        {session?.user.id === list?.owner ? (
          <ActionIcon
            variant="transparent"
            size="xl"
            aria-label="Settings"
            onClick={() => {
              setEditListOpen(true);
            }}
          >
            <IconSettings
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        ) : (
          <RemoveMemberButton
            action={removeMemberFromList}
            list={list}
            session={session}
          />
        )}

        <Badge variant="outline" color="blue" size="lg">
          {list?.items?.length} taks
        </Badge>
        <Badge variant="outline" color="blue" size="lg">
          {list?.members?.length} members
        </Badge>

        <Button size="lg" onClick={() => setEditItemOpen(true)}>
          New Task
        </Button>
      </Group>
      <Divider my="md" />
      <ItemsFeed
        items={list?.items}
        archive={handleArchivedItem}
        purchased={handlePurchasedItem}
        remove={handleDeleteItem}
      />

      <ShoppingListModal
        opened={editListOpen}
        setOpened={setEditListOpen}
        onSubmit={(list) => editShoppingList(list)}
        editingList={list}
      />

      <ItemModal
        opened={editItemOpen}
        setOpened={setEditItemOpen}
        onSubmit={(item) => handleCreateItem(item)}
      />
    </>
  );
}
