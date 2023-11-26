"use client";
import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const ShoppingListContext = createContext();

export const useShoppingList = () => useContext(ShoppingListContext);

export const ShoppingListProvider = ({ children }) => {
  const [shoppingLists, setShoppingLists] = useState([]);

  const addShoppingList = async (listName) => {
    const newList = await axios.post(
      `/api/users/6563357612ffb5411f5643e7/shopping-lists`,
      { name: listName }
    );

    setShoppingLists([...shoppingLists, newList]);
    // Or fetch updated lists from the server
  };
  const deleteShoppingList = async (list) => {
    try {
      await fetch(
        `/api/users/${list.owner.toString()}/shopping-lists/${list._id.toString()}`,
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
      await fetch(
        `/api/users/${list.owner.toString()}/shopping-lists/${list._id.toString()}`,
        {
          method: "PUT",
          body: JSON.stringify({ archived: `${!list.archived}` }),
        }
      );

      const filterLists = shoppingLists.map((item) => {
        if (item._id !== list._id) item.archived = list.archived;
      });

      setShoppingLists(filterLists);
    } catch (error) {
      console.log(error);
    }
  };

  const editShoppingList = async (listName, listId) => {
    try {
      console.log(list);
      await fetch(
        `/api/users/${list.owner.toString()}/shopping-lists/${listId.toString()}`,
        {
          method: "PUT",
          body: JSON.stringify({ name: listName }),
        }
      );

      const filterLists = shoppingLists.map((item) => {
        if (item._id !== list._id) item.name = list.name;
      });

      setShoppingLists(filterLists);
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
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
