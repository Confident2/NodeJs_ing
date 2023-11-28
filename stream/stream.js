const fs = require("fs");

const rs = fs.createReadStream("./files/promiseWriteRenamed.txt", {
  encoding: "utf8",
});
const ws = fs.createWriteStream("./files/new-promiseWrite.txt");

// working with large files
// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });

//more effecient way
rs.pipe(ws);
