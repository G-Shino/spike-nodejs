
const url = "https://httpbin.org/get";

const log = (message) => {
  console.log(url,": ",message);
  console.log(__filename);
  console.log(__dirname);
}

module.exports.log = log;
