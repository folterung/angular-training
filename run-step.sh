#!/bin/bash

# Required to run any step and leverage concurrently + ng serve.
concurrently --kill-others "node ./mock-api/server.js" "ng serve $1"
