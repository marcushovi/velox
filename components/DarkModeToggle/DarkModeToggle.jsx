"use client";

import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./DarkModeToggle.module.css";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [color, setColor] = useState("gray");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (computedColorScheme === "dark") setColor("yellow");
    else setColor("violet");
    setLoading(false);
  }, [computedColorScheme]);

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="light"
      size="xl"
      radius="md"
      aria-label="Toggle color scheme"
      color={color}
      loading={loading}
      loaderProps={{ type: 'dots' }}
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
}
