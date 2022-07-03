const uplaodImage = require("../util/uploadImage");
const BigPromise = require("../middleware/BigPromise");
const formidable = require("formidable");
const logger = require("../logger");
const Card = require("../model/card");
const User = require("../model/user");

exports.addCard = BigPromise((req, res, next) => {
  const form = new formidable.IncomingForm();
  const user = req.user;
  let logoUri;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err);
    }
    if (!fields.logo) return next(new Error("Please upload a logo"));
    try {
      logoUri = await uplaodImage(fields.logo, "logo");
    } catch (error) {
      logger.error(error);
      return next(new Error("Something went wrong with the image"));
    }

    const card = await Card.create({
      ...fields,
      logo: logoUri.secure_url,
      createdBy: user._id,
    });

    user.card = card._id;
    await user.save();
    return res.status(200).json(card);
  });
});

exports.getAllSharedCards = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("shareCard")
    .select("shareCard")
    .exec();
  let allCard = [];
  user.shareCard.map((card, index) => {
    let object = {};
    object.type = index % 2 === 0 ? "business" : "personal";
    object.name = card.businessName;
    object.logo = card.logo;
    object.imgUrl = "";
    object.details = {
      email: {
        value: card.email,
        show: true,
      },
      phoneNo: {
        value: card.phoneNumber,
        show: true,
      },
      website: {
        value: card.website,
        show: true,
      },
    };
    object.address = card.address;
    object.ownerId = card._id;
    object.versionNo = 0;
    allCard.push(object);
  });
  return res.status(200).json(allCard);
});

exports.addCardInShareCard = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const card = await Card.findById(req.body.cardId);
  if (!card) {
    return next(new Error("Card not found"));
  }
  if (!user.shareCard.includes(card._id)) {
    user.shareCard.push(card._id);
    await user.save();
  }
  return res.status(200).json(user);
});
