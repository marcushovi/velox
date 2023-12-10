"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
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
      name: hasLength({ min: 1, max: 255 }, 'Name must be 1-255 characters long'),
      quantity: hasLength({ max: 255 }, 'Name must be max 255 characters long'),
    },
  });



  const handleSubmit = (values) => {
    const item = {
      _id: editingItem?._id,
      name: values.name,
      quantity: values.quantity,
      archived: values.archived,
    };
    onSubmit(item);
    handleCancel()

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
