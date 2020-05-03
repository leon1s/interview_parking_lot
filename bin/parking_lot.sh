#!/bin/bash

eval file="${1:-/dev/stdin}"
echo "$file"
node src/index.js $file


