"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import BadgeCard from "@components/app/BadgeCard/BadgeCard";
import { SimpleGrid, ScrollArea } from "@mantine/core";
import ShoppingListModal from "@components/app/modals/listModal";

import { useShoppingList } from "@components/app/ShoppingListProvider";

const ShoppingLists = ({
  data,
  handleEdit,
  handleDelete,
  handleClick,
  handleArchive,
}) => {
  return (
    <ScrollArea>
      <SimpleGrid cols={3}>
        {data.map((list) => (
          <BadgeCard
            key={list._id}
            list={list}
            handleClick={() => handleClick && handleClick(list)}
            handleEdit={() => handleEdit && handleEdit(list)}
            handleArchive={() => handleArchive && handleArchive(list)}
            handleDelete={() => handleDelete && handleDelete(list)}
          />
        ))}
      </SimpleGrid>
    </ScrollArea>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const [myLists, setMyLists] = useState([]);
  const [editList, setEditList] = useState({open:false, list:{}});
  const router = useRouter();


  const {
    shoppingLists,
    deleteShoppingList,
    archiveShoppingList,
    editShoppingList,
  } = useShoppingList();

  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch(
        `/api/users/6563357612ffb5411f5643e7/shopping-lists`
      );
      const data = await response.json();
      setMyLists(data);
    };
    fetchLists();

    // if (session?.user.id) fetchPosts();
  }, [shoppingLists]);

  const handleClick = (list) => {
    router.push(`app/shoppingList/${list._id}`);
  };

  const handleDelete = (list) => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete list ${list.name}?`
    );
    if (hasConfirmed) deleteShoppingList(list);
  };

  const handleArchive = (list) => {
    archiveShoppingList(list);
  };
  const handleEdit = (listName, listId) => {
    editShoppingList(listName, listId);
  };

  return (
    <section className="feed">
      <ShoppingLists
        data={myLists}
        handleClick={handleClick}
        handleDelete={handleDelete}
        handleEdit={(list) => { setEditList({open:true, list:list})}}
        handleArchive={handleArchive}
      />
      <ShoppingListModal
        opened={editList.open}
        setOpened={setEditList}
        onSubmit={(listName, listId) => handleEdit(listName, listId)}
        editingList={editList.list}


      />
    </section>
  );
};

export default Feed;
