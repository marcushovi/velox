"use client";

import { signIn, useSession } from "next-auth/react";
import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "./HeroContentLeft.module.css";

export function HeroContentLeft() {
  const { data: session } = useSession();
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
          A fully featured Shopping List App
        </Title>
        <Text className={classes.description} size="xl" mt="xl">
          Fully functional accessible web applications faster than ever – And
          many more is on the way.
        </Text>

        {session?.user ? (
          <Button
            component="a"
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
            href="/app"
          >
            Get started with App
          </Button>
        ) : (
          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
            onClick={signIn}
          >
            Sign in
          </Button>
        )}
      </Container>
    </div>
  );
}
