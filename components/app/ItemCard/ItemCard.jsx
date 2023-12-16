"use client";

import {
  IconArchive,
  IconArchiveOff,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

import { ActionIcon, Card, Checkbox, Group, Text } from "@mantine/core";
import classes from "./ItemCard.module.css";

const ItemCard = ({
  item,
  handleEdit,
  handleDelete,
  handleArchive,
  handlePurchased,
}) => {
  const [checked, setChecked] = useState(item.purchased);

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section} mt="md">
        <Group>
          <Checkbox
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            labelPosition="left"
            color="green"
            radius="md"
            size="lg"
            onClick={handlePurchased}
          />
          <Text fz="lg" fw={500}>
            {item.name}
          </Text>
          {/* <Badge
            size="sm"
            variant={item.archived ? "light" : ""}
            color={item.archived ? "gray" : "green"}
          >
            {item.archived ? "ARCHIVED" : "ACTIVE"}
          </Badge> */}

          <Text mt="md" className={classes.label} c="dimmed">
            Quantity {item.quantity}
          </Text>
          <Group>
            <ActionIcon
              variant="transparent"
              size="xl"
              aria-label="Edit button"
              onClick={handleEdit}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              size="xl"
              color="teal"
              aria-label="Archive button"
              onClick={handleArchive}
            >
              {item.archived ? <IconArchiveOff /> : <IconArchive />}
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              size="xl"
              color="red"
              aria-label="Delete button"
              onClick={handleDelete}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default ItemCard;
