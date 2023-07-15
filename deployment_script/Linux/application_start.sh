
#!/bin/bash

sudo chmod  755 -R '/beat-deployments$3'
# echo 'create service file in /etc/systemd/system/$2.service'
# echo ' '>'/etc/systemd/system/$2.service'
# sudo printf '[Unit]
# Description=$1

# [Service]
# Type=notify
# # https://swimburger.net/blog/dotnet/how-to-run-aspnet-core-as-a-service-on-linux

# # will set the Current Working Directory (CWD)
# WorkingDirectory=/beat-deployments$3

# # systemd will run this executable to start the service
# ExecStart=/usr/bin/dotnet /beat-deployments$3/$4 --urls "http://127.0.0.1:$5"

# # ensure the service restarts after crashing
# Restart=always

# # amount of time to wait before restarting the service  
# RestartSec=10

# # to query logs using journalctl, set a logical name here 
# SyslogIdentifier=$2-service

# # copied from dotnet documentation at
# # https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx
# KillSignal=SIGINT
# # Environment=ASPNETCORE_ENVIRONMENT=$7
# Environment=ASPNETCORE_ENVIRONMENT=Production
# Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false
# Environment=ASPNETCORE_URLS=http://*:$5

# [Install]
# WantedBy=multi-user.target'>'/etc/systemd/system/$2.service'
# sudo cat '/etc/systemd/system/$2.service'
# echo 'created service file in /etc/systemd/system/$2.service'

# sudo systemctl daemon-reload

echo 'create conf file in /etc/httpd/conf.d/$2.conf'
echo ' '>'/etc/httpd/conf.d/$2.conf'
# https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-apache?view=aspnetcore-3.1#configure-a-proxy-server
sudo printf '#apache config
<VirtualHost *:*>
    RequestHeader set "X-Forwarded-Proto" expr=%%{REQUEST_SCHEME}
</VirtualHost>

<VirtualHost *:80>
    ProxyPreserveHost On
    ProxyPass $3/ http://127.0.0.1:$5/
    ProxyPassReverse $3/ http://127.0.0.1:$5/
    
    Alias $3 "/beat-deployments$3"
    <Directory "/beat-deployments$3">
        Options FollowSymLinks
    </Directory>
    # ServerName www.poc.beatapps.net
    # ServerAlias *.beatapps.net
    ErrorLog $2-error.log
    CustomLog $2-access.log common
</VirtualHost>'>'/etc/httpd/conf.d/$2.conf'

sudo cat '/etc/httpd/conf.d/$2.conf'

echo 'created conf file in /etc/httpd/conf.d/$2.conf'

sudo apachectl configtest

# # sudo systemctl enable BeatCovenantpulseUi
# sudo systemctl enable $2

# # sudo systemctl start BeatCovenantpulseUi
# sudo systemctl start $2

sudo systemctl reload httpd
