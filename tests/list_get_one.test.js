import { GET as GET_ONE } from "../app/api/users/[userId]/shopping-lists/[listId]/route";

test("Get list", async () => {
  const params = {
    userId: "6591af48bf1ffc0ca2334e66",
    listId: "6591b68bb18c4b5e38ac9702",
  };
  const request = {};
  return GET_ONE(request, { params: params }).then(async (data) => {
    data = await data.json();
    console.log(data);
    expect(typeof data).toBe("object");
  });
});

test("Get list missing userId", async () => {
  const params = {
    listId: "6591b68bb18c4b5e38ac9702",
  };
  const request = {};
  const desiredResponse = {
    message: "User was not found",
    statusCode: 404,
    name: "NotFound",
    parameters: {},
  };
  return GET_ONE(request, { params: params }).then(async (data) => {
    data = await data.json();
    console.log(data);
    expect(data).toMatchObject(desiredResponse);
  });
});


