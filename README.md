# School's Out! - API Documentation

## \# Getting Started
<br/>

### 1. Clone this repo
<br/>     *In your terminal, in the parent directory of your desired location*
```bash
git clone https://github.com/tacDev-io/schools-out-api.git schools-out-api
```
<br/>
<br/>

***
<br/>
<br/>

### 2. Install Dependencies
<br/>     *Navigate into the newly created directory*
```bash
cd ./schools-out-api
```
<br/>     *Then enter:*
```bash
npm install
```
<br/>
<br/>

***
<br/>
<br/>

### 3. Start Your Local Redis Server
<br/>     *Windows Installation Instructions:* 	[Redis for Windows](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)
<br/>     *MacOS Installation Instructions:* 	[Redis for MacOS](https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/)
<br/>
<br/>     *On Windows*
```bash
sudo service redis-server start
```
<br/>     *On Mac*
```bash
brew services start redis
```
<br/>
<br/>

***
<br/>
<br/>

### 4. Start the Server
```bash
sails lift --redis
```
<br/>
<br/>

***
<br/>
<br/>

### 4. Server is live and running at  http://localhost:1337

