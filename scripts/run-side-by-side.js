const { execSync } = require('child_process');
const { error, log } = require('console');
const { join } = require('path');
const { platform } = require('os');
const { cmdStrToOSCmd } = require(join(__dirname, 'helpers.js'));

const yellow ='\x1b[33m';
const red = '\x1b[31m';
const resetColor = '\x1b[0m';
const firstStep = process.argv[2];
const secondStep = process.argv[3];

if (!firstStep || !secondStep) {
    log(`${yellow}Must provide ${red}two${yellow} step names, please provide both step names and try again.${resetColor}`);
    process.exit(0);
}

try {
    const mockServerPath = join(__dirname, '..', 'mock-api', 'server.js');
    const startMockServerCmd = cmdStrToOSCmd(`node ${mockServerPath}`);
    const serveStep1Cmd = cmdStrToOSCmd(`npx ng serve ${firstStep}`);
    const serveStep2Cmd = cmdStrToOSCmd(`npx ng serve ${secondStep} --port=4300`);

    execSync(`npx concurrently --kill-others ${startMockServerCmd} ${serveStep1Cmd} ${serveStep2Cmd}`, {stdio: 'inherit'});
} catch (err) {
    error(err);
}
