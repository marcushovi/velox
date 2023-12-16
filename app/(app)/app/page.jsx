"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Feed from "@components/app/ShoppingListsFeed";
import { Suspense } from "react";
import Loading from "../loading";

export default function App() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/");
    }
  }, [session, loading, router]);
  return (
    <Suspense fallback={<Loading />}>
      <Feed />
    </Suspense>
  );
}
