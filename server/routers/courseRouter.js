const router = require("express").Router();

const { courseController } = require("../controllers");

router.post("/create", courseController.createCourse);
router.post("/data", courseController.getCourses);

module.exports = router;
