'use client'
import { useState } from "react";
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
} from "@tabler/icons-react";
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
}

export default ActionButton
