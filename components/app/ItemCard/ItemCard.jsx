"use client";

import {
  IconTrash,
  IconArchive,
  IconEdit,
  IconDoorExit,
} from "@tabler/icons-react";
import RemoveMemberButton from "@components/app/RemoveMemberButton";

import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  Checkbox,
} from "@mantine/core";
import classes from "./ItemCard.module.css";

const ItemCard = ({
  item,
  handleEdit,
  handleDelete,
  handleClick,
  handleArchive,
  disabled,
  handleRemoveMember,
  session,
}) => {
  console.log(item);
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section} mt="md">
        <Group>
          <Checkbox
            defaultChecked
            labelPosition="left"
            color="green"
            radius="md"
            size="lg"
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
              color="green"
              aria-label="Archive button"
              onClick={handleArchive}
            >
              <IconArchive />
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
