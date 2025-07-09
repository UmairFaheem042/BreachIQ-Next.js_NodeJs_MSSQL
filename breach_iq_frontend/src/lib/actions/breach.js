"use server";

import { cookies } from "next/headers";
import axiosInstance from "../axios";

export const getEmailToTrackDetails = async () => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("token");

    if (!authToken) {
      return { success: false, message: "Unauthorized" };
    }

    const { data } = await axiosInstance.get("/tracked-emails/track", {
      headers: {
        Cookie: `token=${authToken.value}`,
      },
    });

    return {
      success: true,
      message: data?.message,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || "Scan failed",
    };
  }
};

export const getAllBreaches = async () => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("token");

    if (!authToken) {
      return null;
    }

    const { data } = await axiosInstance.get("/tracked-emails", {
      headers: {
        Cookie: `token=${authToken.value}`,
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch breaches:", error?.response?.data || error);
  }
};

export const getAllBreachHistory = async (page = 1) => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("token");

    if (!authToken) {
      return null;
    }

    const { data } = await axiosInstance.get(
      `/tracked-emails/history?page=${page}`,
      {
        headers: {
          Cookie: `token=${authToken.value}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error getting breach history:", error);
    return null;
  }
};

export const getLastBreach = async () => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("token");

    if (!authToken) {
      return null;
    }

    const { data } = await axiosInstance.get("/breaches/all", {
      headers: {
        Cookie: `token=${authToken.value}`,
      },
    });

    return data?.data;
  } catch (error) {
    console.error("Error getting last breach:", error?.response?.data || error);
    return null;
  }
};
