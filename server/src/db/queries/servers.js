const db = require("../index");
const Message = require("./messages");
const Channel = require("./channels");
const Member = require("./members");
const Tag = require("./tags");

const create = (data) => {
  const { creatorId, title, logo, invite_code } = data;

  const query = `
  INSERT INTO servers 
  (creator_id, title, logo, invite_code)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;
  const params = [creatorId, title, logo, invite_code];
  return db.query(query, params).then((res) => res.rows[0]);
};

const byUser = (userId) => {
  const query = `
  SELECT servers.id, 
    servers.title, 
    servers.logo
  FROM servers
  JOIN members ON server_id = servers.id
  JOIN users ON user_id = users.id
  WHERE user_id = $1
  `;
  const params = [userId];
  return db.query(query, params).then((res) => res.rows);
};

const byID = (serverId) => {
  const serverQuery = db
    .query(
      `
  SELECT 
    id,
    title,
    logo,
    creator_id AS owner_id,
    invite_code
  FROM servers
  WHERE id = $1
  `,
      [serverId]
    )
    .then((res) => res.rows[0]);

  return Promise.all([
    serverQuery,
    Member.byServer(serverId),
    Tag.byServer(serverId),
    Channel.byServer(serverId),
  ])
    .then(([server, members, tags, channels]) => {
      return { ...server, members, tags, channels };
    })
    .then((serverData) => {
      const messageQueries = serverData.channels.map((channel) =>
        Message.byChannel(channel.id)
      );
      return Promise.all(messageQueries).then((messages) => {
        serverData.channels.forEach((channel, i) => {
          channel.messages = messages[i];
        });
        return serverData;
      });
    });
};

const addTags = (tagIds, serverId) => {
  const tagQueries = tagIds.map((tagId) => {
    return db
      .query(
        `
      INSERT INTO server_tags 
      (tag_id, server_id)
      VALUES ($1, $2)
      RETURNING (
        SELECT name FROM tags
        WHERE tags.id = tag_id
      );
  `,
        [tagId, serverId]
      )
      .then((res) => res.rows[0]);
  });

  return Promise.all(tagQueries);
};

module.exports = {
  byUser,
  byID,
  create,
  addTags,
};
