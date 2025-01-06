import { APICalls } from '../../src/Enum/APICalls';
import { API_BASE_URL } from "../Config/API_URL";

class apitesting {

    //locators
    get endpoint_url_textbox() { return $('#urlvalue');}
    get method() { return $('httpmethod');}
    get ajax_request_button() { return $('#submitajax');}
    get susccessfull_message() { return $('//*[@class="alert-success"]');}
    get output_responce() { return $('#outputpre');}

    get method_dropdown() { return $('#httpmethod');}
    get add_param_button() { return $('#addprambutton');}
    get param_name1() { return $('(//*[@id="allparameters"]//child::*[contains(@class, "fakeinputname")])[1]');}
    get param_value1() { return $('(//*[@id="allparameters"]//child::*[contains(@class, "realinputvalue")])[1]');}
    get param_name2() { return $('(//*[@id="allparameters"]//child::*[contains(@class, "fakeinputname")])[2]');}
    get param_value2() { return $('(//*[@id="allparameters"]//child::*[contains(@class, "realinputvalue")])[2]');}

    //Methods

    async launchapplication(apiurl:string): Promise<void> {
        console.log("Opening the application");
        await browser.url(apiurl);
        await browser.maximizeWindow();
        console.log("Application launched successfully");
    }

    async enterAPIurl(endpoint:string): Promise<void>{
        console.log("Entering api url in the textbox");
        (await this.endpoint_url_textbox).clearValue();
        await this.endpoint_url_textbox.setValue(API_BASE_URL+endpoint);
        console.log("Entered API url successfully");
    }

    async clickajaxbutton(): Promise<void>{
        console.log("Clicking on Ajax Request");
        (await this.ajax_request_button).click();
        console.log("Clicked on Ajax Request button");
    }

    async responcestatus(): Promise<String> {
        console.log('Getting the responce');
        (await this.susccessfull_message).waitForDisplayed();
        return (await this.susccessfull_message).getText();
    }

    async obtainoutputtext(): Promise<String> {
        console.log("Obtaining the output");
        (await this.output_responce).waitForDisplayed();
        return (await this.output_responce).getText();
    }

    async selectmethod(method:APICalls): Promise<void> {
        console.log(`Selecting the ${method} method from the dropdown`);
        (await this.method_dropdown).waitForDisplayed();
        (await this.method_dropdown).selectByVisibleText(method);
        console.log(`Selected the visible text ${method}`);
    }

    async clickaddparameter(): Promise<void>{
        (await this.add_param_button).waitForDisplayed();
        (await this.add_param_button).click();
        console.log('Clicked on add parameter button');
    }

    async enter_first_parameter(name:string, value:string): Promise<void>{
        console.log('Entering the first parameter');
        (await this.param_name1).isEnabled();
        (await this.param_value1).isEnabled();
        (await this.param_name1).setValue(name);
        (await this.param_value1).setValue(value);
        console.log('Entered first parameters successfully');
    }

    async enter_second_parameter(name:string, value:string): Promise<void>{
        console.log('Entering the second parameter');
        (await this.param_name2).isEnabled();
        (await this.param_value2).isEnabled();
        (await this.param_name2).setValue(name);
        (await this.param_value2).setValue(value);
        console.log('Entered second parameters successfully');
    }


}
export default new apitesting();