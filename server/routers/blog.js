const upload = require("../middlewares/fileUpload");
const blogController = require("../controllers/Blog");

const router = require("express").Router();

router.post("/create", upload.single("image"), blogController.createBlog);
router.get("/get-all",  blogController.getAll);
router.get("/get/:slug",  blogController.getBySlug);
router.get("/single/:id",  blogController.getById);
// router.put("/update",  blogController.getById);

module.exports = router;
