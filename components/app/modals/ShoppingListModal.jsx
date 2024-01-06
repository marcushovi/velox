"use client";

import {
  Box,
  Button,
  Chip,
  Group,
  Modal,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import ComboBox from "@components/app/ComboBox/ComboBox";
import { useUser } from "@components/app/UserProvider";
import { useRouter } from "@navigation.js";
import { useTranslations } from "next-intl";

function ShoppingListModal({
  opened,
  setOpened,
  onSubmit,
  editingList,
  diseabled,
}) {
  const { data: session } = useSession();
  const [listName, setListName] = useState({ name: "", error: "" });
  const [listMembers, setListMembers] = useState([]);
  const [listArchived, setListArchived] = useState(false);
  const { users } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const router = useRouter();
  const t = useTranslations("app.modals.list.modal");

  // Effect to prepopulate the form when editing
  useEffect(() => {
    if (editingList) {
      setListName({ name: editingList.name, error: "" });
      setListMembers(editingList.members);
      setListArchived(editingList.archived);
    }

    if (session?.user.id)
      setAllUsers(users.filter((user) => user._id !== session?.user.id));
  }, [editingList, session, users]);

  const handleSubmit = () => {
    if (listName.name.length < 1 || listName.name.length > 255) {
      setListName({
        name: listName.name,
        error: t("validation.name"),
      });
    } else {
      const list = {
        _id: editingList?._id,
        name: listName.name,
        archived: listArchived,
        members: listMembers,
      };

      onSubmit(list);

      handleCancel();

      if (editingList === undefined) router.push("/app");
    }
  };

  const handleCancel = () => {
    setOpened(false);
    setListName({ name: "", error: "" });
    setListMembers([]);
    setListArchived(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={handleCancel}
      title={editingList ? t("edit.title") : t("create.title")}
      closeOnClickOutside={false}
      centered
    >
      <Box
        component="form"
        maw={400}
        mx="auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <SimpleGrid cols={1} verticalSpacing="xl">
          <TextInput
            label={t("name.label")}
            placeholder={t("name.placeholder")}
            value={listName.name}
            onChange={(event) =>
              setListName({ name: event.currentTarget.value, error: "" })
            }
            disabled={diseabled}
            withAsterisk
            error={listName.error}
            data-autofocus
          />

          <ComboBox
            data={allUsers}
            value={listMembers}
            setValue={setListMembers}
            label={t("members.label")}
            placeholder={t("members.placeholder")}
            empty={t("members.empty")}
          />

          {editingList ? (
            <Group grow>
              <Chip
                defaultChecked
                size="md"
                checked={listArchived}
                onChange={(event) => setListArchived(!listArchived)}
              >
                {listArchived ? t("archived") : t("notArchived")}
              </Chip>
            </Group>
          ) : (
            ""
          )}
        </SimpleGrid>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={handleCancel}>
            {t("cancel")}
          </Button>
          <Button type="submit">
            {editingList ? t("edit.confirm") : t("create.confirm")}
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}

export default ShoppingListModal;
