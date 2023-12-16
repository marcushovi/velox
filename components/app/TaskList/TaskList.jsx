"use client";

import { ActionIcon, Checkbox, Table } from "@mantine/core";
import { IconArchive, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export function TaskList(props) {
  const [list, setList] = useState({
    items: { ...sampleShoppingLists[props.id].items },
  });

  const toggleItemResolved = (itemId) => {
    const updatedItems = list.items.map((item) => {
      if (item.id === itemId) {
        return { ...item, resolved: !item.resolved };
      }
      return item;
    });
    setList({ ...list, items: updatedItems });
  };

  const deleteItem = (itemId) => {
    const updatedItems = list.items.filter((item) => item.id !== itemId);
    setList({ ...list, items: updatedItems });
  };

  const rows = sampleShoppingLists[props.id].items.map((row) => {
    return (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Checkbox
            checked={row.resolved}
            color="green"
            size="lg"
            onClick={() => toggleItemResolved(row.id)}
          />
        </Table.Td>
        <Table.Td>{row.name}</Table.Td>
        <Table.Td>
          <ActionIcon variant="transparent" size="xl" aria-label="Edit button">
            <IconEdit />
          </ActionIcon>
        </Table.Td>
        <Table.Td>
          <ActionIcon
            variant="transparent"
            size="xl"
            color="green"
            aria-label="Archive button"
          >
            <IconArchive />
          </ActionIcon>
        </Table.Td>
        <Table.Td>
          <ActionIcon
            variant="transparent"
            size="xl"
            color="red"
            aria-label="Delete button"
            // onClick={deleteItem(row.id)}
          >
            <IconTrash />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
