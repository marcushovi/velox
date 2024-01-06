"use client";

import { useRouter } from "@navigation.js";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/users`);
      const data = await response.json();
      if (response.ok && response.status === 200) {
        const usersResponse = data.map((user) => {
          if (user._id === session?.user.id) {
            user.username = "@ME";
            return user;
          }
          return user;
        });

        setUsers(usersResponse);
      } else {
        setUsers([]);
      }
    };

    if (!loading && !session?.user?.id) {
      router.push("/");
    } else {
      fetchUsers();
    }
  }, [session, loading]);

  return (
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );
};
