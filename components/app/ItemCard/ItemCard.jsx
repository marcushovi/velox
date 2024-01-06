"use client";

import {
  IconArchive,
  IconArchiveOff,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

import {
  ActionIcon,
  Card,
  Checkbox,
  Grid,
  Group,
  Menu,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import classes from "./ItemCard.module.css";

const ItemCard = ({
  item,
  handleEdit,
  handleDelete,
  handleArchive,
  handlePurchased,
}) => {
  const [checked, setChecked] = useState(item.purchased);
  const t = useTranslations("app.item");

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      data-checked={checked || undefined}
      className={classes.card}
    >
      <Card.Section className={classes.section} my="xs">
        <Grid>
          <Grid.Col span={2}>
            <Stack align="center" h="100%" justify="space-around">
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                labelPosition="left"
                color="green"
                radius="md"
                size="lg"
                onClick={handlePurchased}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={10}>
            <Group justify="space-between">
              <Stack>
                <Text fz="lg" fw={500}>
                  {item.name}
                </Text>

                <Text className={classes.label} c="dimmed">
                  {item.quantity}
                </Text>
              </Stack>

              <Menu
                withinPortal
                position="bottom-end"
                withArrow
                arrowPosition="center"
              >
                <Menu.Target>
                  <ActionIcon
                    variant="transparent"
                    color={item.archived ? "teal" : "gray"}
                    size="lg"
                  >
                    <IconDotsVertical style={{ width: "90%", height: "90%" }} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconEdit style={{ width: rem(14), height: rem(14) }} />
                    }
                    color="blue"
                    aria-label="Edit button"
                    onClick={handleEdit}
                    size="xl"
                  >
                    {t("edit")}
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      item.archived ? (
                        <IconArchiveOff
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      ) : (
                        <IconArchive
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      )
                    }
                    color="teal"
                    aria-label="Archive button"
                    onClick={handleArchive}
                    size="xl"
                  >
                    {item.archived ? t("unarchive") : t("archive")}
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={
                      <IconTrash style={{ width: rem(14), height: rem(14) }} />
                    }
                    color="red"
                    aria-label="Delete button"
                    onClick={handleDelete}
                    size="xl"
                  >
                    {t("delete")}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  );
};

export default ItemCard;
