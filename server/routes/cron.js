const router = require("express").Router();

const CronController = require("../controllers/CronController");

router.get("/keepalive", CronController.keepAlive);

module.exports = router;
