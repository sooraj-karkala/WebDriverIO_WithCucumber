class Homepage {

    //Locators
    get loginbutton() { return $('(//*[contains(text(), "Log in")])[1]');}
    get registerbutton() { return $('//a[@href="/register?returnUrl=%2F"]');}

    //Methods
    async clickloginbutton() {
        console.log('Clicking on the login button');
        (await this.loginbutton).waitForDisplayed();
        (await this.loginbutton).click();
        console.log('Clicked on the login button');
    }

    async clickregisterbutton() {
        console.log('Clicking on the register button');
        (await this.registerbutton).waitForDisplayed();
        (await this.registerbutton).click();
        console.log('Clicked on the register button');
    }

    async clickbutton(button: 'Login'|'Register')
    {
        if (button == 'Login')
        {
            await this.clickloginbutton();
        }
        else if(button === 'Register')
        {
            await this.clickregisterbutton();
        }
        else
        {
            console.log('Invalid button type');
        }
    }
}
export default new Homepage()