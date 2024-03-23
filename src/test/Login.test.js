const { Builder, By, Key } = require('selenium-webdriver');
const { beforeAll, afterAll, test, afterEach } = require('@jest/globals');
const { randomUUID } = require('crypto');
jest.setTimeout(100000); // timeout toàn cục

let driver;

beforeAll(async () => {
	driver = await new Builder().forBrowser('chrome').build();
});

afterAll(async () => {
	await driver.quit();
});

test('login', async () => {
	jest.setTimeout(100000);
	// Navigate to the login page
	await driver.get('http://localhost:3000/login');

	// Find the email and password input fields, and the submit button
	const emailField = await driver.findElement(By.id('basic_email'));
	const passwordField = await driver.findElement(By.id('basic_password'));
	const submitButton = await driver.findElement(By.css('div:nth-child(1) > .ant-btn > span'));

	// Enter the email and password, and click the submit button
	await emailField.sendKeys('20110614@student.hcmute.edu.vn');
	await passwordField.sendKeys('123456789');
	await submitButton.click();
	//dừng 5s để load dữ liệu
	await driver.sleep(5000);

	
	// const ok= await driver.findElement(By.css('.avatar-topbar > .ant-avatar'));
	// await ok.click();
	/// chờ load xong

	await driver.sleep(5000);
	// chụp màn hình
	await driver.takeScreenshot().then(function (image, err) {
		require('fs').writeFile('login.png', image, 'base64', function (err) {
			console.log(err);
		});
	});
});
