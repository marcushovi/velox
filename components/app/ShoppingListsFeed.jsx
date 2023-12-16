"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BadgeCard from "@components/app/BadgeCard/BadgeCard";
import ShoppingListModal from "@components/app/modals/ShoppingListModal";
import { Mark, ScrollArea, SimpleGrid, Skeleton, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

import { useShoppingList } from "@components/app/ShoppingListProvider";
import { useUser } from "@components/app/UserProvider";

const ShoppingLists = ({
  data,
  handleEdit,
  handleDelete,
  handleClick,
  handleArchive,
  handleRemoveMember,
  session,
  users,
}) => {
  if (data.length === 0) {
    return (
      <Text ta="center" c="dimmed" size="lg" fw={700}>
        You do not have any lists
      </Text>
    );
  }
  return (
    <>
      {data.map((list) => {
        list.membersNames = list.members.map((member) => {
          return users.find((user) => user._id === member)?.username;
        });

        if (list.owner === session.user.id) {
          list.ownerName = "@ME";
        } else {
          list.ownerName = users.filter(
            (user) => user._id === list.owner
          )[0].username;
        }

        return (
          <BadgeCard
            key={list._id}
            list={list}
            handleClick={() => handleClick && handleClick(list)}
            handleEdit={() => handleEdit && handleEdit(list)}
            handleArchive={() => handleArchive && handleArchive(list)}
            handleDelete={() => handleDelete && handleDelete(list)}
            handleRemoveMember={handleRemoveMember}
            disabled={session.user.id !== list.owner}
            session={session}
          />
        );
      })}
    </>
  );
};

const ShoppingListsFeed = () => {
  const { data: session } = useSession();
  const { users } = useUser();
  const [loading, setLoading] = useState(true);
  const [myLists, setMyLists] = useState([]);
  const [editList, setEditList] = useState({ open: false, list: {} });
  const router = useRouter();

  const {
    shoppingLists,
    deleteShoppingList,
    archiveShoppingList,
    editShoppingList,
    archived,
    removeMemberFromList,
  } = useShoppingList();

  useEffect(() => {
    const getLists = async () => {
      const filterLists = shoppingLists.filter(
        (item) => item.archived === archived
      );
      setMyLists(filterLists);
      setLoading(false);
    };

    if (shoppingLists !== null) getLists();
  }, [shoppingLists, archived, session]);

  const handleClick = (list) => {
    router.push(`app/shoppingList/${list._id}`);
  };

  const handleDelete = (list) => {
    modals.openConfirmModal({
      title: `Delete your list`,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your list{" "}
          <Mark color="red" fw={600}>
            {list.name}
          </Mark>{" "}
          ? This action is destructive and you will have to contact support to
          restore your data.
        </Text>
      ),
      labels: { confirm: "Delete list", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteShoppingList(list),
    });
  };

  return (
    <ScrollArea>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
        {loading ? (
          [...Array(10)].map((x, i) => (
            <Skeleton key={i} height={300} radius="md" p="md" />
          ))
        ) : (
          <>
            {myLists !== undefined ? (
              <ShoppingLists
                data={myLists}
                handleClick={handleClick}
                handleDelete={handleDelete}
                handleEdit={(list) => {
                  setEditList({ open: true, list: list });
                }}
                handleArchive={(list) => archiveShoppingList(list)}
                handleRemoveMember={removeMemberFromList}
                session={session}
                users={users}
              />
            ) : (
              ""
            )}
            <ShoppingListModal
              opened={editList.open}
              setOpened={setEditList}
              onSubmit={(list) => editShoppingList(list)}
              editingList={editList.list}
            />
          </>
        )}
      </SimpleGrid>
    </ScrollArea>
  );
};

export default ShoppingListsFeed;
