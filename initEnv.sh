#!/bin/bash
INDEXPATH=$(cd $(dirname $0); pwd)
filename=~/.bash_profile
echo "export PATH=/Users/licongjin/Desktop/custom-script/:\$PATH" >> $filename
source $filename
cat $filename