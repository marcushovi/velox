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

    // check if user exists
    const listId = params.listId;
    const shoppingLists = await ShoppingList.exists({
      _id: listId,
      $or: [{ owner: userId }, { members: userId }],
    });

    if (!shoppingLists) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "Shopping list was not found",
        value: { shoppingList: listId },
      });
    }

    const items = await ShoppingList.findById({ _id: listId })
      .select("items -_id") // select items and exclude _id

    return Response.json(items.items, { status: 200 });
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

    // check if user exists
    const listId = params.listId;
    const shoppingLists = await ShoppingList.exists({
      _id: listId,
      $or: [{ owner: userId }, { members: userId }],
    });

    if (!shoppingLists) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "Shopping list was not found",
        value: { shoppingList: listId },
      });
    }

    const { name, quantity, archived } = await request.json();

    const updatedList = await ShoppingList.findByIdAndUpdate(
      listId,
      { $push: { items: { name: name, quantity: quantity, archived: archived } } }, // Add the new item to the items array
      { new: true } // Return the updated document
    );

    return Response.json(updatedList, { status: 200 });
  } catch (error) {
    return ErrorHandler.handleCustomError(error);
  }
};
