import { ActionIcon, Mark, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useRouter } from "@navigation.js";
import { IconDoorExit } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";

const RemoveMemberButton = forwardRef(function RemoveMemberButton(
  { action, list, session },
  ref
) {
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
