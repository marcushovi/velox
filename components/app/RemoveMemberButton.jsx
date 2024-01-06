import { ActionIcon, Text, Mark } from "@mantine/core";
import { IconDoorExit } from "@tabler/icons-react";
import { useRouter } from "@navigation.js";
import { forwardRef } from "react";
import { modals } from "@mantine/modals";
import { useTranslations } from "next-intl";

const RemoveMemberButton = forwardRef(function RemoveMemberButton({
  action,
  list,
  session,
}, ref) {
  const router = useRouter();
  const t = useTranslations("app.modals.memberDelete");

  const handleAction = () => {
    modals.openConfirmModal({
      title: t("title"),
      centered: true,
      children: (
        <Text size="sm">
          {t.rich("message", {
            list: list.name,
            guidelines: (chunks) => (
              <Mark color="red" fw={600}>
                {chunks}
              </Mark>
            ),
          })}
        </Text>
      ),
      labels: {
        confirm: t("confirm"),
        cancel: t("cancel"),
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        const withoutMember = list.members.filter(
          (member) => member !== session.user.id
        );
        list.members = withoutMember;
        action(list);

        router.push("/app");
      },
    });
  };

  return (
    <ActionIcon
      variant="transparent"
      size="xl"
      color="red"
      aria-label="Delete button"
      onClick={handleAction}
      ref={ref}
    >
      <IconDoorExit />
    </ActionIcon>
  );
});

export default RemoveMemberButton;
