# Employee-Tracker

# Description

This app is a employee tracker application that allows to update a employee, roles and departments. Also allows to use to see the employee's job information.

# Installation

Git clone the repositiry then open up vscode to go into the directory.

THis app uses boy nodejs and mysql so both will need to be installed.

Use the command npm init -y then npm install

A package.json should there and have all the dependencies, once set up go into mysql in the terminal using. mysql -u root -p

Once in MySQL you need to source the schema and seed using these commands.
source db/schema.sql;
source db/seeds.sql;
quit;

last command will exit and now should start. 

Use npm start
node index.js