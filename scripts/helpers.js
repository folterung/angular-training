const { platform } = require('os');

module.exports.cmdStrToOSCmd = function cmdStrToOSCmd(cmdStr) {
  return platform() === 'win32' ? `\\"${cmdStr}\\"` : `"${cmdStr}"`;
}
