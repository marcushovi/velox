"use client";
import { Box, NavLink } from "@mantine/core";
import Link from "next/link";

const ActionButton = (menuItem) => {
  return (
    <Box w={220}>
      <NavLink
        component={Link}
        key={menuItem.label}
        label={menuItem.label}
        href={menuItem.link}
      />
    </Box>
  );
};

export default ActionButton;
