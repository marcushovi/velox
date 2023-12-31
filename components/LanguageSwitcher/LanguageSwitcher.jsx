import { locales } from "@i18n.js";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { useRouter, usePathname } from "@navigation.js";
import { useState } from "react";
import { UnstyledButton, Menu, Badge, Group } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import ReactCountryFlag from "react-country-flag";
import classes from "./LanguageSwitcher.module.css";

export function LanguageSwitcher() {
  const [opened, setOpened] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");

  function onSelectChange(nextLocale) {
    console.log(nextLocale);
    startTransition(() => {
      router.replace(
        { pathname: pathname, params: params },
        { locale: nextLocale }
      );
    });
  }

  const items = locales.map((item) => (
    <Menu.Item
      leftSection={
        <ReactCountryFlag countryCode={item === "en" ? "us" : item} />
      }
      key={item}
      value={item}
      onClick={() => onSelectChange(item)}
      disabled={locale === item}
    >
      {t("locale", { locale: item })}{" "}
      {locale === item ? (
        <Badge color="blue" size="xs">
          {t("current")}
        </Badge>
      ) : (
        ""
      )}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
      transitionProps={{ transition: "pop", duration: 150 }}
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
        >
          <Group gap="xs">
            <ReactCountryFlag countryCode={locale === "en" ? "us" : locale} />
            <span className={classes.label}>
              {t("locale", { locale: locale })}
            </span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={classes.item}>{items}</Menu.Dropdown>
    </Menu>
  );
}
