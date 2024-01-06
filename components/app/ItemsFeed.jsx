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
import { useTranslations } from "next-intl";
import ItemCard from "./ItemCard/ItemCard";
import ItemModal from "./modals/ItemModal";

const ItemsFeed = ({ items, edit, remove, purchased, archive }) => {
  const [editItem, setEditItem] = useState({ open: false, item: {} });
  const [data, setData] = useState([]);
  const t = useTranslations("app");

  const handleDelete = (item) => {
    modals.openConfirmModal({
      title: t("modals.item.delete.title"),
      centered: true,
      children: (
        <Text size="sm">
          {t.rich("modals.item.delete.message", {
            item: item.name,
            guidelines: (chunks) => (
              <Mark color="red" fw={600}>
                {chunks}
              </Mark>
            ),
          })}
        </Text>
      ),
      labels: {
        confirm: t("modals.item.delete.confirm"),
        cancel: t("modals.item.delete.cancel"),
      },
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
                  {t("item.inProcess.label")}
                  {"  "}
                  <Badge color="blue">
                    {data.filter((item) => !item?.purchased).length}
                  </Badge>
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                    {data.filter((item) => !item?.purchased).length === 0 ? (
                      <Text ta="center" c="dimmed" size="lg" fw={700}>
                        {t.rich("item.inProcess.empty", {
                          guidelines: (chunks) => (
                            <Mark color="blue">{chunks}</Mark>
                          ),
                        })}
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
                  {t("item.purchased.label")}
                  {"  "}
                  <Badge color="green">
                    {data.filter((item) => item?.purchased).length}
                  </Badge>
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                    {data.filter((item) => item?.purchased).length === 0 ? (
                      <Text ta="center" c="dimmed" size="lg" fw={700}>
                        {t.rich("item.purchased.empty", {
                          guidelines: (chunks) => (
                            <Mark color="green">{chunks}</Mark>
                          ),
                        })}
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
                  {t("item.archived.label")}
                  {"  "}
                  <Badge color="teal">
                    {data.filter((item) => item?.archived).length}
                  </Badge>
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 3 }}>
                    {data.filter((item) => item?.archived).length === 0 ? (
                      <Text ta="center" c="dimmed" size="lg" fw={700}>
                        {t.rich("item.archived.empty", {
                          guidelines: (chunks) => (
                            <Mark color="teal">{chunks}</Mark>
                          ),
                        })}
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
