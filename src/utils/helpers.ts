//Creating utility class for repeated task

import { expect } from '@wdio/globals';

export const verifypagetitlecontains = async (text:string): Promise<void> => {      //This is how you have to write function in utility class //return type is written as Promise<void>
    
    //However, toHaveTextContaining is not directly applicable to the browser.getTitle() result because it’s used for element text.
    //await expect(browser).toHaveTitleContaining(title); -> throws deprecation warning
    await expect(browser).toHaveTitle(expect.stringContaining(text)); //expect.stringContaining method to check if the title includes the provided text.
    console.log(`title of the page is: ${await browser.getTitle()}`);
};

export const verifytextdisplayed = async (text:Promise<string>) => {
    const successMessage = await $(`//*[contains(text(), "${text}")]`);
    //await successMessage.waitForDisplayed({timeout:5000});
    const messageText = await successMessage.getText();
    expect(messageText).toContain(text);
};

export const clickonelement = async (element:string) => {
    (await $(element)).waitForDisplayed();
    (await $(element)).click();
    console.log(`clicked on element ${element}`);
}

//npx wdio wdio.conf.js --spec ./test/features/login.feature