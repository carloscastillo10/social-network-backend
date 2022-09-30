# SOCIAL NETWORK BACKEND

## Repository of the backend of the project of an social network with node js

## Management Microservices

```bash
$ # PM2 Microservices Management commands
$ Install
$ npm install pm2 -g
$
$ # View Logs
$ pm2 logs
$
$ # View logs by process
$ pm2 <processID>
$
$ # View active processes
$ pm2 status
$
$ # Start microservices
$ pm2 start app/v1/api/api-index.js
$ pm2 start app/v1/mysql-microservice/api/v1/mysql-index.js
$ pm2 start app/v1/post-microservice/api/v1/post-index.js
$
$ # Stop all microservices
$ pm2 stop all
$
$ # Stop unique microservice
$ pm2 stop <microserviceID>
$
$ # Restart any microservice
$ pm2 restart <microserviceID>
```
