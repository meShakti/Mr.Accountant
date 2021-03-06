const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const fs = require("fs");
const { exec } = require("child_process");

const performLighthouseTests = async () => {
	const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
	const options = { output: "html", port: chrome.port };
	const testResult = await lighthouse("https://lets-shop-4.herokuapp.com", options);
	const { report } = testResult;
	fs.writeFileSync("./public/report.html", report);
	await chrome.kill();
};

(async () => {
	const childProcess = await exec("serve -s build");
	await performLighthouseTests();
	childProcess.kill();
})();
