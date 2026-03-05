const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const flash = require("connect-flash");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

router.route("/").get(wrapAsync(ListingController.index)).post(
  isLoggedIn, // 1. Is the user logged in?
  upload.single("listing[image][url]"), // 2. Parse the file and body FIRST
  validateListing, // 3. Now validate the parsed body
  wrapAsync(ListingController.createListings), // 4. Create the listing
);

// route("/")
// .get( wrapAsync(ListingController.index))
// // .post(
// //   isLoggedIn, // Check authentication FIRST
// //   validateListing, // Then validate
// //   wrapAsync(ListingController.createListings),
// // );
// .post(upload.single('listing[image][url]'),(req,res)=>{
//   res.send(req.file);
// });

// NEW ROUTE
router.get("/new", isLoggedIn, ListingController.renderNewForm);

// SHOW ROUTE
router.get("/:id", wrapAsync(ListingController.showListings));

// EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.editListings),
);

// UPDATE ROUTE
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image][url]"),
  validateListing,
  wrapAsync(ListingController.updateListings),
);

// DELETE ROUTE
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.destroyListings),
);
module.exports = router;
