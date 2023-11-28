// FILE SYSTEM
const fs = require("fs");

// with string function
// fs.readFile("./files/starter.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// reading files
// with utf8 rule
fs.readFile("./files/starter.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

//PATH FILE SYSTEM
const path = require("path");

// reading file : getting the file
fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

// writing files: creating a file
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you Halimat Oritsejafor",
  (err) => {
    if (err) throw err;
    console.log("write complete");

    //     //Appending files: updating a file
    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\nNice to meet you too mike",
      (err) => {
        if (err) throw err;
        console.log("Append complete");
      }
    );
  }
);

// exit on uncaught errors
// process.on("uncaughtException", (err) => {
//   console.error(`There was an uncaught error: ${err}`);
//   process.exit(1);
// });

const fsPromises = require("fs").promises;
const path = require("path");

// ASYNC METHOD
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"), data);

    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you again"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseWriteRenamed.txt"),
      data
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseWriteRenamed.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();
