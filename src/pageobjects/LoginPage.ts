class LoginPage {

    //Locators
    //We will create getter method for all element locators

    get emailinput() { return $('.email');}    //. for class
    get passwordinput() { return $('#Password');}  //# for id
    get submitbutton() { return $('(//button[@type="submit"])[2]');}


    //Methods
    async login(email:string, password:string)
    {
        (await this.emailinput).setValue(email);
        (await this.passwordinput).setValue(password);
        (await this.submitbutton).isEnabled();
        await  this.submitbutton.click();
    }

}
export default new LoginPage()