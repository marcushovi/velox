import User from "@models/user";
import { connectToDB } from "@utils/database";
import ErrorHandler from "@utils/errorHandler";
import handleErrors from "@utils/errors/handleErrors";

// create user
export const POST = async (request) => {
  try {

    const { username, email, password } = await request.json();
    await connectToDB();

    const newUser = new User({
      username: username,
      email: email,
      passwordHash: password,
    });

    await newUser.save();
    return  Response.json(newUser, { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
};

// get all user, just for testing
export const GET = async () => {
  try {
    await connectToDB();

    const users = await User.find({});

    return Response.json(users, { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
};
