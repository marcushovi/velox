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
import { useRouter } from "next/navigation";

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
        error: "Name must have 1 - 255 characters.",
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
      title={editingList ? "Edit Shopping List" : "Create New Shopping List"}
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
            label="Name"
            placeholder="Enter list name"
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
          />

          {editingList ? (
            <Group grow>
              <Chip
                defaultChecked
                size="md"
                checked={listArchived}
                onChange={(event) => setListArchived(!listArchived)}
              >
                Archived
              </Chip>
            </Group>
          ) : (
            ""
          )}
        </SimpleGrid>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {editingList ? "Save Changes" : "Create List"}
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}

export default ShoppingListModal;
