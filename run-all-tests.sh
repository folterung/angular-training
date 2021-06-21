#!/bin/bash

yellow="\\x1b[33m"
green="\\x1b[32m"
red="\\x1b[31m"
resetColor="\\x1b[0m"
testReport="\\nTest Report:\\n"

function printTestLine {
  echo -e "$yellow\\nRunning tests for $1\\n$resetColor";
}

function runStepTests {
  printTestLine $1
  npx ng test $1 --watch=false
}

function buildTestReport {
  if runStepTests $1; then
    testReport="$testReport$green- All tests passed for $1.$resetColor\\n";
  else
    testReport="$testReport$red- Failure when running tests for $1.$resetColor\\n";
  fi
}

buildTestReport final-solution

buildTestReport step1-exercise
buildTestReport step1-solution

buildTestReport step2-exercise
buildTestReport step2-solution

buildTestReport step3-exercise
buildTestReport step3-solution

echo -e "$testReport"