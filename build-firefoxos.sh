#!/bin/sh

cd app
cordova build firefoxos
rm platforms/firefoxos/www/manifest.appcache
rm platforms/firefoxos/www/cordova.js
rm platforms/firefoxos/www/cordova_plugins.js
rm platforms/firefoxos/www/offline.html
rm platforms/firefoxos/www/robots.txt
rm platforms/firefoxos/www/humans.txt
rm platforms/firefoxos/www/favicon.ico
rm platforms/firefoxos/www/js/index.js
rm platforms/firefoxos/www/css/index.css
rm platforms/firefoxos/www/apple-touch-icon-precomposed.png
rm -Rf platforms/firefoxos/www/fonts/*

# Go there now and zip to home.
cd platforms/firefoxos/www
rm ~/Downloads/service-app.zip
zip -r ~/Downloads/service-app *