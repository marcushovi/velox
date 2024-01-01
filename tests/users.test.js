import { GET } from "../app/api/users/route";

test("Get all users", async () => {
  return GET().then(async (data) => {
    data = await data.json();
    expect(data);
  });
});
