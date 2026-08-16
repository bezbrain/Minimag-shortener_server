import "dotenv/config";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = 429069318;

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const analyticsDataClient = new BetaAnalyticsDataClient();

const firebaseAnalytics = async (_req: Request, res: Response) => {
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

    const urlAnalyticsData: Record<string, string | null | undefined> = {};

    response.rows?.forEach((row) => {
      const totalUsers = row.metricValues?.[0]?.value;
      const screenPageViews = row.metricValues?.[1]?.value;
      const userEngagement = row.metricValues?.[2]?.value;

      urlAnalyticsData.totalUsers = totalUsers;
      urlAnalyticsData.screenPageViews = screenPageViews;
      urlAnalyticsData.userEngagement = userEngagement;
    });

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

const customEventsAnalytics = async (_req: Request, res: Response) => {
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

    const urlAnalyticsData: Record<string, number> = {};

    response.rows?.forEach((row) => {
      const eventName = row.dimensionValues?.[0]?.value;
      const eventCount = parseInt(row.metricValues?.[0]?.value ?? "0", 10);

      if (eventName === "customUrlVisited" || eventName === "shortUrlVisited") {
        urlAnalyticsData[eventName] = eventCount;
      }
    });

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

export { firebaseAnalytics, customEventsAnalytics };
