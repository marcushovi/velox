"use client";

import { Button, Container, Overlay, Text, Title } from "@mantine/core";
import { Link } from "@navigation.js";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import classes from "./HeroContentLeft.module.css";

export function HeroContentLeft() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const t = useTranslations("web");

  useEffect(() => {
    if (session !== undefined)
      setTimeout(() => {
        setLoading(false);
      }, 500);
  }, [session]);

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>{t("title")}</Title>
        <Text className={classes.description} size="xl" mt="xl">
          {t("description")}
        </Text>

        {session?.user?.id ? (
          <Link href="/app">
            <Button
              variant="gradient"
              size="xl"
              radius="lg"
              className={classes.control}
              loading={loading}
              loaderProps={{ type: "dots" }}
            >
              {!loading ? t("app") : ""}
            </Button>
          </Link>
        ) : (
          <Button
            variant="gradient"
            size="xl"
            radius="lg"
            className={classes.control}
            onClick={signIn}
            loading={loading}
            loaderProps={{ type: "dots" }}
          >
            {!loading ? t("signIn") : ""}
          </Button>
        )}
      </Container>
    </div>
  );
}
