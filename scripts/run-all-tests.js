const { execSync } = require('child_process');
const { error, log } = require('console');

const yellow ='\x1b[33m';
const green='\x1b[32m';
const red = '\x1b[31m';
const resetColor = '\x1b[0m';
const stepNames = [
    'final-solution',
    'step1-exercise',
    'step1-solution',
    'step2-exercise',
    'step2-solution',
    'step3-exercise',
    'step3-solution'
];

let testReport = '\nTest Report:\n';

for (let i = 0; i < stepNames.length; i++) {
    const stepName = stepNames[i];
    
    log(`${yellow}\nRunning tests for: ${stepName}${resetColor}\n`);

    try {
        execSync(`npx ng test ${stepName} --watch=false`, {stdio: 'inherit'});

        testReport = `${testReport}${green}- All tests passed for "${stepName}".${resetColor}\n`;

    } catch (err) {
        testReport = `${testReport}${red}- Failure when running tests for "${stepName}".${resetColor}\n`;
        error(err);
    }
}

log(testReport);
