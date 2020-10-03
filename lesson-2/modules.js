const {people, ages} = require("./people.js")

console.log("module: ", people, ages);

const os = require("os");
console.log(os.platform(), os.homedir());
