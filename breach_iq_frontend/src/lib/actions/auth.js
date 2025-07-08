"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { backend_base_url } from "../constants";
import axiosInstance from "../axios";

export const handleGoogleLogin = async () => {
  try {
    console.log("Redirecting please wait");
    // redirect(`${backend_base_url}/users/oauth/google`);
    redirect(`${axiosInstance.defaults.baseURL}/users/oauth/google`);
  } catch (error) {
    console.error("Error initiating Google login:", error);
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    const cookieStore = cookies();

    cookieStore.delete("token");
    redirect("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("token");

    if (!authToken) {
      return null;
    }

    // // const response = await fetch(`${backend_base_url}/users/me`, {
    // //   method: "GET",
    // //   headers: {
    // //     "Content-Type": "application/json",
    // //     Cookie: `token=${authToken.value}`, // Send token as cookie
    // //   },
    // //   cache: "no-store", // Ensure fresh data
    // // });

    // if (!response.ok) {
    //   console.log("API response not OK:");
    //   return null;
    // }

    // const userData = await response.json();

    const res = await axiosInstance.get("/users/me", {
      headers: {
        Cookie: `token=${authToken.value}`,
      },
    });

    // return userData.success ? userData.data : null;
    return res.data?.success ? res.data.data : null;
  } catch (error) {
    // console.error("Error fetching user data:", error);
    console.error("Error fetching user data:", error?.response?.data || error);
    return null;
  }
};

export const checkAuthStatus = async () => {
  try {
    // const cookieStore = await cookies();
    // const authToken = cookieStore.get("token");

    // if (!authToken) {
    //   return { isAuthenticated: false, user: null };
    // }

    // const userData = await getUserData();

    // const data = {
    //   isAuthenticated: !!userData,
    //   user: userData,
    // };
    // return data;

    const user = await getUserData();
    return {
      isAuthenticated: !!user,
      user,
    };
  } catch (error) {
    console.error("Error checking auth status:", error);
    return { isAuthenticated: false, user: null };
  }
};
