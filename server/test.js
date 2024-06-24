import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import cloudinary from "cloudinary";
import fileupload from "express-fileupload";
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: "aaaa",
  api_key: "aaaa",
  api_secret: "aaaa",
});

const uri =
  "mongodb+srv://vprime:vprime5@vprime.qleekyr.mongodb.net/Vprime?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log(res);

    // Upload endpoint
    app.post("/uploadpic", upload.single("image"), (req, res) => {
      const file = req.files;
      console.log(file);
      // Upload the file to Cloudinary
      // cloudinary.v2.uploader.upload(
      //   file.path,
      //   { folder: "vprime_pro_pics" }, // Optional folder in Cloudinary
      //   (error, result) => {
      //     if (error) {
      //       console.error(error);
      //       return res.status(500).json({ error: "Upload failed" });
      //     }

      //     // Return the uploaded image URL
      //     res.json({ imageUrl: result.secure_url });
      //   }
      // );
    });

    app.post("/editProfile", async (req, res) => {
      console.log(req.body);
      const { userid, name, bio } = req.body.info;
    });
    app.get("/", (req, res) => {
      res.send("Connected to MongoDB Atlas");
    });

    app.listen(3000, () => {
      console.log("Express server listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("error occurred");
  });
