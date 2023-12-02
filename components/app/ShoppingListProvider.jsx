"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";

const ShoppingListContext = createContext();

export const useShoppingList = () => useContext(ShoppingListContext);

export const ShoppingListProvider = ({ children }) => {
  const { data: session } = useSession();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [archived, setArchived] = useState(false);

  const addShoppingList = async (listName) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists`,
        {
          method: "POST",
          body: JSON.stringify({ name: listName }),
        }
      );

      const newList = await response.json();

      setShoppingLists((shoppingLists) => [...shoppingLists, newList]);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteShoppingList = async (list) => {
    try {
      await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${list._id.toString()}`,
        {
          method: "DELETE",
        }
      );

      const filterLists = shoppingLists.filter((item) => item._id !== list._id);

      setShoppingLists(filterLists);
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

      const editedList = await response.json();

      const filterLists = shoppingLists.map((item) => {
        if (item._id === list._id) return editedList;
        return item;
      });


      setShoppingLists(filterLists);
    } catch (error) {
      console.log(error);
    }
  };

  const editShoppingList = async (listName, listId) => {
    try {
      const response = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${listId.toString()}`,
        {
          method: "PUT",
          body: JSON.stringify({ name: listName }),
        }
      );

      const editedList = await response.json();

      const filterLists = shoppingLists.map((item) => {
        if (item._id === listId) return editedList;
        return item;
      });

      setShoppingLists(filterLists);
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
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
