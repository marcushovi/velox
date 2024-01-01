import { POST } from "../app/api/users/[userId]/shopping-lists/route";
import { DELETE } from "../app/api/users/[userId]/shopping-lists/[listId]/route";

test("Create list", async () => {
  const params = {
    userId: "6591af48bf1ffc0ca2334e66",
  };
  const request = {
    json: () => ({
      name: "TEST",
      members: ["655d3ae9c60794183a98ea9a"],
    }),
  };
  return POST(request, { params: params }).then(async (data) => {
    data = await data.json();

    console.log(data);
    expect(data).toHaveProperty("sys.rev", 0);
    expect(data).toHaveProperty("_id");
    expect(data).toHaveProperty("owner");
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("archived", false);
    expect(data).toHaveProperty("members");
    expect(data).toHaveProperty("items", []);

    await DELETE({}, { params: { userId: data.owner, listId: data._id } }).then(async (data) => {
      data = await data.json();
      console.log(data);
    });;

  });
});

test("Create list missing params", async () => {
  const params = {};
  const request = {
    json: () => ({
      name: "TEST",
      members: ["655d3ae9c60794183a98ea9a"],
    }),
  };

  const desiredResponse = {
    message: "User was not found",
    name: "NotFound",
    parameters: {},
    statusCode: 404,
  };

  return POST(request, { params: params }).then(async (data) => {
    data = await data.json();
    console.log(data);
    expect(data).toMatchObject(desiredResponse);

  });
});

test("Create list bad request body", async () => {
  const params = {
    userId: "6591af48bf1ffc0ca2334e66",
  };
  const request = {
    json: () => ({
      members: ["655d3ae9c60794183a98ea9a"],
    }),
  };

  const desiredResponse = {
    message: "ShoppingList validation failed: name: Name is required.",
    statusCode: 400,
    name: "ValidationError",
    parameters: {
      name: {
        name: "ValidatorError",
        message: "Name is required.",
        properties: {
          message: "Name is required.",
          path: "name",
          type: "required",
        },
        kind: "required",
        path: "name",
      },
    },
  };

  return POST(request, { params: params }).then(async (data) => {
    data = await data.json();
    console.log(data);
    expect(data).toMatchObject(desiredResponse);

  });
});
