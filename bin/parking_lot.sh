#!/bin/bash

eval file="${1:-/dev/stdin}"
node ./../parking_lot/index.js $file


