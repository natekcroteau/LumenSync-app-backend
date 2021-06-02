
# LumenSync
> Automate and Control Your Hue Lightbulbs


## General Info
LumenSync is a minimalistic Phillips Hue lightbulb control and scheduling application built with a React frontend, Node/Express backend, and PostgreSQL database.

## Demo Video
[LumenSync on YouTube](https://youtu.be/Igzv4thhg1c)

## Technologies

* Node - v 15.13.0
  * Express
  * KNEX
  * cors
  * jsonwebtoken
  * bcrypt

* React - v 17.0.2
  * React Router
  * Material UI
  * Spacetime

* HTML
* CSS


## Setup
To utilize LumenSync, install frontend and backend directories locally using the following commands:
```
git clone git@github.com:natekcroteau/LumenSync-app-frontend.git
git clone git@github.com:natekcroteau/LumenSync-app-backend.git
```

Frontend Directory Setup:
```
npm install
```

Backend Directory Setup:
```
npm install
```
-initiate and connect a PostgreSQL database, updating knexfile.js with credentials



Start the backend and frontend server with the following command in each directory:
```
npm start
```


## Code Example
```
const submitForm = (event) => {
    setSubmitted(true)
    event.preventDefault()
    const convertedBri = Math.trunc(prepareBri())
    const convertedCT = Math.trunc(prepareCT())
    fetch(`https://${hueAddress}/api/${hueUsername}/schedules`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": nameInput,
            "command": {
                "address": `/api/${hueUsername}/groups/${lightGroup}/action`,
                "method": "PUT",
                "body": {"on": onOff, "bri": `${convertedBri}`, "ct": `${convertedCT}`}
            },
            "localtime": `${prepareDateTime()}`,
            "autodelete": false
        })
    })
}
```

## Features
* Create new users and sign-in with authentication.
* The user must connect to their Hue Bridge, utilizing the setup feature found under the Account tab.
  * Hue Bridge connection information is stored with user information.
* The user can turn on/off each Phillips Hue lightbulb that is registered to their Hue Bridge under the Control tab.
* The user can view existing light schedules and create new light schedules. 
  * Creating a new light schedule allows the selection of a light-group, the time of day for the action, ON or OFF action, and the brightness and color temperature. 
* The user is able to remove authentication by logging out

## Contact
Created by [Nate Croteau](https://github.com/natekcroteau)
