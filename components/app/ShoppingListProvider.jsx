"use client";
import React, { createContext, useState, useContext } from "react";
import { useSession } from "next-auth/react";

const ShoppingListContext = createContext();

export const useShoppingList = () => useContext(ShoppingListContext);

export const ShoppingListProvider = ({ children }) => {
  const { data: session } = useSession();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [archived, setArchived] = useState(false);

  const addShoppingList = async (listName) => {
    try {
      const newList = await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists`,
        {
          method: "POST",
          body: JSON.stringify({ name: listName })
        }
      );

      setShoppingLists(shoppingLists => [...shoppingLists, newList]);
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

      setShoppingLists(filterLists => [...filterLists]);
    } catch (error) {
      console.log(error);
    }
  };

  const archiveShoppingList = async (list) => {
    try {
      await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${list._id.toString()}`,
        {
          method: "PUT",
          body: JSON.stringify({ archived: `${!list.archived}` }),
        }
      );

      const filterLists = shoppingLists.map((item) => {
        if (item._id !== list._id) item.archived = list.archived;
      });

      setShoppingLists(filterLists => [...filterLists]);
    } catch (error) {
      console.log(error);
    }
  };

  const editShoppingList = async (listName, listId) => {
    try {
      await fetch(
        `/api/users/${session.user.id.toString()}/shopping-lists/${listId.toString()}`,
        {
          method: "PUT",
          body: JSON.stringify({ name: listName }),
        }
      );

      const filterLists = shoppingLists.map((item) => {
        if (item._id !== listId) item.name = listName;
      });

      setShoppingLists(filterLists => [...filterLists]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingLists,
        addShoppingList,
        deleteShoppingList,
        archiveShoppingList,
        editShoppingList,
        setArchived,
        archived
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
