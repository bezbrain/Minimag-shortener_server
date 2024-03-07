const express = require("express");
const admin = require("firebase-admin");
const axios = require("axios");
require("dotenv").config();

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
          name: "eventName",
        },
      ],
      metrics: [
        {
          name: "eventCount",
        },
        // {
        //   name: "activeUsers",
        // },
        // {
        //   name: "totalUsers",
        // },
        // {
        //   name: "screenPageViews",
        // },
        // {
        //   name: "userEngagementDuration",
        // },
        // {
        //   name: "eventCount",
        // },
      ],
    });

    // console.log(response);

    let urlAnalyticsData = {};

    response.rows.forEach((row) => {
      // Extract event name and count
      const eventName = row.dimensionValues[0].value;
      const eventCount = parseInt(row.metricValues[0].value);

      // Extract only event name with CustomUrlVisited and shortUrlVisited
      if (
        eventName.startsWith("CustomUrlVisited") ||
        eventName.startsWith("shortUrlVisited")
      ) {
        // Exclude extracted event names that include "undefined"
        if (!eventName.includes("undefined")) {
          // Add event name and count to urlAnalyticsData object
          urlAnalyticsData[eventName] = eventCount;
        }
      }
    });

    console.log(urlAnalyticsData);

    res.send("Request successful");
  } catch (error) {
    console.log(error);
    res.send("Request failed");
  }
};

module.exports = {
  firebaseAnalytics,
};
