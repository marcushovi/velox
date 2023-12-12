"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import {
  Modal,
  Button,
  TextInput,
  Group,
  Box,
  Chip,
  SimpleGrid,
} from "@mantine/core";

import { useForm, hasLength } from "@mantine/form";

function ItemModal({ opened, setOpened, onSubmit, editingItem }) {
  const { data: session } = useSession();

  const form = useForm({
    initialValues: {
      name: "",
      archived: false,
      quantity: "",
    },
    validate: {
      name: hasLength(
        { min: 1, max: 255 },
        "Name must be 1-255 characters long"
      ),
      quantity: hasLength({ max: 255 }, "Name must be max 255 characters long"),
    },
  });

  useEffect(() => {
    const fetchLists = async () => {
      form.setValues({ name: editingItem.name, archived: editingItem.archived, quantity: editingItem.quantity });
      // form.setFieldValue('name', editingItem.name)
      // form.setFieldValue('archived', editingItem.archived)
      // form.setFieldValue('quantity', editingItem.quantity)
    };

    if (editingItem) fetchLists();
  }, [editingItem]);

  const handleSubmit = (values) => {
    console.log(editingItem)
    const item = {
      _id: editingItem?._id,
      name: values.name,
      quantity: values.quantity,
      archived: values.archived,
    };
    onSubmit(item);
    handleCancel();
  };

  const handleCancel = () => {
    setOpened(false);
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleCancel}
      title={editingItem ? "Edit Item" : "Create New Item"}
      closeOnClickOutside={false}
      centered
    >
      <Box
        component="form"
        maw={400}
        mx="auto"
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <SimpleGrid cols={1} verticalSpacing="xl">
          <TextInput
            label="Name"
            placeholder="Enter item name"
            withAsterisk
            data-autofocus
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Quantity"
            placeholder="Enter quantity"
            {...form.getInputProps("quantity")}
          />

          <Group grow>
            <Chip
              size="md"
              {...form.getInputProps("archived", { type: "checkbox" })}
            >
              Archived
            </Chip>
          </Group>
        </SimpleGrid>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {editingItem ? "Save Changes" : "Create Item"}
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}

export default ItemModal;
