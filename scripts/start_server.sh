#!/bin/bash
cd /home/ubuntu/Pandascrow-v2-Webapp/
npm run build
cp -r -f dist/* /var/www/html/webapp/
systemctl start apache2