const express = require("express");
const config = require('./config.json');
var cors = require('cors')


const port = config.APP_PORT;

const app = express();
app.use(cors());
const { createProxyMiddleware } = require('http-proxy-middleware');
const { Octokit } = require("@octokit/core");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api/github.com/contributors/:repoOwner/:repoName', async function(req, res, next) {
    // Handle the get for this route
    let settings = { method: "Get" };
    const { repoOwner,repoName } = req.params;
 
    const octokit = new Octokit({
        auth: config.APP_TOKEN
      });

    const {data} = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
        owner: repoOwner,
        repo: repoName
      });      
      res.json(data)
  });
  
  app.post('/', function(req, res, next) {
   // Handle the post for this route
  });

app.listen(port);