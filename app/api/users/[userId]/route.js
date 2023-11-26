import User from "@models/user";
import { connectToDB } from "@utils/database";
import ErrorHandler from "@utils/errorHandler";

// get user by ID
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const userId = params.userId;

    // check if user exists
    const existingUser = await User.findOne({
      _id: userId,
    });

    if (!existingUser) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "User was not found",
        value: { user: userId },
      });
    }

    return Response.json(existingUser, { status: 200 });
  } catch (error) {
    return ErrorHandler.handleCustomError(error);
  }
};

// update user by ID
export const PUT = async (request, { params }) => {
  try {
    await connectToDB();

    const userId = params.userId;

    // check if user exists
    const existingUser = await ShoppingList.findOne({
      _id: userId,
    });

    if (!existingUser) {
      return ErrorHandler.handleCustomError({
        name: "NotFound",
        message: "User was not found",
        value: { user: userId },
      });
    }

    const { username, email, password } = await request.json();

    existingUser.username = username;
    existingUser.email = email;
    existingUser.passwordHash = password;

    existingUser.sys.mts = Date.now();
    existingUser.sys.rev += 1;

    await existingUser.save();

    return Response.json(existingUser, { status: 200 });
  } catch (error) {
    return ErrorHandler.handleCustomError(error);
  }
};

// update user by ID
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const userId = params.userId;

    const removedUser = await User.findByIdAndDelete(userId);

  if (!removedUser) {
    return ErrorHandler.handleCustomError({
      name: "NotFound",
      message: "User was not found",
      value: { user: userId },
    });
  }

    return Response.json(removedUser, { status: 200 });
  } catch (error) {
    return ErrorHandler.handleCustomError(error);
  }
};
