"use client";

import { Badge, Mark, ScrollArea, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import { Accordion, rem } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconArchive,
  IconCircleCheckFilled,
  IconProgress,
} from "@tabler/icons-react";
import ItemCard from "./ItemCard/ItemCard";
import ItemModal from "./modals/ItemModal";

const ItemsFeed = ({ items, edit, remove, purchased, archive }) => {
  const [editItem, setEditItem] = useState({ open: false, item: {} });
  const [data, setData] = useState([]);

  const handleDelete = (item) => {
    modals.openConfirmModal({
      title: `Delete your item`,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your item{" "}
          <Mark color="red" fw={600}>
            {item.name}
          </Mark>{" "}
          ? This action is destructive and you will have to contact support to
          restore your data.
        </Text>
      ),
      labels: { confirm: "Delete item", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => remove(item),
    });
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
                        You do not have any items in{" "}
                        <Mark color="blue">process</Mark>.
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
                        You do not have any <Mark color="green">purchased</Mark>{" "}
                        items.
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
                        You do not have any <Mark color="teal">archived</Mark>{" "}
                        items.
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
