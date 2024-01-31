import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { userModel as User } from "../schemas/User.model.js";
import { startBrowser } from "../utils/puppeteer.js";
const app = express.Router();
//user signup
app.post("/signup", async (req, res) => {
  const { name, email, picture } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("🚀 ~ app.post ~ user:", user);

    if (!user) {
      user = await User.create({
        name,
        email,
        picture,
      });
      await user
        .save()
        .then((resp) => {
          console.log("User created", resp);
          const token = jwt.sign({ email }, process.env.JWT_SECRET);
          return res.json({ status: true, token });
        })
        .catch((err) => {
          console.log(err);
          return res.json({ status: false });
        });
    } else {
      console.log("User alredy registered");
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res.json({ status: true, token });
    }
  } catch (error) {
    console.log("Error while registering user");
    return res.json({ status: false });
  }
});
//user login
app.post("/login", async (req, res) => {
  const { roll, pass } = req.body;

  try {
    const id = parseInt(roll);
    const resd = await User.findOne({ id });
    if (resd) {
      const hashed = await bcrypt.compare(pass, resd.pass);
      if (hashed) {
        console.log("User Authenticated");
        return res.json({ status: true });
      } else {
        console.log("User Authentication failed");
        return res.json({ status: false });
      }
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.log("Error while loggin in", error);
  }
});
//save routine
app.post("/saveRoutine", async (req, res) => {
  const { roll: user, routine } = req.body;
  console.log("ny id:; ", req.body);
  try {
    const id = parseInt(user);

    const resd = await User.findOneAndUpdate({ id }, { routine });
    return res.json({ status: true, message: "routine saved" });
  } catch (error) {
    console.log("Error while loggin in", error);
    return res.json({ status: false, message: "routine saving failed" });
  }
});
//get a user
app.get("/:id", async (req, res) => {
  const { id: user } = req.params;
  try {
    const id = parseInt(user);
    const resd = await User.findOne({ id });
    return res.json({ status: true, user: resd, message: "user fetched" });
  } catch (error) {
    console.log("user fetch failed", error);
    return res.json({ status: false, message: "user fetch failed" });
  }
});
//download a user
app.post("/download", async (req, res) => {
  const { token: tokenize } = req.body;
  try {
    // const browser = await puppeteer.launch();
    const browser = await startBrowser();

    const page = await browser.newPage();
    await page.evaluateOnNewDocument((token) => {
      localStorage.clear();
      localStorage.setItem("user", token);
    }, tokenize);
    await page.goto("http://localhost:5173/routine", { waitUntil: "load" });
    // await page.screenshot({
    //   path: "screenshots/screenshot1.jpg",
    // });
    const screenshot = await page.screenshot({
      encoding: "base64",
    });

    return res.json({
      status: true,
      message: "download fetched",
      data: screenshot,
    });
  } catch (error) {
    console.log("download fetch failed", error);
    return res.json({ status: false, message: "download fetch failed" });
  }
});
export { app };
