import upload from "DB/Middlewares/upload";
import nc from "next-connect";
// Controllers


export const config = {
    api: {
        bodyParser: false,
    },
};


const handler = nc({
    onNoMatch: (req, res) => {
        res.status(404).end("API is not found");
    },
});


handler.use(upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }]));
// handler.use(upload.fields([{ name: 'avatar', maxCount: 1 }]));

// update user route
handler.put(async (req, res) => {

    // console.log(" files", req.files);
    // console.log("req.avatar", req.files.avatar);
    // console.log("req.cover", req.files.cover);

    return res.status(200).json(req.files);
});





export default handler;
