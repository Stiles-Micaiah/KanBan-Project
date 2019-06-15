import expressSession from 'express-session'
var mongoStore = require("connect-mongodb-session")(expressSession);

//update mongo store with mongodb uri-Uniform Resource Identifier
//copy same string from dbconfig.js

var store = new mongoStore({
    uri: "mongodb://other:Student123@cluster0-shard-00-00-uoyb8.mongodb.net:27017,cluster0-shard-00-01-uoyb8.mongodb.net:27017,cluster0-shard-00-02-uoyb8.mongodb.net:27017/kanban?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", //CHANGE ME!!!!!!
    collection: "Sessions"
});

store.on("error", function (err) {
    console.log("[SESSION ERROR]", err);
});


export default class Session {
    constructor() {

        this.express = expressSession({
            secret: "Thundercats HO!!", //CHANGE ME!!!!
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2,
            },
            store,
            resave: true,
            saveUninitialized: true
        })
    }
}