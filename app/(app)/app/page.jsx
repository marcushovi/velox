'use client'
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Group } from "@mantine/core";
import SideMenu  from "@components/app/SideMenu/SideMenu";
import Feed from "@components/app/Feed";

export default function App() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/');
    }
  }, [session, loading, router]);
  return (
    <>
      <Group>
        <SideMenu />
        <Feed />
      </Group>
    </>
  );
}
