const { execSync } = require('child_process');
const { error, log } = require('console');
const { join } = require('path');

const yellow ='\x1b[33m';
const red = '\x1b[31m';
const resetColor = '\x1b[0m';
const firstStep = process.argv[2];
const secondStep = process.argv[3];

console.log(firstStep, secondStep);

if (!firstStep || !secondStep) {
    log(`${yellow}Must provide ${red}two${yellow} step names, please provide both step names and try again.${resetColor}`);
    process.exit(0);
}

try {
    const mockServerPath = join(__dirname, '..', 'mock-api', 'server.js');

    execSync(`npx concurrently --kill-others \\"node ${mockServerPath}\\" \\"npx ng serve ${firstStep}\\" \\"npx ng serve ${secondStep} --port=4300\\"`, {stdio: 'inherit'});
} catch (err) {
    error(err);
}
