# School's Out! - API Documentation

## \# Getting Started
<br/>

### 1. Clone this repo
<br/>     *In your terminal, in the parent directory of your desired location*
```bash
git clone https://github.com/tacDev-io/schools-out-api.git schools-out-api
```
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

***
<br/>
<br/>

### 3. Create Environment Variables
Certain environment variables are specific to each development environment and not included in this repo. You'll want to create your own.
<br/><br/>     In the project root directory, in the `Config` directory, create a new file, and name it `local.js`.
<br/><br/>
### Enter the following code, replacing the values with your own.

```javascript
module.exports = {

  env: {
    POSTGRES_USERNAME: "username",
    POSTGRES_PW: "password",
    JWT_KEY: 'ASDdasASDasdASdaSDasDSDASd'
  }

};
```
<br/>

***
<br/>
<br/>

### 4. Create Your Local Database
<br/><br/>     In a local PostgreSQL client such as [PGAdmin](https://www.postgresql.org/download/) or [Beekeeper Studio](https://www.beekeeperstudio.io/), create a new database and name it `schools-out`.

<br/>

***
<br/>
<br/>

### 5. Start Your Local Redis Server
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

***
<br/>
<br/>

### 6. Start the Backend Server
```bash
sails lift --redis
```
<br/>

***
<br/>
<br/>

### 7. Server is live and running at  http://localhost:1337

