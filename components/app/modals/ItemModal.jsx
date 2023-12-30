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
import { useEffect } from "react";

import { hasLength, useForm } from "@mantine/form";
import { useTranslations } from "next-intl";

function ItemModal({ opened, setOpened, onSubmit, editingItem }) {
  const t = useTranslations("app.modals.item");

  const form = useForm({
    initialValues: {
      name: "",
      archived: false,
      quantity: "",
    },
    validate: {
      name: hasLength({ min: 1, max: 255 }, t("modal.validation.name")),
      quantity: hasLength({ max: 255 }, t("modal.validation.quantity")),
    },
  });

  useEffect(() => {
    const fetchLists = async () => {
      form.setValues({
        name: editingItem.name,
        archived: editingItem.archived,
        quantity: editingItem.quantity,
      });
      // form.setFieldValue('name', editingItem.name)
      // form.setFieldValue('archived', editingItem.archived)
      // form.setFieldValue('quantity', editingItem.quantity)
    };

    if (editingItem) fetchLists();
  }, [editingItem]);

  const handleSubmit = (values) => {
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
      title={editingItem ? t("modal.edit.title") : t("modal.create.title")}
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
            label={t("modal.name.label")}
            placeholder={t("modal.name.placeholder")}
            withAsterisk
            data-autofocus
            {...form.getInputProps("name")}
          />

          <TextInput
            label={t("modal.quantity.label")}
            placeholder={t("modal.quantity.label")}
            {...form.getInputProps("quantity")}
          />

          <Group grow>
            <Chip
              size="md"
              {...form.getInputProps("archived", { type: "checkbox" })}
            >
              {form.values.archived
                ? t("modal.archived")
                : t("modal.notArchived")}
            </Chip>
          </Group>
        </SimpleGrid>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={handleCancel}>
            {t("modal.cancel")}
          </Button>
          <Button type="submit">
            {editingItem ? t("modal.edit.confirm") : t("modal.create.confirm")}
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}

export default ItemModal;
