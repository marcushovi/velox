import { GET as GET_ALL } from "../app/api/users/[userId]/shopping-lists/route";

test("Get all lists", async () => {
  const params = {
    userId: "6591af48bf1ffc0ca2334e66",
  };
  return GET_ALL({}, { params: params }).then(async (data) => {
    data = await data.json();
    console.log(data);
    expect(typeof data).toBe("object");
  });
});

test("Get all lists missing userId", async () => {
  const params = {};
  const desiredResponse = {
    message: "User was not found",
    statusCode: 404,
    name: "NotFound",
    parameters: {},
  };
  return GET_ALL({}, { params: params }).then(async (data) => {
    data = await data.json();
    console.log(data);
    expect(data).toMatchObject(desiredResponse);
  });
});
