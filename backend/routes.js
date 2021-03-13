"use strict";

const express = require("express");
const router = express.Router();
const handler = require("./controllers.js");
router.get("/naamList", handler.naamList);
router.get("/materiaalList/:naam", handler.materiaalList);
router.post("/afhalen", handler.afhalen);
router.post("/terugbrengen", handler.terugbrengen);

module.exports = router;
