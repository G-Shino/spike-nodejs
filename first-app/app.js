// import {log} from "./logger"

const logger = require("./logger");
const path = require("path");
const os = require("os");

const EventEmitter = require("events");

function sayHello(name) {
  console.log("Hello " + name)
}

console.log("Start");

// windowの替わりにglobalに格納されている
global.console.log("global")
let message = "message";
global.message = message;
console.log(global.message)
sayHello("shinogu");
const p1 = new Promise((resolve) => {
  console.log("p1");
  resolve();
})
setTimeout(() => {console.log("setTimeout cb")});
p1.then(() => {console.log("p1 then")}).then(() => {console.log("p1 then then")});


console.log(module);
console.log(logger);
logger.log("hoge")

const pathObj = path.parse(__filename);
console.log(pathObj);

console.log(os.totalmem());

const emitter = new EventEmitter();
// making a noise, produce signaling
emitter.on("messageLogged", (e) => {
  console.log("listener called");
  console.log(e.id);
  console.log(e.url);
})
emitter.emit("messageLogged", {id: 1, url: "http://"});
emitter.emit("messageLogged", {id: 3, url: "http://33"});


console.log("End")
