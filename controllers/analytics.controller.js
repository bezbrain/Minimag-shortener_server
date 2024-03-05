const express = require("express");
const admin = require("firebase-admin");
const { google } = require("googleapis");
const axios = require("axios");
const { firebase } = require("googleapis/build/src/apis/firebase");
require("dotenv").config();
const UnauthenticatedError = require("../errors/unauthenticated");

const app = express();

// Retrieve the path to the JSON file from environment variables
const serviceAccountPath = process.env.SERVICE_ACCOUNT_CREDENTIAL;

// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require(`../${serviceAccountPath}`);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware to handle JSON bodies
// app.use(express.json());

const firebaseAnalytics = async (req, res) => {
  try {
    // const accessToken = await admin
    //   .auth()
    //   .createCustomToken("serviceAccountUserId");
    const userId = req.user.userId;

    if (!userId) {
      throw new UnauthenticatedError("User does not exist");
    }
    const accessToken = await admin.auth().createCustomToken(userId);

    console.log(accessToken);

    const response = await axios.post(
      "https://analyticsdata.googleapis.com/v1beta/properties/429069318:runReport",
      // "https://analyticsdata.googleapis.com/v1alpha:runReport",
      {
        dateRanges: [{ startDate: "2023-09-01", endDate: "2024-03-05" }],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response);
    res.send("Firebase Analytics");
  } catch (error) {
    console.log(error);
    console.log("error");
    res.send("Error occurred");
  }
};

module.exports = {
  firebaseAnalytics,
};
