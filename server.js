const express = require("express");
const cors = require("cors");
const multer = require("multer");
const connectDB = require("./config/db");
const Person = require("./modules/personSchema");
const Profile = require("./modules/profileSchema");
const SocialMedia = require("./modules/socialMediaSchema");
const Features = require("./modules/featuresSchema");
const Experience = require("./modules/experienceSchema");
const Portfolio = require("./modules/portfolioSchema");
const app = express();
const upload = multer();
const port = 4000;

app.use(cors());
app.use(express.json());

// Connecting to MongoDB
connectDB();

app.post(
  "/",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "pictures", maxCount: 4 },
    { name: "videos", maxCount: 3 },
  ]),
  async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      gender,
      dateOfBirth,
      city,
    } = req.body;

    const { instaHandle, fbHandle } = req.body;
    const {
      ethnicity,
      height,
      heightUnit,
      chestSize,
      waistSize,
      eyeColor,
      hairColor,
      atypicalFeatures,
    } = req.body;

    const {
      jobType,
      spokenLanguages,
      additionalExperiences,
      experienceLevel,
      detailsOfExperiences,
    } = req.body;
    try {
      const fileData = {
        filename: req.files.photo[0].originalname,
        contentType: req.files.photo[0].mimetype,
        data: req.files.photo[0].buffer,
      };

      const pictures = req.files.pictures.map((file) => ({
        filename: file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
      }));

      const videos = req.files.videos.map((file) => ({
        filename: file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
      }));

      const profileData = new Profile({
        firstName,
        lastName,
        email,
        mobileNumber,
        gender,
        dateOfBirth,
        city,
        photo: fileData,
      });

      // Create a new social media object with the necessary properties
      const socialMediaData = new SocialMedia({
        instaHandle,
        fbHandle,
      });

      const features = new Features({
        ethnicity,
        height,
        heightUnit,
        chestSize,
        waistSize,
        eyeColor,
        hairColor,
        atypicalFeatures,
      });
      const experience = new Experience({
        jobType,
        spokenLanguages,
        additionalExperiences,
        experienceLevel,
        detailsOfExperiences,
      });
      const portfolio = new Portfolio({
        pictures,
        videos,
      });

      await socialMediaData.save();
      await profileData.save();
      await features.save();
      await experience.save();
      await portfolio.save();
      // Create the person document with the associated profile and social media
      const person = new Person({
        profile: profileData,
        socialMedia: socialMediaData,
        features: features,
        experience: experience,
        portfolio: portfolio,
      });

      await person.save();
      console.log("Form Submitted");
      res.json({ msg: "Form Submitted Successfully", person });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

app.use((error, req, res, next) => {
  console.log(error);
});

app.get("/api/profiles", async (req, res) => {
  try {
    const persons = await Person.find().populate({
      path: "profile",
      select: "-__v",
    });
    if (!persons || persons.length === 0) {
      return res.status(404).json({ error: "No persons found" });
    }
    const formattedPersons = persons.map((person) => {
      const { _id, profile } = person;
      const formattedProfile = {
        _id: person._id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        photo: profile.photo,
      };
      return formattedProfile;
    });
    res.json(formattedPersons);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/persons/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id)
      .populate("profile", "-_id -__v")
      .populate("socialMedia", "-_id -__v")
      .populate("features", "-_id -__v")
      .populate("experience", "-_id -__v")
      .populate("portfolio", "-_id -__v");

    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.json(person);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
