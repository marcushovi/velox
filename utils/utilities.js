import ShoppingList from "@models/shoppingList";
import User from "@models/user";
import { connectToDB } from "@utils/database";

// const userExists = async (userId) => {

//   const user = await User.exists({ _id: userId });

//   if (user) return user;

//   response = {
//     exists: false,
//     res: ErrorHandler.handleCustomError({
//       name: "NotFound",
//       message: "User was not found",
//       value: { user: userId },
//     })
//   }

//   return response;
// };

// const listExists = async (userId, listId) => {

//   const user = await ShoppingList.findOne({ _id: listId });

//   if (!user) return false;

//   return user;
// };

module.exports = Utilities;
