'use client';

import { Group } from "@mantine/core";
import { TaskList } from "@components/app/TaskList/TaskList";

export default function ShoppingList({ params }) {
  return (
    <>
      <Group>
        {params.id}
      </Group>
    </>
  );
  }