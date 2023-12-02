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
    setShoppingLists,
    deleteShoppingList,
    archiveShoppingList,
    editShoppingList,
    archived
  } = useShoppingList();

  useEffect(() => {
      const filterLists = shoppingLists.filter((item) => item.archived === archived);
      setMyLists(filterLists);
  }, [shoppingLists, archived]);


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
      {myLists[0]?._id ? (<ShoppingLists
        data={myLists}
        handleClick={handleClick}
        handleDelete={handleDelete}
        handleEdit={(list) => { setEditList({open:true, list:list})}}
        handleArchive={handleArchive}
      />) : archived ? "You do not have archived lists." : "You do not have active lists."}
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
