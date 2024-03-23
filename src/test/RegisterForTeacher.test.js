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

test('register', async () => {
	jest.setTimeout(100000);
	// Navigate to the login page
	await driver.get('http://localhost:3000/');
    /// find button register
    const registerButton = await driver.findElement(By.css('.register-topbar'));
    await registerButton.click();

    // sleep 5s
    await driver.sleep(5000);
    /// find button register for student
    const registerForStudentButton = await driver.findElement(By.css('.card-led-register:nth-child(1) span'));

    registerForStudentButton.click();
    // sleep 5s
    await driver.sleep(5000);
	// Find the email and password input fields, and the submit button
	const emailField = await driver.findElement(By.id('register_email'));
    emailField.sendKeys(randomUUID() + '@gmail.com');
	const passwordField = await driver.findElement(By.id('register_password'));
    passwordField.sendKeys('123456789');
    const confirmPasswordField = await driver.findElement(By.id('register_confirm'));
    confirmPasswordField.sendKeys('123456789');
    
  
    
	const submitButton = await driver.findElement(By.css('.button-register > span'));

	
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
