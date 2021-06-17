const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      const { userName, password } = req.body
  
      for (let i = 0; i < users.length; i++) {
        if (users[i].userName === userName) {
          const authenticated = bcrypt.compareSync(password, users[i].passwordHash)
          if (authenticated) {
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash
            res.status(200).send(userToReturn)
          }
        }
      }
     res.status(400).send("User not found.")
    },

    register: (req, res) => {
      const { userName, userEmail,  firstName, lastName, password } = req.body
      const salt = bcrypt.genSaltSync(5)
      const passwordHash = bcrypt.hashSync(password, salt)
      let user = {
        userName,
        userEmail,
        firstName,
        lastName,
        passwordHash
      }
        users.push(req.body)
        let userToReturn = {...user}
        delete userToReturn.passwordHash
        res.status(200).send(userToReturn)
    },
}
