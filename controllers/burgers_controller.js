const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

// Routes with logic inside of routes
router.get("/", function (req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
  burger.selectAll(function (data) {
    let hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.insertOne([
    "burger_name", "devoured"
  ], [
      req.body.burger_name, false
    ], function () {
      // Send back the ID of the new burger
      res.redirect("/burgers");
    });
});

router.post("/api/burgers/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  burger.devoured({
    devoured: req.body.devoured
  }, condition, function (data) {
    res.redirect("/burgers");
  });
});

// Export routes for server.js to use.
module.exports = router;
