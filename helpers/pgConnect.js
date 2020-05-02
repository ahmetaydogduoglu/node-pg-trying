const { Client } = require("pg")
const connectionString = "postgres://postgres:ahmet@localhost:5432/books";

const client = new Client({
    connectionString: connectionString
});

client.connect().then(()=>console.log("Connect to PG")).catch(err=>console.log(err));

module.exports = client;
