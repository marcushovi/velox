import { PUT } from "../app/api/users/[userId]/shopping-lists/[listId]/route";

test("Update list", async () => {
  const params = {
    userId: "6591af48bf1ffc0ca2334e66",
    listId: "6591b68bb18c4b5e38ac9702",
  };

  const request = {
    json: () => ({
      name: "TEST EDIT",
      members: [],
    }),
  };

  return PUT(request, { params: params }).then(async (data) => {
    data = await data.json();
    console.log(data);
    expect(data).toHaveProperty("sys.rev");
    expect(data.sys.rev).toBeGreaterThan(0);
    expect(data).toHaveProperty("_id");
    expect(data).toHaveProperty("owner");
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("archived");
    expect(data).toHaveProperty("members");
    expect(data).toHaveProperty("items");

    const requestBack = {
      json: () => ({
        name: "TEST",
        members: ["655d3ae9c60794183a98ea9a"],
      }),
    };

    PUT(requestBack, { params: params });
  });
});

test("Update list missing userId", async () => {
  const params = {
    listId: "6591b68bb18c4b5e38ac9702",
  };

  const request = {
    json: () => ({
      members: [],
    }),
  };
  const desiredResponse = {
    message: "User was not found",
    name: "NotFound",
    parameters: {},
    statusCode: 404,
  };

  return PUT(request, { params: params }).then(async (data) => {
    data = await data.json();
    console.log(data);
    expect(data).toMatchObject(desiredResponse);

    const requestBack = {
      json: () => ({
        name: "TEST",
        members: ["655d3ae9c60794183a98ea9a"],
      }),
    };

    PUT(requestBack, { params: params });
  });
});
