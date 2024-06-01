import { Browser, Page } from "playwright";

// @ts-ignore
import fs from 'fs';
// @ts-ignore
import toml from 'toml';
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));

declare global {
    const page: Page;
    const browser: Browser;
    const browserName: string;
}

export default {
    PRODUCT_STORE_URL: config.product_store_url ?? '',
    OPENCART_URL: config.opencart_url ?? '',
};