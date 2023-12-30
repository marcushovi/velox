"use client";

import { Button, Container, Overlay, Text, Title } from "@mantine/core";
import { Link } from "@navigation.js";
import { signIn, useSession } from "next-auth/react";
import classes from "./HeroContentLeft.module.css";
import { useTranslations } from "next-intl";

export function HeroContentLeft() {
  const { data: session } = useSession();
  const t = useTranslations("web");

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
        {t("title")}
        </Title>
        <Text className={classes.description} size="xl" mt="xl">
        {t("description")}
        </Text>

        {session?.user ? (
          <Link href="/app">
            <Button
              variant="gradient"
              size="xl"
              radius="xl"
              className={classes.control}
            >
              {t("app")}
            </Button>
          </Link>
        ) : (
          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
            onClick={signIn}
          >
            {t("signIn")}
          </Button>
        )}
      </Container>
    </div>
  );
}
