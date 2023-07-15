#!/bin/bash

echo "before install"

sudo chmod  755 -R '$1Temp'

if [ -d '$1' ]; then
    echo 'Take action if $1 exists' 
    sudo chmod  755 -R '$1'
else
    sudo mkdir '$1'
    sudo chmod  755 -R '$1'
fi

if [ -d '$1Backup' ]; then
    echo 'Take action if $1Backup exists' 
    sudo chmod  755 -R '$1Backup'
    echo 'rollback ready in $1Backup...'
else
    sudo mkdir '$1Backup'
    sudo chmod  755 -R '$1Backup'
fi

echo 'take back up for rollback'
sudo cp $1 $1Backup

echo 'removes the contents of the directory'
rm  -rf '$1'
rm  -rf '$1Temp'