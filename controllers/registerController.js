// const usersDB = {
//   users: require("../model/users.json"),
//   setUser: function (data) {
//     this.users = data;
//   },
// };
// const fsPromises = require("fs").promises;
// const path = require("path");

const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required!." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); // conflict
  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Using Mongoose to connect and update(interact) with MONGODB

    // create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);
    // res.redirect("../views/index.html");
    // Using direct MongoDB and express js and writing to local file system

    // usersDB.setUser([...usersDB.users, newUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, "..", "model", "users.json"),
    //   JSON.stringify(usersDB.users)
    // );
    // console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
