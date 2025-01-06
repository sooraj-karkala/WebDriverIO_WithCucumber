import { Given, Then, When } from '@wdio/cucumber-framework';
import supertest from 'supertest';
import { API_APP_URL } from '../../src/Config/API_URL';
import { APICalls } from '../../src/Enum/APICalls';
import apitesting from '../../src/pageobjects/API_Users_page';
import Homepage from '../../src/pageobjects/HomePage';
import LoginPage from '../../src/pageobjects/LoginPage';
import RegisterPage from '../../src/pageobjects/RegisterPage';
import { verifypagetitlecontains, verifytextdisplayed } from '../../src/utils/helpers'; //importing function from utility

// const request = supertest(API_BASE_URL);

let response: supertest.Response;

let ui_responce: any;
let ui_status: any;

Given(/^I launch the application using url (.+)$/, async (url:string) => {
    await browser.url(url);
    await browser.maximizeWindow();
});

Then(/^I verify the page title to contain the text (.+)$/, async (title:string) => {
    await verifypagetitlecontains(title); //function id used from utility
});

When(/^I click on (Login|Register) button$/, async (button: 'Login'|'Register') => {
    await Homepage.clickbutton(button);
});

When(/^I login with (.+) and (.+)$/, async (username:string, password:string) => {
    await LoginPage.login(username, password);
});

When(/^I register with gender (.+) firstname (.+) lastname (.+) day (.+) month (.+) year (.+) email (.+) and password (.+)$/, async(gender:string, firstname:string, lastname:string, day:number, month:string, year:string, email:string, password:string) => {
    await RegisterPage.registernewuser(gender, firstname, lastname, day, month, year, email, password)
});

Then(/^I verify the text (.+) is displayed in the screen$/, async(text) => {
    await verifytextdisplayed(text); //function is from utility
});

When(/^I wait until the text (.+) is displayed$/, async(text) => {
    const element = await $(`//*[contains(text(), "${text}")]`)
    await element.waitForDisplayed({timeout:6000});
});

When(/^I logout from the current page$/, async() => {
    const logout = await $('//*[contains(text(), "Log out")]');
    await logout.waitForDisplayed();
    await logout.click();
});

Given(/^I launch the API application$/, async()=> {
    await apitesting.launchapplication(API_APP_URL);
});

When(/^I send UI (.+) request to endpoint (.+)$/, async(type:APICalls, endpoint:string) => {
    
    switch(type.toLowerCase())
    {
        case 'get':
            await apitesting.selectmethod(type);
            await apitesting.enterAPIurl(endpoint);
            await apitesting.clickajaxbutton();
            break;
        case 'post':
            await apitesting.selectmethod(type);
            await apitesting.enterAPIurl(endpoint);
            await apitesting.clickaddparameter();
            await apitesting.enter_first_parameter("name", "sooraj");
            await apitesting.clickaddparameter();
            await apitesting.enter_second_parameter("role", "king");
            await apitesting.clickajaxbutton();
            break;
        default:
            throw new Error(`Entered method ${type} is not a valid Method type`);
    }
});

// When(/^I send API (GET|POST) request to endpoint (.+)(?:with datatable)$/, async(type: APICalls, endpoint: string, dataTable: DataTable)=> {
    
//     switch(type.toLowerCase())
//     {
//         case 'get':
//             console.log(`Performing ${type} operation using SuperTest`);
//             response = await request.get(endpoint);
//             console.log(`${type} operation completed successfully`);
//             break;
//         case 'post':
//             if(!dataTable){
//                 throw new Error("DataTable is required for POST requests");
//             }

//             const data = dataTable.rowsHash();    //dataTable contains the structured data passed from the feature file. |  dataTable.rowsHash() converts the data table into a JavaScript object where the first column values become keys and the second column values become values of the object.
            
//             console.log(`Performing ${type} operation using SuperTest`);
//             response = await request.post(endpoint).send(data);    // Send the data as the request body
//             console.log(`${type} operation completed successfully`);
//             break;
//         default:
//             throw new Error(`Entered method ${type} is not a valid Method type`);
//     }
// });

Then(/^I verify the UI responce status (.+) is displayed$/, async(status:String)=> {
    ui_status = await apitesting.responcestatus();
    expect(ui_status).toContain(status);
    console.log(`Responce status contains ${status} status code`);
});

Then(/^I verify the UI responce output is displayed$/, async() => {
    ui_responce = await apitesting.obtainoutputtext();
    console.log('Responce Obatined: - '+ ui_responce);
});

Then(/^I verify the UI responce is equal to API responce for GET request$/, async() => {
    expect(ui_status).toContain(await response.statusCode.toString());
    //expect(ui_status).toHaveValue(response.statusCode.);
    expect(await JSON.parse(ui_responce)).toEqual(response.body);  //api_responce is in JSON format hence convert string to JSON
    console.log('UI responce is equal to API responce')
});

Then(/^I verify the UI responce is equal to API responce for POST request$/, async() => {
    expect(ui_status).toContain(await response.statusCode.toString());
    expect(JSON.parse(ui_responce).name).toEqual(response.body.name);
    expect(JSON.parse(ui_responce).role).toEqual(response.body.role);
    console.log('UI responce is equal to API responce')
});