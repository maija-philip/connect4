#!/bin/bash
echo Copying Files to web bucket and building
npm run build
gsutil cp -R build/* gs://connect4.maija.xyz