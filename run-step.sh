#!/bin/bash

# Required to run any step and leverage concurrently + ng serve.
npx concurrently --kill-others \\"node ./mock-api/server.js\\" \\"npx ng serve $1\\"
