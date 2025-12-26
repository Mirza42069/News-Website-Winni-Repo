import dbconnect from "../../../../config/db";
import PostItem from "../../../../models/Postitem";

dbconnect();

export async function GET() {
  const postItems = await PostItem.find().select("-__v");
  return Response.json(postItems);
}

export async function POST(request: Request) {
  const postItem = await request.json();

  // Server-side password validation
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return new Response(JSON.stringify({ message: "Server configuration error" }), {
      status: 500,
    });
  }
  
  if (!postItem.password || postItem.password !== adminPassword) {
    return new Response(JSON.stringify({ message: "Unauthorized: Invalid admin password" }), {
      status: 401,
    });
  }

  // Remove password from data before saving
  const { password, ...postData } = postItem;

  try {
    const savedItem = await new PostItem({ ...postData }).save();
    return new Response(JSON.stringify(savedItem), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "SERVER ERROR" }), {
      status: 500,
    });
  }
}
