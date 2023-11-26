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
