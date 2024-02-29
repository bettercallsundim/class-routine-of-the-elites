import chromium from "@sparticuz/chromium";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import puppeteer from "puppeteer-core";
// import puppeteer from "puppeteer";
import { userModel as User } from "../schemas/User.model.js";
dotenv.config();
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
  const { email, routine } = req.body;
  console.log("ny id:; ", req.body);
  try {
    const resd = await User.findOneAndUpdate({ email }, { routine });
    return res.json({ status: true, message: "routine saved" });
  } catch (error) {
    console.log("Error while loggin in", error);
    return res.json({ status: false, message: "routine saving failed" });
  }
});
//get a user
app.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const resd = await User.findOne({ email });
    if (resd)
      return res.json({ status: true, user: resd, message: "user fetched" });
  } catch (error) {
    console.log("user fetch failed", error);
    return res.json({ status: false, message: "user fetch failed" });
  }
});
//download a user
app.post("/download", async (req, res) => {
  const { email } = req.body;
  try {
    console.log("email", email);
    // const browser = await puppeteer.launch({ headless: false });
    // const browser = await startBrowser();
    // let chrome = {};
    // let browser = await puppeteer.launch({
    //   args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
    //   defaultViewport: chrome?.defaultViewport,
    //   executablePath: await chrome.executablePath,
    //   headless: true,
    //   ignoreHTTPSErrors: true,
    // });
    // const browser = await chromium.puppeteer.launch({
    //   args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath,
    //   headless: true,
    //   ignoreHTTPSErrors: true,
    // });
    async function delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time);
      });
    }
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 800 });

    await page.evaluateOnNewDocument((token) => {
      localStorage.clear();
      localStorage.setItem("email", token);
    }, email);
    // await delay(1500);

    await page.goto(`${process.env.FRONTEND}/routine-page`, {
      waitUntil: "load",
    });

    await page.waitForSelector(".trtr");
    //okay
    // await page.screenshot({
    //   path: "screenshots/screenshot1.jpg",
    // });
    // await page.screenshot({
    //   path: "screenshots/screenshot1.jpg",
    // });
    await page.screenshot().then((screenshot) => {
      return res.send(screenshot);
    });
    // await browser.close();
  } catch (error) {
    console.log("download fetch failed", error);
    return res.json({ status: false, message: "download fetch failed" });
  }
});
export { app };
