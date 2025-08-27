import puppeteer from "puppeteer";
import {PDFDocument} from "pdf-lib";
import * as fs from "fs";


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.emulateMediaType('print');
    await page.goto('http://localhost:3000/resume', { waitUntil: 'networkidle0' });
    await page.evaluate(async () => {
        const selectors = Array.from(document.querySelectorAll("img"));
        await Promise.all(selectors.map(img => {
            if (img.complete) return;
            return new Promise((resolve, reject) => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', reject);
            });
        }));
    })

    await page.pdf({
        waitForFonts: true,
        path: './public/[RESUME] DUPAS Jeremie.pdf',
        format: 'a4',
    });

    await browser.close()
})()