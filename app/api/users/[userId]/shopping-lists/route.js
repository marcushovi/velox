import ShoppingList from "@models/shoppingList";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import ErrorHandler from "@utils/errorHandler";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const userId = params.userId;

    // check if user exists
    const existingUser = await User.exists({
      _id: userId,
    });

    if (!existingUser) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "User was not found",
        value: { user: userId },
      });
    }

    const shoppingLists = await ShoppingList.find({
      $or: [{ owner: userId }, { members: userId }],
    });

    return Response.json(shoppingLists, { status: 200 });
  } catch (error) {
    return ErrorHandler.handleCustomError(error);
  }
};

export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const userId = params.userId;

    // check if user exists
    const existingUser = await User.exists({
      _id: userId,
    });

    if (!existingUser) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "User was not found",
        value: { user: userId },
      });
    }

    const { name, members } = await request.json();

    // // Check if a shopping list with the same name already exists for the user
    // const existingList = await ShoppingList.findOne({
    //   $or: [{ owner: userId }, { members: userId }],
    //   name: name,
    // });

    // if (existingList) {
    //   return ErrorHandler.handleCustomError({
    //     name: "`DuplicateKeyError`",
    //     message: `A shopping list with the name '${name}' already exists`,
    //     value: { name: name },
    //   });
    // }

    // // Check if any member being added already owns a list with the same name
    // for (const member of members) {
    //   const memberHasList = await ShoppingList.findOne({
    //     owner: member,
    //     name: name,
    //   });

    //   if (memberHasList) {
    //     return ErrorHandler.handleCustomError({
    //       name: "DuplicateKeyError",
    //       message: `User ${member} already has a list named '${name}'`,
    //       value: { user: member, name: name },
    //     });
    //   }
    // }

    const newList = new ShoppingList({
      owner: userId,
      name: name,
      members: members,
    });

    await newList.save();

    return Response.json(newList, { status: 200 });
  } catch (error) {
    return ErrorHandler.handleCustomError(error);
  }
};
