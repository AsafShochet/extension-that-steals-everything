_Hacking Chrome Extensions_

This repo is made for educational purposes,
and it's going hand in hand with talk "Let's make a chrome extension that steals everything" by Asaf Shochet Avida.

Feel free to use it for personal needs, if you wish to use it in a conference / commercial manner, please contact me at wasafa1@gmail.com.

**Running instructions**

To run the full cycle (like in the talk) you'll need:

- Run Node server (port 1111)
- Run Dashboard application (port 3000)
- Run demo bank application (port 8081)
- Install chrome extension

**_Run node server_**

Start the server on port 1111 by running:

`cd src/server`

`node server.js`

**_ Create a certificate (SSL) _**
If there's an error in the requests regarding SSL cerficiates,
create a self-signed certificate for localhost.
On MacOS you can use: https://github.com/FiloSottile/mkcert

**_ Start the dashboard _**
`cd src/dashboard`
`nvm use 20`
`npm i`
`npm run dev`

Opens the dashboard on port 3000

**_ Start the demo banking site _**
`cd src/demo-bank-login`
`npx http-server -p 8081`

go to url `http://localhost:8081/login.html`

Opens the bank login site on port 8081

**Demos**

Do Good Extension:

1. Application with a popup
2. Application with a popup + access to tabs API
3. Adding content blocking capabilities via content script

Do Bad Extensions:

- User site navigation tracking
- Key Logger capability
- Localstorage data theft
- Screenshots

**Disclaimer**

Hacking is as interesting as it is illegal.
This content is meant to be used for educational purposes only, to help us fight the bad guys.
Please do not use these methods for bad things.

**License**

All rights are reserved to Asaf Shochet Avida.
