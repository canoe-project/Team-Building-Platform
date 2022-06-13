import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs";
import { resolve } from "path";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});

const app = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

var upload = multer({ storage: storage });
app.use(upload.array("file"), function async(req, res) {
  var filename = req.files[0].filename;
  var oldPath = `./public/temp/${filename}`;
  var newPath = `./public/${req.query.path.join("/")}/${filename}`;

  fs.rename(oldPath, newPath, function (err) {
    if (err) throw err;
    return res.json(newPath);
    resolve();
  });
});

export default app;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
