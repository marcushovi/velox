import { POST } from "../app/api/users/[userId]/shopping-lists/route";
import { DELETE } from "../app/api/users/[userId]/shopping-lists/[listId]/route";

test("Delete list", async () => {
  const request = {
    json: () => ({
      name: "TEST",
      members: ["655d3ae9c60794183a98ea9a"],
    }),
  };
  const params = {
    userId: "6591af48bf1ffc0ca2334e66",
  };

  const desiredResponse = {
    message: "User was not found",
    statusCode: 404,
    name: "NotFound",
    parameters: {},
  };

  return POST(request, { params: params }).then(async (data) => {
    data = await data.json();
    const paramsDelete = {
      userId: "6591af48bf1ffc0ca2334e66",
      listId: data._id,
    };

    return DELETE({}, { params: paramsDelete }).then(async (data) => {
      data = await data.json();
      console.log(data);
      expect(data).toHaveProperty("sys");
      expect(data).toHaveProperty("_id");
      expect(data).toHaveProperty("owner");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("archived");
      expect(data).toHaveProperty("members");
      expect(data).toHaveProperty("items");
    });
  });
});

test("Delete list missing userId", async () => {
  const request = {
    json: () => ({
      name: "TEST",
      members: ["655d3ae9c60794183a98ea9a"],
    }),
  };
  const params = {
    userId: "6591af48bf1ffc0ca2334e66",
  };
  const desiredResponse = {
    message: "User was not found",
    statusCode: 404,
    name: "NotFound",
    parameters: {},
  };

  return POST(request, { params: params }).then(async (data) => {
    data = await data.json();
    const paramsDelete = {
      listId: data._id,
    };

    return DELETE({}, { params: paramsDelete }).then(async (res) => {
      res = await res.json();
      console.log(res);
      expect(res).toMatchObject(desiredResponse);
    });
  });
});
