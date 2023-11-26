// "use client";

// import { Table, Anchor, ActionIcon } from "@mantine/core";
// import classes from "./ShoppingList.module.css";
// import { IconArchive, IconEdit, IconTrash } from "@tabler/icons-react";

// export function ShoppingList({
//   list,
//   handleEdit,
//   handleDelete,
//   handleClick,
//   handleArchive,
// }) {
//   if (!list) {
//     return (
//       <Table.Tr>
//         <Table.Td>No lists</Table.Td>
//         <Table.Td></Table.Td>
//         <Table.Td></Table.Td>
//         <Table.Td></Table.Td>
//       </Table.Tr>
//     );
//   }

//   return (
//     <Table.Tr key={list._id}>
//       <Table.Td>
//         {" "}
//         <Anchor onClick={handleClick}>{list.name}</Anchor>
//       </Table.Td>
//       <Table.Td>
//         <ActionIcon
//           variant="transparent"
//           size="xl"
//           aria-label="Edit button"
//           onClick={handleEdit}
//         >
//           <IconEdit />
//         </ActionIcon>
//       </Table.Td>
//       <Table.Td>
//         <ActionIcon
//           variant="transparent"
//           size="xl"
//           color="green"
//           aria-label="Archive button"
//           onClick={handleArchive}
//         >
//           <IconArchive />
//         </ActionIcon>
//       </Table.Td>
//       <Table.Td>
//         <ActionIcon
//           variant="transparent"
//           size="xl"
//           color="red"
//           aria-label="Delete button"
//           onClick={handleDelete}
//         >
//           <IconTrash />
//         </ActionIcon>
//       </Table.Td>
//     </Table.Tr>
//   );
// }
