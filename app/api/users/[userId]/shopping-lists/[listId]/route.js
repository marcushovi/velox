import ShoppingList from "../../../../../../models/shoppingList";
import User from "../../../../../../models/user";
import { connectToDB } from "../../../../../../utils/database";
import ErrorHandler from "../../../../../../utils/errorHandler";

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

    const listId = params.listId;

    const shoppingLists = await ShoppingList.findOne({
      _id: listId,
      $or: [{ owner: userId }, { members: userId }],
    });

    return Response.json(shoppingLists, { status: 200 });
  } catch (error) {
    return ErrorHandler.handleCustomError(error);
  }
};

export const PUT = async (request, { params }) => {
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

    const listId = params.listId;
    const { name, members, archived } = await request.json();

    const existingList = await ShoppingList.findOne({
      _id: listId,
      $or: [{ owner: userId }, { members: userId }],
    });

    if (!existingList) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        value: { shoppingLists: userId },
      });
    }
    // // Check if a different shopping list with the same name exists for the user
    // const duplicateList = await ShoppingList.findOne({
    //   $or: [{ owner: userId }, { members: userId }],
    //   name: name,
    //   _id: { $ne: listId }, // Exclude the current list being updated
    // });

    // if (duplicateList) {
    //   return ErrorHandler.handleCustomError({
    //     name: "DuplicateKeyError",
    //     message: `A shopping list with the name '${name}' already exists`,
    //     value: { user: userId, name: name },
    //   });
    // }

    existingList.name = name || existingList.name;
    existingList.members = members || existingList.members;
    existingList.archived = archived || existingList.archived;

    existingList.sys.mts = Date.now();
    existingList.sys.rev += 1;

    await existingList.save();

    return Response.json(existingList, { status: 200 });
  } catch (error) {
    return ErrorHandler.handleCustomError(error);
  }
};

export const DELETE = async (request, { params }) => {
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

    const listId = params.listId;

    const shoppingLists = await ShoppingList.findOneAndDelete({
      _id: listId,
      $or: [{ owner: userId }, { members: userId }],
    });

    return Response.json(shoppingLists, { status: 200 });
  } catch (error) {
    return ErrorHandler.handleCustomError(error);
  }
};
