const router = require("express").Router();
const Server = require("../db/queries/servers");
const Channel = require("../db/queries/channels");
const Member = require("../db/queries/members");
const uuid = require("uuid");

// GET All user servers
router.get("/servers", async (req, res) => {
  const userId = req.user.id;
  try {
    const servers = await Server.byUser(userId);
    res.status(200).send(servers);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// create a new server
router.post("/servers", async (req, res) => {
  const creatorId = req.user.id;
  const { title, logo } = req.body;
  const invite_code = uuid.v4();
  try {
    const server = await Server.create({
      creatorId,
      title,
      logo,
      invite_code,
    });
    const member = await Member.create({
      serverId: server.id,
      userId: server.creator_id,
      role: "owner",
    });
    console.log(member);
    res.status(200).send(server);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// Single server data
router.post("/servers/:id", async (req, res) => {
  const userId = req.user.id;
  const serverId = req.params.id;
  try {
    const server = await Server.byID(serverId);
    res.status(200).json(server);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// creating a new channel
router.post("/servers/:id/channels", async (req, res) => {
  // for: error validation
  // const { error } = validateChannel(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const userId = req.user.id;
  const serverId = req.params.id;
  const { title } = req.body;

  try {
    const channel = await Channel.create({ serverId, userId, title });
    res.status(200).json(channel);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// adding tags to a server
router.put("/servers/:id/tags", async (req, res) => {
  // for: error validation
  // const { error } = validateChannel(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const userId = req.user.id;
  const serverId = req.params.id;
  const { tags } = req.body;
  try {
    await Server.addTags(tags, serverId);
    res.status(200);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
