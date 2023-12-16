"use client";

import ItemsFeed from "@components/app/ItemsFeed";
import RemoveMemberButton from "@components/app/RemoveMemberButton";
import { useShoppingList } from "@components/app/ShoppingListProvider";
import ItemModal from "@components/app/modals/ItemModal";
import ShoppingListModal from "@components/app/modals/ShoppingListModal";
import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Group,
  SimpleGrid,
  Skeleton,
  Title,
} from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    editItem,
  } = useShoppingList();
  const [list, setList] = useState([]);
  const [editItemOpen, setEditItemOpen] = useState(false);
  const [editListOpen, setEditListOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getList = async () => {
      const listById = await shoppingLists.filter(
        (item) => item._id === params.id
      )[0];
      setList(listById);
      setLoading(false);

      // if (listById === undefined) router.push("/app");
    };

    if (params.id && shoppingLists !== null) getList();
  }, [params.id, shoppingLists, router, session, list]);

  const handleCreateItem = (item) => {
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

  const handleEditItem = (item) => {
    editItem(params.id, item);
  };

  if (loading) {
    return (
      <>
        <Skeleton height={50} radius="md" p="md" />
        <Divider my="md" />

        <Skeleton height={200} radius="md" p="md" mt={30} />
        <Skeleton height={50} radius="md" p="md" mt={30} />
        <Skeleton height={50} radius="md" p="md" mt={30} />
      </>
    );
  }

  return list !== undefined ? (
    <>
      <SimpleGrid cols={{ base: 1, lg: 3, xl: 3 }}>
        <Group justify="space-around">
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
        </Group>
        <Group justify="space-around">
          <Badge variant="outline" color="blue" size="lg">
            {list?.items?.length} taks
          </Badge>
          <Badge variant="outline" color="blue" size="lg">
            {list?.members?.length} members
          </Badge>
        </Group>

        <Button size="lg" onClick={() => setEditItemOpen(true)}>
          New Task
        </Button>
      </SimpleGrid>
      <Divider my="md" />
      <ItemsFeed
        items={list?.items}
        archive={handleArchivedItem}
        purchased={handlePurchasedItem}
        remove={handleDeleteItem}
        edit={handleEditItem}
      />

      <ShoppingListModal
        opened={editListOpen}
        setOpened={setEditListOpen}
        onSubmit={(list) => editShoppingList(list)}
        editingList={{ ...list }}
      />

      <ItemModal
        opened={editItemOpen}
        setOpened={setEditItemOpen}
        onSubmit={(item) => handleCreateItem(item)}
      />
    </>
  ) : (
    ""
  );
}
