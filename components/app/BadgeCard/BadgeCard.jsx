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
  Tooltip,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import classes from "./BadgeCard.module.css";

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
            <Tooltip
              label={t("tooltips.numberTasks")}
              closeDelay={200}
              withArrow
              arrowSize={8}
              arrowRadius={2}
            >
              <Badge size="lg" color="blue">
                {list.items.length}
              </Badge>
            </Tooltip>
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
          <Tooltip.Group openDelay={500} closeDelay={200}>
            <Tooltip
              label={t("tooltips.edit")}
              withArrow
              arrowSize={8}
              arrowRadius={2}
            >
              <ActionIcon
                variant="transparent"
                size="xl"
                aria-label="Edit button"
                onClick={handleEdit}
              >
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label={
                list.archived ? t("tooltips.activate") : t("tooltips.archive")
              }
              withArrow
              arrowSize={8}
              arrowRadius={2}
            >
              <ActionIcon
                variant="transparent"
                size="xl"
                color="teal"
                aria-label="Archive button"
                onClick={handleArchive}
              >
                {list.archived ? <IconArchiveOff /> : <IconArchive />}
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label={t("tooltips.delete")}
              withArrow
              arrowSize={8}
              arrowRadius={2}
            >
              <ActionIcon
                variant="transparent"
                size="xl"
                color="red"
                aria-label="Delete button"
                onClick={handleDelete}
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Tooltip.Group>
        ) : (
          <Tooltip
            label={t("tooltips.leaveList")}
            withArrow
            arrowSize={8}
            arrowRadius={2}
            openDelay={500}
            closeDelay={200}
          >
            <RemoveMemberButton
              action={handleRemoveMember}
              list={list}
              session={session}
            />
          </Tooltip>
        )}
      </Group>
    </Card>
  );
};

export default BadgeCard;
