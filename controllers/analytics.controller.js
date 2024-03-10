require("dotenv").config();
const { StatusCodes } = require("http-status-codes");

const propertyId = 429069318;
// Imports the Google Analytics Data API client library.
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

// process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Using a default constructor instructs the client to use the credentials, specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// GET EVENT VALUES
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
          name: "country",
        },
      ],
      metrics: [
        {
          name: "totalUsers",
        },
        {
          name: "screenPageViews",
        },
        {
          name: "userEngagementDuration",
        },
      ],
    });

    // console.log(response);

    let urlAnalyticsData = {};

    response.rows.forEach((row, i) => {
      // Events values
      const totalUsers = row.metricValues[0].value;
      const screenPageViews = row.metricValues[1].value;
      const userEngagement = row.metricValues[2].value;
      // console.log(totalUsers, screenPageViews, userEngagement);

      urlAnalyticsData.totalUsers = totalUsers;
      urlAnalyticsData.screenPageViews = screenPageViews;
      urlAnalyticsData.userEngagement = userEngagement;
    });

    // console.log(urlAnalyticsData);

    // res.send("Successful");
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successful",
      urlAnalyticsData,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong. Please try again later!",
    });
  }
};

// GET CUSTOM EVENTS VALUES
const customEventsAnalytics = async (req, res) => {
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
      ],
    });

    // console.log(response);

    let urlAnalyticsData = {};

    response.rows.forEach((row, i) => {
      // console.log(row.dimensionValues);
      // console.log(row.metricValues);
      // Extract event name and count
      const eventName = row.dimensionValues[0].value;
      const eventCount = parseInt(row.metricValues[0].value);

      // Extract only event name with CustomUrlVisited and shortUrlVisited
      if (eventName === "CustomUrlVisited" || eventName === "shortUrlVisited") {
        urlAnalyticsData[eventName] = eventCount;
      }
    });

    console.log(urlAnalyticsData);

    // res.send("Successful");
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successful",
      urlAnalyticsData,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong. Please try again later!",
    });
  }
};

module.exports = {
  firebaseAnalytics,
  customEventsAnalytics,
};
