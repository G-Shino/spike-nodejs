
const fs = require("fs");

const readStream = fs.createReadStream("./docs/sample4.txt", {encoding: "utf-8"});
const writeStream = fs.createWriteStream("./docs/sample5.txt");

// readStream.on("data", (chunk) => {
//   console.log("--- NEW CHUNK ----");
//   console.log(chunk);
//   writeStream.write("\nNEW CHUNK\n")
//   writeStream.write(chunk);
// });

// 上と同じようなもん
readStream.pipe(writeStream);
