"use strict";
require("dotenv").config({ path: ".env" });
const { DB_URI, DB_NAME } = process.env;
const { MongoClient } = require("mongodb");

let connection;

async function connectDB() {
  if (connection) return connection;
  try {
    const client = await MongoClient.connect(DB_URI);

    let connection = client.db(DB_NAME);
    console.log("Connected");

    return connection;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

function connectMongo(callback) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(DB_URI, (err, res) => {
      if (err) return reject(err);

      const cursor = res.db(DB_NAME);

      if (typeof callback === "function") {
        callback(cursor);
      }
      //   callback = callback || function () {}; //Otra forma

      console.log("connected");
      resolve(cursor);
    });
  });
}

function getCursorMongo(callback) {
  return new Promise(async (resolve, reject) => {
    const cursor = await connectMongo();

    if (cursor) {
      callback = callback || function () {};

      callback(cursor);
      resolve(cursor);
    } else {
      console.log(err);
      reject("err");
    }
  });
}

getCursorMongo((x) => {
  console.log("CALLBACK PRRO");
  console.log(x);
}).then((x) => {
  console.log("THEN KK");
  console.log(x);
});

module.exports = connectDB;
