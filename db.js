const pg = require('pg');
const uuid = require('uuid')
const { Client } = pg;
const client = new Client('postgress://localhost/acme_post_comments');
client.connect();

const nodeId = uuid.v4();
const expressId = uuid.v4();
const reactId = uuid.v4();

const tag1 = uuid.v4();
const tag2 = uuid.v4();
const tag3 = uuid.v4();
const tag4 = uuid.v4();

const SQL = `
  DROP TABLE IF EXISTS tags;
  DROP TABLE IF EXISTS posts;

  CREATE TABLE posts(
    id UUID PRIMARY KEY,
    topic TEXT
  );

  CREATE TABLE tags(
    id UUID PRIMARY KEY,
    text TEXT,
    post_id UUID REFERENCES posts(id)
  );

  INSERT INTO posts(id, topic) VALUES('${nodeId}', 'Node');
  INSERT INTO posts(id, topic) VALUES('${expressId}', 'Express');
  INSERT INTO posts(id, topic) VALUES('${reactId}', 'React');

  INSERT INTO tags(id, text, post_id) VALUES('${tag1}', 'WTF???', '${nodeId}');
  INSERT INTO tags(id, text, post_id) VALUES('${tag2}', 'I think I get it???', '${expressId}');
  INSERT INTO tags(id, text, post_id) VALUES('${tag3}', 'Challenging at first, but useful', '${reactId}');
  INSERT INTO tags(id, text, post_id) VALUES('${tag4}', 'Loved it!','${reactId}');

`;



const syncAndSeed = async () =>{
  await client.query(SQL);
  console.log('success');

};

const findAllPosts = async () =>{
  const response = await client.query('SELECT * FROM posts');
  return response.rows;
};

const findAllTags = async () =>{
  const response = await client.query('SELECT * FROM tags');
  return response.rows;
};

syncAndSeed();

module.exports = {
  syncAndSeed,
  findAllTags,
  findAllPosts
}
