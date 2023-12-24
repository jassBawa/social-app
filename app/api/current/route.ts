import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Wrong http method", { status: 405 });
  }

  try {
    // fetching current user
    const { currentUser } = await serverAuth(req);
    return new Response(JSON.stringify(currentUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 400 });
  }
}
