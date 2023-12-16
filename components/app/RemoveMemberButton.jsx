import { ActionIcon } from "@mantine/core";
import { IconDoorExit } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const RemoveMemberButton = ({ action, list, session }) => {
  const router = useRouter();

  const handleAction = () => {
    const hasConfirmed = confirm(
      `Are you sure you want to leave list ${list.name}?`
    );
    if (hasConfirmed) {
      const withoutMember = list.members.filter(
        (member) => member !== session.user.id
      );
      list.members = withoutMember;
      action(list);

      router.push("/app");
    }
  };

  return (
    <ActionIcon
      variant="transparent"
      size="xl"
      color="red"
      aria-label="Delete button"
      onClick={handleAction}
    >
      <IconDoorExit />
    </ActionIcon>
  );
};

export default RemoveMemberButton;
