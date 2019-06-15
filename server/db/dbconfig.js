//THIS FILE STAYS BASICALLY THE SAME
import mongoose from 'mongoose'

//THIS STRING WILL CHANGE SLIGHTLY
//this is the first file on the server side to work with.
//here I am importing from https://cloud.mongodb.com
//make sure password is correct and change the word test to the name of the project
//next file to update is in Middlewear folder -session.js
const connectionString = "mongodb://other:Student123@cluster0-shard-00-00-uoyb8.mongodb.net:27017,cluster0-shard-00-01-uoyb8.mongodb.net:27017,cluster0-shard-00-02-uoyb8.mongodb.net:27017/kanban?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

let connection = mongoose.connection

mongoose.connect(connectionString)

//log any errors
connection.on('error', err => {
  console.error('[DATABASE ERROR]:', err)
})

//confirm connection
connection.once('open', () => {
  console.log('connected to the database')
})