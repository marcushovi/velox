import { Group } from "@mantine/core";
import SideMenu  from "@components/app/SideMenu/SideMenu";
import Feed from "@components/app/Feed";

export default function App() {
  return (
    <>
      <Group>
        <SideMenu />
        <Feed />
      </Group>
    </>
  );
}
