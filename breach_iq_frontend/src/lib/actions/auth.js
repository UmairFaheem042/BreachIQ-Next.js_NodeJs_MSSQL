"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axiosInstance from "../axios";

export const handleGoogleLogin = async () => {
  try {
    console.log("Redirecting please wait");
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

    const res = await axiosInstance.get("/users/me", {
      headers: {
        Cookie: `token=${authToken.value}`,
      },
    });

    return res.data?.success ? res.data.data : null;
  } catch (error) {
    console.error("Error fetching user data:", error?.response?.data || error);
    return null;
  }
};

export const checkAuthStatus = async () => {
  try {
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
