#!/bin/bash
INDEXPATH=$(cd $(dirname $0); pwd)
filename=~/.bash_profile
text='export PATH='$INDEXPATH'/:$PATH'
echo $text >> $filename
source $filename
cat $filename