import { browser } from '@wdio/globals';

export default class Page {
    
    async open (path: string)
    {
        await browser.url(path);
        await browser.maximizeWindow();
    }
}
