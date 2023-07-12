const express = require('express');
const bodyparser= require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors')

const sequelize = require('./util/database')

const User = require('./models/user')
const Chat = require('./models/chat')

const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chat')

const app = express();
app.use(cors({
    origin:'*' //accept request from every origin if we specify address than sorce will get limited
}));
app.use(bodyparser.json({extended:false}))
app.use(express.json());  //this is for handling jsons payloads

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)

User.hasMany(Chat);
Chat.belongsTo(User);

sequelize.sync()
   .then(app.listen(3000))
   .catch(err=>console.log(err))