"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import BadgeCard from "@components/app/BadgeCard/BadgeCard";
import { SimpleGrid, ScrollArea, Badge } from "@mantine/core";
import ShoppingListModal from "@components/app/modals/ShoppingListModal";

import { useShoppingList } from "@components/app/ShoppingListProvider";
import { useUser } from "@components/app/UserProvider";
import {
  IconPhoto,
  IconCircleCheckFilled,
  IconProgress,
  IconArchive,
} from "@tabler/icons-react";
import { Accordion, rem } from "@mantine/core";
import { Table } from "@mantine/core";
import ItemCard from "./ItemCard/ItemCard";

const ItemsFeed = ({ items, edit, remove, purchased, archive }) => {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   console.log(data)
  //   if (data !== undefined) setItems(data);
  // }, [data]);

  const handleDelete = (item) => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete list ${item.name}?`
    );
    if (hasConfirmed) remove(item);
  };

  return (
    <section>
      <ScrollArea>
        <Accordion variant="separated" multiple defaultValue={["inprocess"]}>
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
                  In proceess{"  "}
                  <Badge color="blue">
                    {items.filter((item) => !item?.purchased).length}
                  </Badge>
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                    {items.map((item) => {
                      if (!item.purchased) {
                        return (
                          <ItemCard
                            key={item._id}
                            item={item}
                            handleEdit={() => edit && edit(item)}
                            handleArchive={() => archive && archive(item)}
                            handleDelete={() =>
                              handleDelete && handleDelete(item)
                            }
                            handlePurchased={() => purchased && purchased(item)}
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
                  Purchased{"  "}
                  <Badge color="green">
                    {items.filter((item) => item?.purchased).length}
                  </Badge>
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                    {items.map((item) => {
                      if (item.purchased) {
                        return (
                          <ItemCard
                            key={item._id}
                            item={item}
                            handleEdit={() => edit && edit(item)}
                            handleArchive={() => archive && archive(item)}
                            handleDelete={() =>
                              handleDelete && handleDelete(item)
                            }
                            handlePurchased={() => purchased && purchased(item)}
                          />
                        );
                      }
                    })}
                  </SimpleGrid>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="archived">
                <Accordion.Control
                  icon={
                    <IconArchive
                      style={{
                        color: "var(--mantine-color-teal-6",
                        width: rem(20),
                        height: rem(20),
                      }}
                    />
                  }
                >
                  Archived {"  "}
                  <Badge color="teal">
                    {items.filter((item) => item?.archived).length}
                  </Badge>
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                    {items.map((item) => {
                      if (item.archived) {
                        return (
                          <ItemCard
                            key={item._id}
                            item={item}
                            handleEdit={() => edit && edit(item)}
                            handleArchive={() => archive && archive(item)}
                            handleDelete={() =>
                              handleDelete && handleDelete(item)
                            }
                            handlePurchased={() => purchased && purchased(item)}
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
