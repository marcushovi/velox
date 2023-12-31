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
  Text,
  RingProgress,
  Center,
  rem,
} from "@mantine/core";
import { IconSettings, IconCheck } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

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
  const [progress, setProgress] = useState(0);
  const t = useTranslations("app.item");

  useEffect(() => {
    const getList = async () => {
      const listById = await shoppingLists.filter(
        (item) => item._id === params.id
      )[0];
      setList(listById);
      setProgress(
        Math.round(
          (list?.items?.filter((item) => item?.purchased).length /
            list?.items?.length) *
            100
        )
      );
      setLoading(false);

      // if (listById === undefined) router.push("/app");
    };

    if (params.id && shoppingLists !== null) getList();
  }, [params.id, shoppingLists, session, list]);

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
      <SimpleGrid cols={{ base: 1, sm: 2, xl: 2 }}>
        <Group justify="flex-start">
          <Title order={3} size="h1">
            {list?.name}
          </Title>
        </Group>
        <Group justify="space-around">
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
          <Button size="lg" onClick={() => setEditItemOpen(true)}>
            {t("createTask")}
          </Button>
        </Group>
      </SimpleGrid>
      <Divider my="md" />
      <Group justify="space-around" mb="md">
        {progress === 100 ? (
          <RingProgress
            size={80}
            thickness={8}
            roundCaps
            sections={[{ value: 100, color: "green" }]}
            label={
              <Center>
                <ActionIcon color="green" variant="light" radius="xl" size="lg">
                  <IconCheck style={{ width: rem(22), height: rem(22) }} />
                </ActionIcon>
              </Center>
            }
          />
        ) : (
          <RingProgress
            size={80}
            thickness={8}
            roundCaps
            sections={[
              {
                value: progress,
                color: "blue",
              },
            ]}
            label={
              <Text c="blue" fw={700} ta="center" size="sm">
                {progress}%
              </Text>
            }
            transitionProps={{ transition: "pop", duration: 150 }}
          />
        )}

        <Badge variant="outline" color="blue" size="lg">
          {t("task", { count: list?.items?.length })}
        </Badge>
        <Badge variant="outline" color="blue" size="lg">
          {t("members", { count: list?.members?.length })}
        </Badge>
      </Group>
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
