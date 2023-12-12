"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";

const ShoppingListContext = createContext();

export const useShoppingList = () => useContext(ShoppingListContext);

export const ShoppingListProvider = ({ children }) => {
  const { data: session } = useSession();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [archived, setArchived] = useState(false);

  const addShoppingList = async (list) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists`,
        {
          method: "POST",
          body: JSON.stringify({
            name: list.name,
            archived: list.archived,
            members: list.members,
          }),
        }
      );
      const data = await response.json();

      if (response.ok && response.status === 200) {
        notifications.show({
          title: `List "${data.name}" was created.`,
          color: "green",
        });

        setShoppingLists((shoppingLists) => [...shoppingLists, data]);
      } else {
        notifications.show({
          title: data.message,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteShoppingList = async (list) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${list._id.toString()}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (response.ok && response.status === 200) {
        notifications.show({
          title: `List "${list.name}" was deleted.`,
          color: "green",
        });
        const filterLists = shoppingLists.filter(
          (item) => item._id !== list._id
        );

        setShoppingLists(filterLists);
      } else {
        notifications.show({
          title: data.message,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const archiveShoppingList = async (list) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${list._id.toString()}`,
        {
          method: "PUT",
          body: JSON.stringify({ archived: `${!list.archived}` }),
        }
      );

      const data = await response.json();

      if (response.ok && response.status === 200) {
        notifications.show({
          title: `List "${list.name}" is ${
            !list.archived ? "archived" : "active"
          }.`,
          color: "green",
        });
        const filterLists = shoppingLists.map((item) => {
          if (item._id === list._id) return data;
          return item;
        });

        setShoppingLists(filterLists);
      } else {
        notifications.show({
          title: data.message,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editShoppingList = async (list) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${list._id.toString()}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: list.name,
            archived: `${list.archived}`,
            members: list.members,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && response.status === 200) {
        notifications.show({
          title: `List "${data.name}" was edited.`,
          color: "green",
        });

        const filterLists = shoppingLists.map((item) => {
          if (item._id === list._id) return data;
          return item;
        });

        setShoppingLists(filterLists);
      } else {
        notifications.show({
          title: data.message,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeMemberFromList = async (list) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${list._id.toString()}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: list.name,
            members: list.members,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && response.status === 200) {
        notifications.show({
          title: `You leave "${data.name}" list.`,
          color: "green",
        });

        const filterLists = shoppingLists.filter(
          (item) => item._id !== list._id
        );

        setShoppingLists(filterLists);
      } else {
        notifications.show({
          title: data.message,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createItem = async (listId, item) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${listId.toString()}/items`,
        {
          method: "POST",
          body: JSON.stringify({
            name: item.name,
            quantity: item.quantity,
            archived: `${item.archived}`,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && response.status === 200) {
        notifications.show({
          title: `Item "${item.name}" was created.`,
          color: "green",
        });

        const filterLists = shoppingLists.map((item) => {
          if (item._id === listId) return data;
          return item;
        });

        setShoppingLists(filterLists);
      } else {
        notifications.show({
          title: data.message,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const purchasedItem = async (listId, item) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${listId.toString()}/items/${item._id.toString()}/purchase`,
        {
          method: "PUT",
          body: JSON.stringify({ purchased: `${!item.purchased}` }),
        }
      );

      const data = await response.json();

      if (response.ok && response.status === 200) {
        notifications.show({
          title: `Item "${item.name}" was purchased.`,
          color: "green",
        });

        const filterLists = shoppingLists.map((item) => {
          if (item._id === listId) return data;
          return item;
        });

        setShoppingLists([...filterLists]);
      } else {
        notifications.show({
          title: data.message,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const archiveItem = async (listId, item) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${listId.toString()}/items/${item._id.toString()}/archive`,
        {
          method: "PUT",
          body: JSON.stringify({ archived: `${!item.archived}` }),
        }
      );

      const data = await response.json();

      if (response.ok && response.status === 200) {
        notifications.show({
          title: `Item "${item.name}" was archived.`,
          color: "green",
        });

        const filterLists = shoppingLists.map((item) => {
          if (item._id === listId) return data;
          return item;
        });

        setShoppingLists([...filterLists]);
      } else {
        notifications.show({
          title: data.message,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (listId, item) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${listId.toString()}/items/${item._id.toString()}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok && response.status === 200) {
        notifications.show({
          title: `Item "${item.name}" was deleted.`,
          color: "green",
        });

        const filterLists = shoppingLists.map((item) => {
          if (item._id === listId) return data;
          return item;
        });

        setShoppingLists([...filterLists]);
      } else {
        notifications.show({
          title: data.message,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = async (listId, item) => {
    console.log(item)
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${listId.toString()}/items/${item._id.toString()}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: item.name,
            quantity: item.quantity,
            archived: `${item.archived}`,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && response.status === 200) {
        notifications.show({
          title: `Item "${item.name}" was edited.`,
          color: "green",
        });

        const filterLists = shoppingLists.map((item) => {
          if (item._id === listId) return data;
          return item;
        });

        setShoppingLists([...filterLists]);
      } else {
        notifications.show({
          title: data.message,
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchLists = async () => {
      const response = await fetch(
        `/api/users/${session?.user.id.toString()}/shopping-lists`
      );
      const data = await response.json();
      setShoppingLists(data);
    };

    if (session?.user.id) fetchLists();
  }, [session]);

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingLists,
        setShoppingLists,
        addShoppingList,
        deleteShoppingList,
        archiveShoppingList,
        editShoppingList,
        setArchived,
        archived,
        removeMemberFromList,
        createItem,
        purchasedItem,
        archiveItem,
        deleteItem,
        editItem,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
