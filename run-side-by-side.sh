#!/bin/bash

npx concurrently --kill-others \\"node ./mock-api/server.js\\" \\"npx ng serve $1\\" \\"npx ng serve $2 --port=4300\\"