class RegisterPage {

    //locators
    get genderinput() { return (gender: string) => $(`//*[contains(text(), "${gender}")]`)}
    get firstnameinput() {return $('#FirstName');}
    get lastnameinput() { return $('#LastName');}
    get daydropdowninput() { return $('[name="DateOfBirthDay"]');}
    get monthdropdowninput() { return $('[name="DateOfBirthMonth"]');}
    get yeardropdowninput() { return $('[name="DateOfBirthYear"]');}
    get emailinput() { return $('#Email');}
    get passwordinput() { return $('input[id=Password]');}
    get confirmpasswordinput() { return $('#ConfirmPassword');}
    get registerbutton() { return $('(//*[@type="submit"])[2]');}

    //Methods
    async registernewuser(gender:string, firstname:string, lastname:string, day:number, month:string, year:string, email:string, password:string) {
        await this.genderinput(gender).click();
        (await this.firstnameinput).setValue(firstname);
        (await this.lastnameinput).setValue(lastname);
        (await this.daydropdowninput).selectByIndex(day);
        (await this.monthdropdowninput).selectByVisibleText(month);
        (await this.yeardropdowninput).selectByAttribute('value', year);
        (await this.emailinput).setValue(email);
        (await this.passwordinput).setValue(password);
        (await this.confirmpasswordinput).setValue(password);
        (await this.registerbutton).isEnabled();
        (await this.registerbutton).click();
    }

}
export default new RegisterPage()
