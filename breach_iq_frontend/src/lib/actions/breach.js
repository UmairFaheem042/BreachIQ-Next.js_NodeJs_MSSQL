"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { backend_base_url } from "../constants";
import axiosInstance from "../axios";

export const getEmailToTrackDetails = async () => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("token");

    if (!authToken) {
      // return null;
      return { success: false, message: "Unauthorized" };
    }

    // const response = await fetch(`${backend_base_url}/tracked-emails/track`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Cookie: `token=${authToken.value}`, // Send token as cookie
    //   },
    //   cache: "no-store", // Ensure fresh data
    // });

    // if (!response.ok) {
    //   return {
    //     success: false,
    //     message: data?.message,
    //   };
    // }

    // const data = await response.json();

    // return {
    //   success: true,
    //   message: data?.message,
    // };

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
    console.log(error);
    return {
      success: false,
      message: error?.response?.data?.message || "Scan failed",
    };
  }
  // redirect(`/dashboard`);
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
    // console.log(error);
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
    // console.log(error);
    console.error(
      "Error getting breach history:",
      error?.response?.data || error
    );
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
    // console.error(error);
    console.error("Error getting last breach:", error?.response?.data || error);
    return null;
  }
};
