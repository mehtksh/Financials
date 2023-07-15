#!/bin/bash

sudo yum -y update          # Install the latest system updates.
sudo yum -y install aws-cli # Install the AWS CLI.
aws --version               # Confirm the AWS CLI was installed.

echo 'purpose : copys logs to s3 bucket'

echo 'region'
region='eu-west-1'
echo $region

echo 'bucket name'
bucket_name='$1'
echo $bucket_name

echo 'app name'
app_name='$2'
echo $app_name

# echo 'logs' 
# log_path='$2.logs'
# echo $log_path 

# echo 'copy logs to s3 started'
# echo aws s3 cp ../logs/script.log s3://$bucket_name/$logpath/script.log --region $region
# echo 'copy logs to s3 started'

if [ -d '$3' ]; then 
  echo 'Take action if $3 exists'   
  echo 'Installing config files in $3...'
else
  echo  Control will jump here if $3 does NOT exists 
  echo "Info: '$3' not found. Creating the folder..."
  sudo mkdir '$3'
  sudo chmod  755 -R '$3'
fi

echo 'Enabling /beat-deployments started'
sudo chmod  755 -R '$3'
sudo chmod  755 -R '$3Temp'
echo 'Enabling /beat-deployments ended'

echo 'copy service stated'
sudo cp -r -a '$3Temp/dist/.' '$3'
echo 'copy service ended'

echo 'delete existing configuration.js'
rm -rf '$3/configuration.js'

echo 'fetch configuration.js from aws s3'
echo sudo aws s3 cp '$1/$4/ui/configuration.js' '$3/configuration.js' --region $region
sudo aws s3 cp '$1/$4/ui/configuration.js' '$3/configuration.js' --region $region
echo 'fetched configuration.js from aws s3 successfully'

