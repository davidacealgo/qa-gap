/* eslint-disable no-undef */
var {defineSupportCode, setDefaultTimeout} = require('cucumber');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var createUserPage = require('./createUserPage.js');
var homePage = require('../homePage/homePage.js');
var loginPage = require('../login/loginPage.js');

chai.use(chaiAsPromised);
var expect = chai.expect;
setDefaultTimeout(60 * 1000);

defineSupportCode(function({Given, When, Then}) {

    Given('I launch {string}', async (string) => {
        await loginPage.get(string);
    });
    
    Given('I enter {string} and {string}', async (email, pwd) => {
        await loginPage.setCredentials(email, pwd);
    });
    
    Given('I click on login button', async () => {
        await loginPage.clickSignInButton();
    });

    Given('I am on homepage', async () => {
        expect (homePage.isHomePage()).to.eventually.equal('https://vacations-management.herokuapp.com/');
    });

    When('I go to create user', async () => {
        await homePage.openCreateUser();
    });

    When('I create a user with {string} and {string} and {string} and {string} and {string}', async (firstName, lastName, email, identification, leaderName) => {
        await createUserPage.fillFormNewEmployee(firstName, lastName, email, identification, leaderName);
    });

    When('I select start working in {string} and {string} and {string}', async (day, month, year) => {
        await createUserPage.setDateEmployee(day, month, year);
    });

    When('I click create Employee button', async () => {
        await createUserPage.clickEmployeeButton();
    });

    Then('user is created', async() => {
        expect (createUserPage.userCreated()).to.eventually.equal(true);
    });
    
});