"use client";

import { IconTrash, IconArchive, IconEdit } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
} from "@mantine/core";
import classes from "./BadgeCard.module.css";

const BadgeCard = ({
  list,
  handleEdit,
  handleDelete,
  handleClick,
  handleArchive,
}) => {
  let members;
  if (list.members) {
    members = list.members.map((member) => (
      <Badge variant="light" key={member}>{member}</Badge>
    ));
  }

  return (
    <Card
      withBorder
      radius="md"
      p="md"
      className={classes.card}
    >
      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {list.name}
          </Text>
          <Badge size="sm" variant={list.archived ? "green" : "light"}>
            {list.archived ? "ARCHIVED" : "ACTIVE"}
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Members: {members ? "none" : members}
        </Text>

        <Group gap={7} mt={5}></Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }} onClick={handleClick}>
          Show details
        </Button>
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
    </Card>
  );
};

export default BadgeCard;
