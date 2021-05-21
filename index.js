const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001


const connection = require('./knexfile')[process.env.NODE_ENV || 'development']
const database = require('knex')(connection)


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))


app.put('/user', (request, response) => {

    database('users')
        .select()
        .where({ username: request.body.username })
        .first()
        .then(retrievedUser => {
            response.send(JSON.stringify({
                "hueAddress": retrievedUser.hueAddress, 
                "hueUsername": retrievedUser.hueUsername
            }))
        })

})


app.get('/users', (request, response) => {

    database('users')
        .then(users => response.send(users))

})


app.post('/users', (request, response) => {

    const { user } = request.body 

    database('users')
        .select()
        .where({ username: user.username })
        .first()
        .then(searchResult => {
            if(!searchResult) {
                bcrypt.hash(user.password, 12)
                .then(hashedPassword => {
                    return database('users')
                        .insert({
                            username: user.username,
                            password_hash: hashedPassword
                        })
                })
                .then(users => {
                    const user = users
                    response.json('Successful Account Creation')
                }).catch(error => {
                    response.send(JSON.stringify({ error: error.message }))
                })
            }else{
                response.send(JSON.stringify('Invalid Username or Password'))
            }
        })

})


app.put('/users', (request, response) => {

    const { username, hueAddress, hueUsername } = request.body
    insertUsernameIntoDatabase(username, hueUsername)
    insertAddressIntoDatabase(username, hueAddress)

})


app.post('/login', (request, response) => {

    const { user } = request.body 

    database('users')
        .select()
        .where({ username: user.username })
        .first()
        .then(retrievedUser => {
            if(!retrievedUser) throw new Error("No User Found")

            return Promise.all([
                bcrypt.compare(user.password, retrievedUser.password_hash),
                Promise.resolve(retrievedUser)
             ])
        }).then(results => {
            const arePasswordsTheSame = results[0]
            const user = results[1]

            if (!arePasswordsTheSame) throw new Error('Incorrect Password')

            const payload = { username: user.username }
            const secret = "Secret!1"

            const token = jwt.sign(payload, secret)
            return response.json({"token": token, "user": results})
        })
        .catch(error => {
            response.json(error.message)
        })

})

app.post('/establishBridge', (request, response) => {

    const {username, hueAddress, hueUsername} = request.body

    insertHueAddressIntoDatabase(username, hueAddress)
    insertHueUsernameIntoDatabase(username, hueUsername)

    
})

function insertHueUsernameIntoDatabase(username, hueUsername) {

    database('users')
        .select()
        .where("username", username )
        .update({"hueUsername": hueUsername})
        .catch(error => console.log(error.message))
        
}


function insertHueAddressIntoDatabase(username, hueAddress) {

    database('users')
        .select()
        .where("username", username )
        .update({"hueAddress": hueAddress})
        .catch(error => console.log(error.message))

}
