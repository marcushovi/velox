"use client";

import { useState, useEffect } from "react";
import { SimpleGrid, ScrollArea, Badge, Text, Mark } from "@mantine/core";

import {
  IconCircleCheckFilled,
  IconProgress,
  IconArchive,
} from "@tabler/icons-react";
import { Accordion, rem } from "@mantine/core";
import ItemCard from "./ItemCard/ItemCard";
import ItemModal from "./modals/ItemModal";

const ItemsFeed = ({ items, edit, remove, purchased, archive }) => {
  const [editItem, setEditItem] = useState({ open: false, item: {} });
  const [data, setData] = useState([]);

  const handleDelete = (item) => {
    const hasConfirmed = confirm(
      `Are you sure you want to delete list ${item.name}?`
    );
    if (hasConfirmed) remove(item);
  };

  const handleEdit = (item) => {
    setEditItem({ open: true, item: item });
  };

  useEffect(() => {
    const getItems = async () => {
      setData(items);
    };

    getItems();
  }, [items]);

  return (
    <section>
      <ScrollArea>
        <Accordion variant="separated" multiple defaultValue={["inprocess"]}>
          {data !== undefined ? (
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
                    {data.filter((item) => !item?.purchased).length}
                  </Badge>
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                    {data.filter((item) => !item?.purchased).length === 0 ? (
                      <Text ta="center" c="dimmed" size="lg" fw={700}>
                        You do not have any items in <Mark color="blue">process</Mark>.
                      </Text>
                    ) : (
                      data.map((item) => {
                        if (!item.purchased) {
                          return (
                            <ItemCard
                              key={item._id}
                              item={item}
                              handleEdit={() => handleEdit && handleEdit(item)}
                              handleArchive={() => archive && archive(item)}
                              handleDelete={() =>
                                handleDelete && handleDelete(item)
                              }
                              handlePurchased={() =>
                                purchased && purchased(item)
                              }
                            />
                          );
                        }
                      })
                    )}
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
                    {data.filter((item) => item?.purchased).length}
                  </Badge>
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                  {data.filter((item) => item?.purchased).length === 0 ? (
                      <Text ta="center" c="dimmed" size="lg" fw={700}>
                        You do not have any <Mark color="green">purchased</Mark> items.
                      </Text>
                    ) : (
                      data.map((item) => {
                        if (item.purchased) {
                          return (
                            <ItemCard
                              key={item._id}
                              item={item}
                              handleEdit={() => handleEdit && handleEdit(item)}
                              handleArchive={() => archive && archive(item)}
                              handleDelete={() =>
                                handleDelete && handleDelete(item)
                              }
                              handlePurchased={() =>
                                purchased && purchased(item)
                              }
                            />
                          );
                        }
                      })
                    )}
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
                    {data.filter((item) => item?.archived).length}
                  </Badge>
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                  {data.filter((item) => item?.archived).length === 0 ? (
                      <Text ta="center" c="dimmed" size="lg" fw={700}>
                        You do not have any <Mark color="teal">archived</Mark> items.
                        
                      </Text>
                    ) : (
                      data.map((item) => {
                        if (item.archived) {
                          return (
                            <ItemCard
                              key={item._id}
                              item={item}
                              handleEdit={() => handleEdit && handleEdit(item)}
                              handleArchive={() => archive && archive(item)}
                              handleDelete={() =>
                                handleDelete && handleDelete(item)
                              }
                              handlePurchased={() =>
                                purchased && purchased(item)
                              }
                            />
                          );
                        }
                      })
                    )}
                  </SimpleGrid>
                </Accordion.Panel>
              </Accordion.Item>
            </>
          ) : (
            ""
          )}
        </Accordion>
      </ScrollArea>
      <ItemModal
        opened={editItem.open}
        setOpened={setEditItem}
        onSubmit={edit}
        editingItem={editItem.item}
      />
    </section>
  );
};

export default ItemsFeed;
