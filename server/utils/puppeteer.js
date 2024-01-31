import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
export async function startBrowser() {
  return puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
}
