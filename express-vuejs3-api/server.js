/**
 * REST API backend for Vuejs 3 async component loading demo.
 */

const PORT = 3000;

var express = require("express");
const cors = require('cors');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

var app = express();
app.use(cors({
    origin: ['http://localhost:5173', process.env.CORS_FRONTEND_URL]
}));

app.listen(PORT, () => {
  console.log("Server running on port "+PORT);
});

app.post("/grid", (req, res, next) => {
  /**
   * Return a random number of entities to initialize.
   */
  console.log(req.url);
  //console.log(req.params);

  // delay response to mimic heavy compute load for async client
  var sleep = 100.0 + Math.floor(Math.random() * 1000);
  console.log(sleep);
  
  const low = 10;
  const high = 50;
  const num_items = Math.floor(Math.random() * (high - low + 1) + low);

  setTimeout(function() {
    res.json({'num_items': num_items});
  }, sleep);
});

app.get("/grid/item/info_list", (req, res, next) => {
  /**
   * Return a list of names.
   */
  console.log(req.url);
  console.log(req.query);
  const entity_id = req.query.item_id;
  console.log(entity_id);

  // delay response to mimic heavy compute load for async client
  var sleep = 300.0 + Math.floor(Math.random() * 1000);
  console.log(sleep);

  const lorem_txt = new LoremIpsum().generateWords(5).split(" ");
  console.log(lorem_txt);
  
  setTimeout(function() {
    res.json(lorem_txt)
  }, sleep);
});


 app.get("/grid/item/status", (req, res, next) => {
  /**
   * Return the status for the entity given as parameter id.
   */
  console.log(req.url);
  const entity_id = req.query.item_id;
  console.log(entity_id);

  //const rnd_status = Math.ceil(Math.random()*10);

  // delay response to mimic heavy compute load for async client
  var sleep = 100.0 + Math.floor(Math.random() * 1000);
  console.log(sleep);
  
  const items = [0, 1, 2];
  const rnd_status = items[Math.floor(Math.random()*items.length)];

  setTimeout(function() {
    res.json({'severity': rnd_status});
  }, sleep);
});