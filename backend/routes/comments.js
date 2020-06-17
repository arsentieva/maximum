const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { Story, User, Comments } = db;

router.use(requireAuth);

router.get("/")

module.exports = router;
