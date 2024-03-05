const express = require("express");
const admin = require("firebase-admin");
const axios = require("axios");
require("dotenv").config();
const UnauthenticatedError = require("../errors/unauthenticated");

const propertyId = 429069318;
// Imports the Google Analytics Data API client library.
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Using a default constructor instructs the client to use the credentials, specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

const firebaseAnalytics = async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "2020-03-31",
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "city",
        },
      ],
      metrics: [
        {
          name: "activeUsers",
        },
      ],
    });

    console.log("Report result:");
    response.rows.forEach((row) => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });

    res.send("Request successful");
  } catch (error) {
    console.log(error);
    res.send("Request failed");
  }
};

module.exports = {
  firebaseAnalytics,
};
