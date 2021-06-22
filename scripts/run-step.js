const { execSync } = require('child_process');
const { error, log } = require('console');
const { join } = require('path');

const yellow ='\x1b[33m';
const red = '\x1b[31m';
const resetColor = '\x1b[0m';
const stepName = process.argv[2];

if (!stepName) {
    log(`${yellow}No ${red}step name${yellow} provided, please provide a step name and try again.${resetColor}`);
    process.exit(0);
}

try {
    const mockServerPath = join(__dirname, '..', 'mock-api', 'server.js');

    execSync(`npx concurrently --kill-others \\"node ${mockServerPath}\\" \\"npx ng serve ${stepName}\\"`, {stdio: 'inherit'});
} catch (err) {
    error(err);
}
