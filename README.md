# SOCIAL NETWORK BACKEND

Repository of the backend of the project of an social network with node js

## PM2 Microservices Management commands

```bash
$ # Install PM2
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
$ pm2 start app/v1/cache-microservice/api/v1/cache-index.js
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
---
## Deployment
The project comes with a basic configuration for [Nginx](https://www.nginx.com/)
<br />

### [Nginx](https://www.nginx.com/) execution

The steps to start the template using Nginx:

> Get the code

```bash
$ git clone git@github.com:carloscastillo10/social-network-backend.git
$ cd social-network-backend
```
> Install Start Nginx

```bash
$ sudo apt-get install nginx
```

> Setup Ngnix configuration
>> Open configuration

```bash
$ sudo gedit /etc/nginx/sites-available/defaul
$ # Adding into `server` key
```
>> Adding into `server` key

```bash
location /api/v1/users {
    proxy_pass http://localhost:3000;
}

location /api/v1/auth {
    proxy_pass http://localhost:3000;
}

location /api/v1/posts {
    proxy_pass http://localhost:3002;
}
```

> Start microservices

```bash
$ pm2 start app/v1/api/api-index.js
$ pm2 start app/v1/mysql-microservice/api/v1/mysql-index.js
$ pm2 start app/v1/post-microservice/api/v1/post-index.js
$ pm2 start app/v1/cache-microservice/api/v1/cache-index.js
```

> Star Ngnix Proxy

```bash
$ sudo service nginx start
Serving on http://localhost
```

Visit `http://localhost` in your browser. The app should be up & running.
