#!/bin/bash
sed -i -e 's+$1+/beat-deployments/munibonds/Financials/pod/ui+g' deployment_script/Linux/before_install.sh

sed -i -e 's+$1+s3://beat-municipalbonds-nprd/Configurations+g' deployment_script/Linux/after_install.sh
sed -i -e 's+$2+BeatMunicipalBondsUi+g' deployment_script/Linux/after_install.sh
sed -i -e 's+$3+/beat-deployments/munibonds/Financials/pod/ui+g' deployment_script/Linux/after_install.sh
sed -i -e 's+$4+dev+g' deployment_script/Linux/after_install.sh

sed -i -e 's+$1+BEAT munibonds/Financials Ui on AWS linux EC2 machine+g' deployment_script/Linux/application_start.sh
sed -i -e 's+$2+Beatmunibonds/FinancialsUi+g' deployment_script/Linux/application_start.sh
sed -i -e 's+$3+/munibonds/Financials/pod/ui+g' deployment_script/Linux/application_start.sh
sed -i -e 's+$4+Ui.dll+g' deployment_script/Linux/application_start.sh
sed -i -e 's+$5+9752+g' deployment_script/Linux/application_start.sh
sed -i -e 's+$6+poc.beatapps.net+g' deployment_script/Linux/application_start.sh
sed -i -e 's+$7+Development+g' deployment_script/Linux/application_start.sh

sed -i -e 's+$1+/beat-deployments/munibonds/Financials/pod/ui+g' deployment_script/Linux/validate_service.sh
sed -i -e 's+$2+9752+g' deployment_script/Linux/validate_service.sh

cp deployment_script/Linux/appspec.yml ../../appspec.yml