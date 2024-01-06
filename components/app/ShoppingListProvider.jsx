"use client";

import { Mark } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { createContext, useContext, useEffect, useState } from "react";

const ShoppingListContext = createContext();

export const useShoppingList = () => useContext(ShoppingListContext);

export const ShoppingListProvider = ({ children }) => {
  const { data: session } = useSession();
  const [shoppingLists, setShoppingLists] = useState(null);
  const [archived, setArchived] = useState(false);
  const t = useTranslations("app.notifications");

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
          title: t.rich("addList", {
            list: list.name,
            guidelines: (chunks) => (
              <Mark color="green" fw={600}>
                {chunks}
              </Mark>
            ),
          }),
          color: "green",
        });

        setShoppingLists((shoppingLists) => [data, ...shoppingLists]);
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
          title: t.rich("deleteList", {
            list: list.name,
            guidelines: (chunks) => (
              <Mark color="green" fw={600}>
                {chunks}
              </Mark>
            ),
          }),
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
          title: t.rich("archiveList", {
            list: list.name,
            archive: !list.archived,
            guidelines: (chunks) => (
              <Mark color="green" fw={600}>
                {chunks}
              </Mark>
            ),
          }),
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
          title: t.rich("editList", {
            list: list.name,
            guidelines: (chunks) => (
              <Mark color="green" fw={600}>
                {chunks}
              </Mark>
            ),
          }),
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
          title: t.rich("removeMember", {
            list: list.name,
            guidelines: (chunks) => (
              <Mark color="green" fw={600}>
                {chunks}
              </Mark>
            ),
          }),
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
          title: t.rich("addItem", {
            item: item.name,
            guidelines: (chunks) => (
              <Mark color="green" fw={600}>
                {chunks}
              </Mark>
            ),
          }),
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
          title: t.rich("purchasedItem", {
            item: item.name,
            purchased: !item.purchased,
            guidelines: (chunks) => (
              <Mark color="green" fw={600}>
                {chunks}
              </Mark>
            ),
          }),
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
          title: t.rich("archiveItem", {
            item: item.name,
            archive: !item.archived,
            guidelines: (chunks) => (
              <Mark color="green" fw={600}>
                {chunks}
              </Mark>
            ),
          }),
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
          title: t.rich("deleteItem", {
            item: item.name,
            guidelines: (chunks) => (
              <Mark color="green" fw={600}>
                {chunks}
              </Mark>
            ),
          }),
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
          title: t.rich("editItem", {
            item: item.name,
            guidelines: (chunks) => (
              <Mark color="green" fw={600}>
                {chunks}
              </Mark>
            ),
          }),
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
      let data = await response.json();

      data = data.sort((a, b) => new Date(b.sys.cts) - new Date(a.sys.cts));
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
