const express = require("express");
const {
  addCard,
  getAllSharedCards,
  addCardInShareCard,
} = require("../controller/card");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router
  .route("/card")
  .post(isLoggedIn, addCard)
  .get(isLoggedIn, getAllSharedCards);

router.route("/card/scan").post(isLoggedIn, addCardInShareCard);
module.exports = router;
