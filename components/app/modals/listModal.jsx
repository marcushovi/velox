import React, { useState, useEffect } from 'react';
import { Modal, Button, TextInput, Group } from '@mantine/core';

function ShoppingListModal({ opened, setOpened, onSubmit, editingList }) {
  const [listName, setListName] = useState('');

  // Effect to prepopulate the form when editing
  useEffect(() => {
    if (editingList) {
      setListName(editingList.name);
    } else {
      setListName('');
    }
  }, [editingList]);

  const handleSubmit = () => {
    onSubmit(listName, editingList?.id);
    setListName('');
    setOpened(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={editingList ? "Edit Shopping List" : "Add New Shopping List"}
    >
      <TextInput
        label="List Name"
        placeholder="Enter list name"
        value={listName}
        onChange={(event) => setListName(event.currentTarget.value)}
      />
      <Group position="right" mt="md">
        <Button variant="default" onClick={() => setOpened(false)}>Cancel</Button>
        <Button onClick={handleSubmit}>{editingList ? "Save Changes" : "Add List"}</Button>
      </Group>
    </Modal>
  );
}

export default ShoppingListModal;
