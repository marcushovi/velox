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

export default function ShoppingList({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { shoppingLists, editShoppingList, removeMemberFromList } =
    useShoppingList();
  const [list, setList] = useState([]);
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

        <Button size="lg" onClick={() => setModalOpened(true)}>
          New Task
        </Button>
      </Group>
      <Divider my="md" />
      {list?.membersNames}

      <ShoppingListModal
        opened={editListOpen}
        setOpened={setEditListOpen}
        onSubmit={(list) => editShoppingList(list)}
        editingList={{ ...list }}
      />
    </>
  );
}
