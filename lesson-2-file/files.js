const fs = require("fs");

// reading files
fs.readFile("./docs/sample.txt", (err, data) => {
  if (err){
    console.error(err);
  }
  console.log("buffer", data);
  console.log(data.toString());
});

// writing files
fs.writeFile("./docs/sample3.txt", "hello, world", () => {
  console.log("file was written");
});


console.log("last line");

// directories
if (!fs.existsSync("./assets")){
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.error(err);
    }
    console.log("folder created");
  })
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.error(err);
    }
    console.log("folder deleted")
  })
}

// deleteing files
setTimeout(() => {
  if (fs.existsSync("./docs/sample3.txt")){
    fs.unlink("./docs/sample3.txt", (err) => {
      if (err) {
        console.error(err);
      }
      console.log("file deleted");
    })
  }
}, 3000)
