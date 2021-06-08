#!/bin/bash

function printTestLine {
  echo "Running tests for $1";
}

printTestLine final-solution
ng test final-solution --watch=false

printTestLine step1-answer
ng test step1-answer --watch=false
printTestLine step1-solution
ng test step1-solution --watch=false

printTestLine step2-answer
ng test step2-answer --watch=false
printTestLine step2-solution
ng test step2-solution --watch=false
