Import-Module WebAdministration
# set-executionpolicy remotesigned
if ($PSHOME -like "*SysWOW64*") {
    Write-Warning "Restarting this script under 64-bit Windows PowerShell."

    # Restart this script under 64-bit Windows PowerShell.
    #   (\SysNative\ redirects to \System32\ for 64-bit mode)

    Write-Warning $PSScriptRoot
    Write-Warning $MyInvocation.MyCommand
    Write-Warning $MyInvocation.InvocationName
    & (Join-Path ($PSHOME -replace "SysWOW64", "SysNative") powershell.exe) -File $MyInvocation.InvocationName @args

    # Exit 32-bit script.
    Exit $LastExitCode
    Write-Warning " 64-bit Windows PowerShell done."
}
$API_Or_UI="ui"
$AWS_REGION = "eu-west-1"
$API_Or_UI="api"
$S3_Bucket_Root = "s3://beat-municipalbonds-nprd/Configurations"
###########################Create New Website / Domain##########################################

#Create Domain Subdomain if not exists,then Specific Apps will create.
function AddSiteIfNotAvailable($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $arg_APP_PORT) {
    Write-Warning "Started : AddSiteIfNotAvailable($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $arg_APP_PORT)"
    if (!(Get-Website | where-object { $_.name -eq $arg_APP_DOMAIN }) -and (!($arg_APP_DOMAIN -eq ''))) {
        if (!(Test-Path $arg_ROOT_FOLDER )) {
            New-Item -ItemType Directory -Force -Path $arg_ROOT_FOLDER
        }
        New-Website -Name $arg_APP_DOMAIN  -PhysicalPath $arg_ROOT_FOLDER -Port $arg_APP_PORT -HostHeader "" -ApplicationPool $arg_APP_POOL_NAME -Force
    }
    Write-Warning "Ended : AddSiteIfNotAvailable($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $arg_APP_PORT)"
}

function AddApplication($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $virtualPath, $arg_PHYSICAL_PATH ) {
    Write-Warning "Started : AddApplication($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $virtualPath, $arg_PHYSICAL_PATH )"
    $local_Site = $arg_APP_DOMAIN + '\' + $virtualPath
    
	$removeVirtualDirectory = 'IIS:\Sites\' + $arg_APP_DOMAIN + '\' + $virtualPath 
    #Remove-WebApplication -Name "UI" -Site $local_Site
	$arg_PHYSICAL_PATH = $arg_PHYSICAL_PATH.replace('\\', '\')
    # if (!(Test-Path -Path $removeVirtualDirectory)) {
    New-Item -ItemType directory -Path $removeVirtualDirectory -Force
    New-WebVirtualDirectory -Site $arg_APP_DOMAIN -Name $local_Site -Force -PhysicalPath $arg_PHYSICAL_PATH
    #New-WebApplication -Name $local_Site  -Site $local_Site -PhysicalPath $arg_PHYSICAL_PATH -ApplicationPool $arg_APP_POOL_NAME -Force
    New-WebApplication -Name "UI"  -Site $local_Site -PhysicalPath $arg_PHYSICAL_PATH -ApplicationPool $arg_APP_POOL_NAME -Force
    # }
    Write-Warning "Ended : AddApplication($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $virtualPath, $arg_PHYSICAL_PATH )"
}
function RemoveApplication($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $virtualPath, $arg_PHYSICAL_PATH ) {
    Write-Warning "Started : RemoveApplication($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $virtualPath, $arg_PHYSICAL_PATH )"
    $local_Site = $arg_APP_DOMAIN + '\' + $virtualPath

    $removeVirtualDirectory = 'IIS:\Sites\' + $arg_APP_DOMAIN + '\' + $virtualPath
    if ((Test-Path -Path $removeVirtualDirectory)) {
        Remove-WebApplication -Name "UI" -Site $local_Site
    }

    Write-Warning "Ended : RemoveApplication($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $virtualPath, $arg_PHYSICAL_PATH )"
}
################################################################################################

######################Deployment to Physical Path###############################################
function CreatePhysicalPath($arg_PHYSICAL_PATH, $arg_APP_POOL_NAME) {
    Write-Warning "Started : CreatePhysicalPath($arg_PHYSICAL_PATH, $arg_APP_POOL_NAME)"
    if (!(Test-Path -Path $arg_PHYSICAL_PATH )) {
        New-Item -ItemType directory -Path $arg_PHYSICAL_PATH
        #$isDateDirectoryExist = $true
    }
    else {
        StopAppPool $arg_APP_POOL_NAME
        $arg_PHYSICAL_PATH_CONTENTS = $arg_PHYSICAL_PATH + "\*"
        Remove-Item $arg_PHYSICAL_PATH_CONTENTS -Force -Recurse
        Remove-Item  $arg_PHYSICAL_PATH

        New-Item -ItemType directory -Path $arg_PHYSICAL_PATH
    }
    Write-Warning "Ended : CreatePhysicalPath($arg_PHYSICAL_PATH, $arg_APP_POOL_NAME)"
}
################################################################################################

####################################IIS HELPERS#############################################
function AddNewAppPoolifNotExists($arg_APP_POOL_NAME, $arg_APP_POOL_DotNetVersion) {
    Write-Warning "Started : AddNewAppPoolifNotExists($arg_APP_POOL_NAME, $arg_APP_POOL_DotNetVersion)"
    Set-Location iis:\apppools\
    #check if the app pool exists
    if (!(Test-Path -Path $arg_APP_POOL_NAME)) {
        #create the app pool
        $AppPool = new-item $arg_APP_POOL_NAME
        $AppPool | set-itemproperty -name "managedruntimeversion" -value $arg_APP_POOL_DotNetVersion
    }
    Write-Warning "Ended : AddNewAppPoolifNotExists($arg_APP_POOL_NAME, $arg_APP_POOL_DotNetVersion)"
}

function StartAppPool($arg_APP_POOL_NAME) {
    Write-Warning "Started : StartAppPool($arg_APP_POOL_NAME)"
    #delay for 6 seconds for App pool to start
    Start-WebAppPool -Name $arg_APP_POOL_NAME
    Write-Warning "Ended : StartAppPool($arg_APP_POOL_NAME)"
}

function StopAppPool($arg_APP_POOL_NAME) {
    Write-Warning "Started : StopAppPool($arg_APP_POOL_NAME)"
    Stop-WebAppPool -Name $arg_APP_POOL_NAME
    if (!(Get-WebAppPoolState($arg_APP_POOL_NAME)).Value -eq "Stopped") {
        Stop-WebAppPool -Name $arg_APP_POOL_NAME

        #delay for 3 seconds for App pool to stop
        Start-Sleep -Seconds 3
    }
    Write-Warning "Ended : StopAppPool($arg_APP_POOL_NAME)"
}

# function SetIISUserPersmission()
# {
# $myacl = Get-Acl DEPLOY_ROOT_FOLDER
# $myaclentry = "IIS_IUSRS","FullControl", "ContainerInherit, ObjectInherit", "None", "Allow"
# $myaccessrule = New-Object System.Security.AccessControl.FileSystemAccessRule($myaclentry)
# $myacl.SetAccessRule($myaccessrule)
# Get-ChildItem -Path "$mypath" -Recurse -Force | Set-Acl -AclObject $myacl -Verbose
# }

##################################################################################################

function SetEnv_URLS($arg_TEMP_PATH) {
    Write-Warning "Started : SetEnv_URLS($arg_TEMP_PATH)"

    $File1 = $arg_TEMP_PATH + "\configurations.js"
    $File2 = $arg_TEMP_PATH + "\bundle.js"
    
    $Content1 = get-content $File1
    $Content1 = $Content1.replace('var configs =','')
    $Content1 = $Content1.replace(';','')
    $Content1 = $Content1.replace('},','}')
    $Content1 = $Content1.replace('  ','  "')
    $Content1 = $Content1.replace(':','":')
    $Content1 = $Content1.replace('  ""','  "')
    $Content1 = $Content1.replace('https":','https:')
    $Content1 = $Content1.replace('http":','http:')
    $Content1 = $Content1.replace('localhost":','localhost:')
    $Content1 = $Content1.replace('  "  "','  "')
    $Content1 = $Content1.replace('true','"true"')
    $Content1 = $Content1.replace('false','"false"')
    $Content1 = $Content1.replace('"  "','"')
    $Content1 = $Content1.replace('"}','}')
    $Content1 = $Content1.replace('"loadUserInfo": "true",','"loadUserInfo": "true"')

    $Bytes = [System.Text.Encoding]::UTF8.GetBytes($Content1)
    $Encoded = [System.Convert]::ToBase64String($Bytes)
    $Encoded = "QsEC" + $Encoded + "CEsQ="
    $Encoded | set-content ($File1 + ".b64")

    $Content1 = get-content ($File1 + ".b64")
    $Bytes = [System.Text.Encoding]::UTF8.GetBytes($Content1)
    $Encoded = 'var bundle = { value : "QsEC' 
    $Encoded = $Encoded + [System.Convert]::ToBase64String($Bytes)
    $Encoded = $Encoded + 'CEsQ="};'
    $Encoded | set-content ($File2)

     Remove-Item ($File1 + ".b64")
     Remove-Item $File1

    
    # $File1 = $arg_TEMP_PATH + "\index.html"
    # $Content1 = get-content $File1
    # $Content1 = $Content1.replace('<body>','<body><script src="/bundle.js" type="text/javascript"></script>')
    # Set-Content -Path $File1 -Value $Content1
    
     Write-Warning "Ended : SetEnv_URLS($arg_TEMP_PATH)"
}
function RetrieveAppConfiguration($arg_S3Parent, $arg_TEMP_PATH) {
    Write-Warning "Started: RetrieveAppConfiguration($arg_S3Parent, $arg_TEMP_PATH)"

    $s3_Source = ($S3_Bucket_Root + "/" + $arg_S3Parent + "/" + $API_Or_UI+ "/" +"configurations.js")
    $destinationFullPath = ($arg_TEMP_PATH + "\dist\" + "configurations.js")
    Remove-Item  $destinationFullPath -Force
    
    Write-Warning "Command: aws s3 cp $s3_Source '$destinationFullPath' --region $AWS_REGION"
    
    aws s3 cp $s3_Source $destinationFullPath --region $AWS_REGION
    
    Write-Warning "Ended: RetrieveAppConfiguration($arg_S3Parent, $arg_TEMP_PATH)"
}
function DeployEnvironments($arg_TEMP_PATH) {
    Write-Warning "Started : DeployEnvironments($arg_TEMP_PATH)"
    SetEnv_URLS $arg_TEMP_PATH"\dist" 
    Write-Warning "Ended : DeployEnvironments($arg_TEMP_PATH)"
}

function Deploy($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $arg_APP_POOL_DotNetVersion, $arg_APP_PORT, $arg_PHYSICAL_PATH, $arg_TEMP_PATH, $arg_DEPLOYMENT_GROUP_NAME, $virtualPath,    $arg_S3Parent ) {
    Write-Warning "Started : Deploy($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $arg_APP_POOL_DotNetVersion, $arg_APP_PORT, $arg_PHYSICAL_PATH, $arg_TEMP_PATH, $arg_DEPLOYMENT_GROUP_NAME, $virtualPath,               $arg_S3Parent )"
    if (!($env:DEPLOYMENT_GROUP_NAME -eq $arg_DEPLOYMENT_GROUP_NAME)) {
        Write-Warning "Exited : Deploy($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $arg_APP_POOL_DotNetVersion, $arg_APP_PORT, $arg_PHYSICAL_PATH, $arg_TEMP_PATH, $arg_DEPLOYMENT_GROUP_NAME, $virtualPath,   )"
        return ""
    }

    Set-Location iis:\apppools\
    StopAppPool $arg_APP_POOL_NAME
    #add physical path
    AddNewAppPoolifNotExists $arg_APP_POOL_NAME $arg_APP_POOL_DotNetVersion
    RemoveApplication $arg_APP_DOMAIN $arg_ROOT_FOLDER $arg_APP_POOL_NAME $virtualPath $arg_PHYSICAL_PATH
    CreatePhysicalPath $arg_PHYSICAL_PATH $arg_APP_POOL_NAME

    #Add website if not created already and should not default web site
    if (!($arg_APP_DOMAIN.ToLower() -eq 'default web site')) {
        AddSiteIfNotAvailable $arg_APP_DOMAIN $arg_ROOT_FOLDER $arg_APP_POOL_NAME $arg_APP_PORT
        if (!(Test-Path $arg_PHYSICAL_PATH'\..\index.html'))
        {
            Set-Content $arg_PHYSICAL_PATH'\..\index.html' '<!DOCTYPE html><html lang="en">  <head>    <meta charset="utf-8" />    <title>BEAT munibondsFinancials</title>    <script>      function redirect() {        window.location.href = window.location.href.replace("index.html","")+"UI"      }    </script>  </head>  <body onload="redirect()"></body></html>'
        }
    }

    RetrieveAppConfiguration $arg_S3Parent $arg_TEMP_PATH
    DeployEnvironments $arg_TEMP_PATH 
    $arg_TEMP_PATH_CONTENTS = $arg_TEMP_PATH + "\dist\*"
    Copy-Item $arg_TEMP_PATH_CONTENTS -Destination $arg_PHYSICAL_PATH -Recurse
    # Remove-Item $arg_TEMP_PATH_CONTENTS -Recurse
    # Remove-Item  $arg_TEMP_PATH


    StartAppPool $arg_APP_POOL_NAME
    AddApplication $arg_APP_DOMAIN $arg_ROOT_FOLDER $arg_APP_POOL_NAME $virtualPath $arg_PHYSICAL_PATH
    Write-Warning "Ended : Deploy($arg_APP_DOMAIN, $arg_ROOT_FOLDER, $arg_APP_POOL_NAME, $arg_APP_POOL_DotNetVersion, $arg_APP_PORT, $arg_PHYSICAL_PATH, $arg_TEMP_PATH, $arg_DEPLOYMENT_GROUP_NAME, $virtualPath,             $arg_S3Parent )"
}

Deploy "default web site" "E:\inetpub\wwwroot\" "App_Pool_munibondsFinancials_UI_DEV" "" "" "E:\inetpub\wwwroot\munibonds\Financials\pod\UI" "E:\inetpub\wwwroot\munibonds\Financials\UITest"  "beat-bds-munibonds-financials-ec2-dev-windows" "munibonds\Financials\pod"  "dev"

Deploy "default web site" "E:\inetpub\wwwroot\" "App_Pool_munibondsFinancials_UI_TEST" "" "" "E:\inetpub\wwwroot\munibonds\Financials\pod\UI" "E:\inetpub\wwwroot\munibonds\Financials\UITest"  "beat-bds-munibonds-financials-ec2-test-windows" "munibonds\Financials\pod"  "test"

Deploy "default web site" "E:\inetpub\wwwroot\" "App_Pool_munibondsFinancials_UI_TEST" "" "" "E:\inetpub\wwwroot\munibonds\Financials\pod\UI" "E:\inetpub\wwwroot\munibonds\Financials\UITest"  "beat-bds-munibonds-financials-ec2-test-pref1-windows" "munibonds\Financials\pod" "perf1"

Deploy "default web site" "E:\inetpub\wwwroot\" "App_Pool_munibondsFinancials_UI_TEST" "" "" "E:\inetpub\wwwroot\munibonds\Financials\pod\UI" "E:\inetpub\wwwroot\munibonds\Financials\UITest"  "beat-bds-munibonds-financials-ec2-test-pref2-windows" "munibonds\Financials\pod" "perf2"

Deploy "default web site" "E:\inetpub\wwwroot\" "App_Pool_munibondsFinancials_UI_UAT" "" "" "E:\inetpub\wwwroot\munibonds\Financials\pod\UI" "E:\inetpub\wwwroot\munibonds\Financials\UITest"  "beat-bds-munibonds-financials-ec2-uat-windows" "munibonds\Financials\pod" "uat"


Remove-Item "E:\inetpub\wwwroot\munibonds\Financials\UITest\*" -Recurse
Remove-Item  "E:\inetpub\wwwroot\munibonds\Financials\UITest"
