import { connectDBFromApi } from "DB/dbConnect";
import nc from "next-connect";
// Controllers
import { createUser, getAllUsers } from "DB/Controllers/UserController";

const handler = nc({
  onNoMatch: (req, res) => {
    res.status(404).end("API is not found");
  },
});

handler.get(async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json({ body: { users } });
});

handler.post(async (req, res) => {
  const newUser = await createUser(req.body);
  res.status(200).json({ body: { newUser } });
});

export default connectDBFromApi(handler);
