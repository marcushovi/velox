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
        message: "User was not found",
        value: { shoppingList: listId },
      });
    }

    const itemId = params.itemId;

    const item = await ShoppingList.findOne(
      { _id: listId, "items._id": itemId },
      { "items.$": 1 }
    );

    if (!item) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "Item was not found",
        value: { item: itemId },
      });
    }

    return Response.json(...item.items, { status: 200 });
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

    // check if user exists
    const listId = params.listId;
    const shoppingLists = await ShoppingList.exists({
      _id: listId,
      $or: [{ owner: userId }, { members: userId }],
    });

    if (!shoppingLists) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "User was not found",
        value: { shoppingList: listId },
      });
    }

    const itemId = params.itemId;

    const { name, purchased, archived } = await request.json();

    const item = await ShoppingList.findOneAndUpdate(
      { _id: listId, "items._id": itemId },
      {
        $set: {
          "items.$.name": name,
          "items.$.purchased": purchased,
          "items.$.archived": archived,
          "sys.mts": new Date()
        },
        $inc: { 'sys.rev': 1 } // Update the modification timestamp
      },
      { new: true, runValidators: true } // returns the updated document
    );

    if (!item) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "Item was not found",
        value: { item: itemId },
      });
    }

    return Response.json(item, { status: 200 });
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

    // check if user exists
    const listId = params.listId;
    const shoppingLists = await ShoppingList.exists({
      _id: listId,
      $or: [{ owner: userId }, { members: userId }],
    });

    if (!shoppingLists) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "User was not found",
        value: { shoppingList: listId },
      });
    }

    const itemId = params.itemId;

    const item = await ShoppingList.findByIdAndUpdate(
      listId,
      {
        $pull: { items: { _id: itemId } }, // Remove the item
        $set: { "sys.mts": new Date() },
        $inc: { 'sys.rev': 1 } // Update the modification timestamp
      },
      { new: true }
    );

    if (!item) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "Item was not found",
        value: { item: itemId },
      });
    }

    return Response.json(item, { status: 200 });
  } catch (error) {
    return ErrorHandler.handleCustomError(error);
  }
};
