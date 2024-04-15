import puppeteer from "puppeteer";
import { base64ArrayBuffer } from "./base64ArrayBufferutf8";

export const generatePdf = async (pdfFileAsString: string) => {
  const data = {};
  const html = `<div>hello</div>`;

  const browser = await puppeteer.launch()
  const page = await browser.newPage();
  // Add page margin

  await page.evaluate(() => {
    const style = document.createElement("style");
    style.textContent = `
      @page {
        size: A4 landscape;
        margin: 2rem;
        padding-top: 2rem; /* Add top padding between pages */
        padding-bottom: 2rem; /* Add bottom padding between pages */
      }
      body {
        margin: 2rem;
      }
    `;
    document.head.appendChild(style);
  });

  await page.setContent(pdfFileAsString);
  const buffer = (await page.pdf({ printBackground: true })).buffer;
  // console.log(buffer);
  await browser.close();

  const base64 = base64ArrayBuffer(buffer)

  return base64
};