"use client";

import RemoveMemberButton from "@components/app/RemoveMemberButton";
import {
  IconArchive,
  IconArchiveOff,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Text,
  lighten,
} from "@mantine/core";
import classes from "./BadgeCard.module.css";
import { useTranslations } from "next-intl";

const BadgeCard = ({
  list,
  handleEdit,
  handleDelete,
  handleClick,
  handleArchive,
  disabled,
  handleRemoveMember,
  session,
}) => {
  let members;
  if (list.membersNames) {
    members = list.membersNames.map((member, index) => {
      if (index < 5) {
        return (
          <Badge variant="light" c="dimmed" key={member}>
            {member}
          </Badge>
        );
      } else if (index === 5) {
        return "...";
      }
    });
  }
  const t = useTranslations("app.list");

  return (
    <Card withBorder radius="md" p="md">
      <Card.Section className={classes.section} mt="md">
        <Group justify="space-between">
          <Group justify="flex-start">
            <Text fz="lg" fw={500}>
              {list.name}
            </Text>
            <Badge
              size="sm"
              variant={list.archived ? "light" : ""}
              color={list.archived ? "gray" : "green"}
            >
              {list.archived ? t("archive") : t("active")}
            </Badge>
          </Group>
          <Group justify="center" px="md">
            <Badge size="lg" color="blue">
              {list.items.length}
            </Badge>
          </Group>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text className={classes.label} c="dimmed">
            {t("owner")}
          </Text>
          <Badge fz="xs" size="sm" variant="dot">
            {list.ownerName}
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group gap={7} mt={5}>
          {" "}
          <Text className={classes.label} c="dimmed">
            {t("members")}:
          </Text>
          {members.length !== 0 ? members : "none"}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }} onClick={handleClick}>
          {t("showDetails")}
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
              color="teal"
              aria-label="Archive button"
              onClick={handleArchive}
            >
              {list.archived ? <IconArchiveOff /> : <IconArchive />}
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
