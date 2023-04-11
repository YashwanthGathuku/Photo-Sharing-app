/*const http = require('http');
const server = http.createServer(
    (request, response) => {
        if(request.url == '/about'){
            response.end('The about page');
        }else if(request.url == '/login')
            response.end('The Login page');
        else if(request.url == '/logout')
            response.end('Log out!');
        else{
            response.writeHead(404)
            response.end('Page not found')
        }
});*/

const http = require('http')
const fs = require('fs')
const homePage = fs.readFileSync("index.html");
const aboutPage = fs.readFileSync("about.html");
const contactPage = fs.readFileSync("contact.html");
const notFoundPage = fs.readFileSync("notfound.html");
const server = http.createServer((request, response) => {
  if (request.url === "/about") response.end(aboutPage);
  else if (request.url === "/contact") 
    response.end(contactPage);
  else if (request.url === "/") 
    response.end(homePage);
  else {
    response.writeHead(404);
    response.end(notFoundPage);
  }
});
server.listen(1311)
console.log('server is running on http://localhost:1311')