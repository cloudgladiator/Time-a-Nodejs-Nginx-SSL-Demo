# Deploy Node.js Application With SSL

This is a demo node project used for Youtube Video [https://www.youtube.com/watch?v=_q07Dn307GA](https://www.youtube.com/watch?v=_q07Dn307GA).

Related Article: [Nodejs Deployment with SSL certificate](https://www.bloggernepal.com/2020/12/nodejs-deployment-with-ssl-certificate.html)

## Commands Used
Update Server
- sudo apt update
- sudo apt upgrade 

install nodejs npm and nginx
- sudo apt install nodejs
- sudo apt install npm
- sudo apt install nginx

install pm2 globally
- npm install -g pm2
- pm2 start index.js --name "Demo" // sarts 

Pm2 useful commands:
- pm2 log Demo
- pm2 monit
- pm2 restart Demo
- pm2 stop Demo
- pm2 delete Demo 

Run Nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx

Create nginx config
- sudo touch /etc/nginx/conf.d/demo.conf
- sudo nano /etc/nginx/conf.d/demo.conf

nginx config
``` 
server {
    server_name example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

install certbot
- sudo add-apt-repository ppa:certbot/certbot
- sudo apt install python3-certbot-nginx

create certificate and set auto renew
- sudo certbot --nginx -d example.com -d www.example.com
- sudo certbot renew --dry-run

# add-apt-repository: command not found
Got this error? 
run:- 
- sudo apt install software-properties-common
- sudo apt update