"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import BadgeCard from "@components/app/BadgeCard/BadgeCard";
import { SimpleGrid, ScrollArea } from "@mantine/core";
import ShoppingListModal from "@components/app/modals/ShoppingListModal";

import { useShoppingList } from "@components/app/ShoppingListProvider";
import { useUser } from "@components/app/UserProvider";
import {
  IconPhoto,
  IconCircleCheckFilled,
  IconProgress,
} from "@tabler/icons-react";
import { Accordion, rem } from "@mantine/core";
import { Table } from "@mantine/core";
import ItemCard from "./ItemCard/ItemCard";

const ItemsFeed = ({ items, edit, remove, resolve, archive }) => {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setItems([...data]);
  // }, [data]);

  const handleDelete = (item) => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete list ${item.name}?`
    );
    if (hasConfirmed) remove(item);
  };

  console.log(items);

  return (
    <section>
      <ScrollArea>
        <Accordion variant="separated" defaultValue="inprocess">
          {items !== undefined ? (
            <>
              <Accordion.Item value="inprocess">
                <Accordion.Control
                  icon={
                    <IconProgress
                      style={{
                        color: "var(--mantine-color-blue-6",
                        width: rem(20),
                        height: rem(20),
                      }}
                    />
                  }
                >
                  In proceess
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                    {items.map((item) => {
                      if (!item.purchased) {
                        return (
                          <ItemCard
                            key={item._id}
                            item={item}
                            // handleClick={() => handleClick && handleClick(list)}
                            // handleEdit={() => handleEdit && handleEdit(list)}
                            // handleArchive={() =>
                            //   handleArchive && handleArchive(list)
                            // }
                            // handleDelete={() =>
                            //   handleDelete && handleDelete(list)
                            // }
                            // handleRemoveMember={handleRemoveMember}
                            // disabled={session.user.id !== list.owner}
                            // session={session}
                          />
                        );
                      }
                    })}
                  </SimpleGrid>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="purchased">
                <Accordion.Control
                  icon={
                    <IconCircleCheckFilled
                      style={{
                        color: "var(--mantine-color-green-6",
                        width: rem(20),
                        height: rem(20),
                      }}
                    />
                  }
                >
                  Purchased
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                    {items.map((item) => {
                      if (item.purchased) {
                        return (
                          <ItemCard
                            key={item._id}
                            item={item}
                            // handleClick={() => handleClick && handleClick(list)}
                            // handleEdit={() => handleEdit && handleEdit(list)}
                            // handleArchive={() =>
                            //   handleArchive && handleArchive(list)
                            // }
                            // handleDelete={() =>
                            //   handleDelete && handleDelete(list)
                            // }
                            // handleRemoveMember={handleRemoveMember}
                            // disabled={session.user.id !== list.owner}
                            // session={session}
                          />
                        );
                      }
                    })}
                  </SimpleGrid>
                </Accordion.Panel>
              </Accordion.Item>
            </>
          ) : (
            "You do not have any items yet."
          )}
        </Accordion>
      </ScrollArea>
    </section>
  );
};

export default ItemsFeed;
