const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../db/queries/users");
const jwt = require("jsonwebtoken");
const { authRef } = require("../middleware/auth");
const {
  generateAccess,
  generateRefresh,
  validateLogin,
  validateRegister,
} = require("../helpers/authHelpers");
// Register a new user
router.post("/register", async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { full_name, display_name, username, email, password } = req.body;
  try {
    // Hash password
    const hash = await bcrypt.hash(password, 10);
    const user = await Users.register({
      full_name,
      display_name,
      username,
      email,
      password: hash,
    });
    // User register successfully, set JWT and send
    const accessToken = generateAccess(user.id);
    const refreshToken = generateRefresh(user.id);

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (e) {
    if (e.code === "23505") {
      return res.status(400).send("Bad Request: Username/email already exists");
    }
    return res.status(500).send("Internal Server Error");
  }
});

// Log a user in
router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { username, password } = req.body;
  const user = await Users.byUsername(username);
  try {
    if (!user) {
      return res.status(400).send("Bad Request: Username does not exist");
    }
    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      return res.status(401).send("Unauthorized: Invalid username or password");
    }
    const { id, full_name: fullName } = user;
    // Valid login - set JWT and send
    const accessToken = generateAccess(id);
    const refreshToken = generateRefresh(id);
    res.status(200).send({
      accessToken,
      refreshToken,
      fullName,
    });
  } catch (e) {
    res.status(500).send("Internal Server Error: Failed to Login");
  }
});

router.post("/logout", (req, res, next) => {});

// Refresh Token
router.post("/token", authRef, (req, res) => {
  const id = req.user.id;
  const accessToken = generateAccess(id);
  const refreshToken = generateRefresh(id);
  res.send({ accessToken, refreshToken });
});

module.exports = router;
