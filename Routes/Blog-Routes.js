const express = require("express");
const {
  getAllblogs,
  addblogs,
  updateblogs,
  getoneID,
  deleteID,
  userID,
} = require("../controllers/Blog-controller");

const router = express.Router();
router.get("/", getAllblogs);
router.post("/add", addblogs);
router.put("/update/:id", updateblogs);
router.get("/:id", getoneID);
router.delete("/:id", deleteID);
router.get("/user/:id", userID);

module.exports = router;
