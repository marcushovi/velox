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
} from "@mantine/core";
import classes from "./BadgeCard.module.css";

const BadgeCard = ({
  list,
  handleEdit,
  handleDelete,
  handleClick,
  handleArchive,
  disabled,
  handleRemoveMember,
  session
}) => {
  let members;
  if (list.membersNames) {
    members = list.membersNames.map((member) => (
      <Badge variant="light" c="dimmed" key={member}>
        {member}
      </Badge>
    ));
  }

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {list.name}
          </Text>
          <Badge
            size="sm"
            variant={list.archived ? "light" : ""}
            color={list.archived ? "gray" : "green"}
          >
            {list.archived ? "ARCHIVED" : "ACTIVE"}
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text mt="md" className={classes.label} c="dimmed">
            Owner
          </Text>
          <Badge fz="xs" size="sm" variant="dot">
            {list.ownerName}
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={7} mt={5}>
          {" "}
          <Text mt="md" className={classes.label} c="dimmed">
            Members:
          </Text>
          {members.length !== 0 ? members : "none"}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }} onClick={handleClick}>
          Show details
        </Button>
        {!disabled ? (
          <>
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
          </>
        ) : (
          <>
            <RemoveMemberButton
              action={handleRemoveMember}
              list={list}
              session={session}
            />
          </>
        )}
      </Group>
    </Card>
  );
};

export default BadgeCard;
