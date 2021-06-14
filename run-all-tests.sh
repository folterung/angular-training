#!/bin/bash

function printTestLine {
  printf "\nRunning tests for $1\n";
}

function runStepTests {
  printTestLine $1
  ng test $1 --watch=false --browsers=ChromeHeadless
}

runStepTests final-solution

runStepTests step1-answer
runStepTests step1-solution

runStepTests step2-answer
runStepTests step2-solution
