#!/usr/bin/env bash

# DIR="$(dirname $( cd "$( dirname "$0" )" && pwd ) )"
# echo 

WORKSPACE=$(dirname $(readlink -f "$0") || (cd "$(dirname "$0")";pwd))
echo $( dirname "$0" )
