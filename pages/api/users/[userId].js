import { connectDBFromApi } from "DB/dbConnect";
import nc from "next-connect";
// Controllers
import { deleteUser, getUser, updateUser } from "DB/Controllers/UserController";
import upload from "DB/Middlewares/upload";


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const handler = nc({
  onNoMatch: (req, res) => {
    res.status(404).end("API is not found");
  },
});

// get  single type
handler.get(async (req, res) => {
  let { userId } = req.query;

  const user = await getUser(userId);

  if (user) {
    res.status(200).json({ body: { user: user[0] } });
    return;
  }
  res.status(404).end("User not found");
});





handler.use(upload.single("file"));

// update user route
handler.put(async (req, res) => {

  let { userId } = req.query;
  // console.log("req.file", req.file);
  // return console.log("req.body", req.body);

  const updatedUser = await updateUser(userId, req.body);

  if (updatedUser) {
    res.status(200).json({ body: { updatedUser } });
    return;
  }
  return res.status(404).end("User not found");
});














// delete user route
handler.delete(async (req, res) => {
  let { userId } = req.query;

  const deletedUser = await deleteUser(userId);

  if (deletedUser) {
    res.status(200).json({ body: { deletedUser } });
    return;
  }
  res.status(404).end("User not found");
});

export default connectDBFromApi(handler);
