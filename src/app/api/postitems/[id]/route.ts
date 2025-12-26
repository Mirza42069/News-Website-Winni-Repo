import dbconnect from "../../../../../config/db";
import PostItem from "../../../../../models/Postitem";

dbconnect();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const postItem = await PostItem.findById(id).select("-__v");
    return Response.json(postItem);
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "No item found for this ID" }),
      { status: 404 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updatedItem = await request.json();

  // Server-side password validation
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return new Response(JSON.stringify({ message: "Server configuration error" }), {
      status: 500,
    });
  }

  if (!updatedItem.password || updatedItem.password !== adminPassword) {
    return new Response(JSON.stringify({ message: "Unauthorized: Invalid admin password" }), {
      status: 401,
    });
  }

  // Remove password from data before updating
  const { password, ...updateData } = updatedItem;

  try {
    const postItem = await PostItem.findByIdAndUpdate(id, {
      ...updateData,
    });
    if (!postItem)
      return new Response(
        JSON.stringify({ message: "No Item Found for this ID" }),
        {
          status: 404,
        }
      );

    return new Response(JSON.stringify(postItem), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "SERVER ERROR" }), {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Server-side password validation
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return new Response(JSON.stringify({ message: "Server configuration error" }), {
      status: 500,
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: "Unauthorized: Password required" }), {
      status: 401,
    });
  }

  if (!body.password || body.password !== adminPassword) {
    return new Response(JSON.stringify({ message: "Unauthorized: Invalid admin password" }), {
      status: 401,
    });
  }

  try {
    const postItem = await PostItem.findByIdAndDelete(id);
    if (!postItem)
      return new Response(
        JSON.stringify({ message: "No Item Found for this ID" }),
        {
          status: 404,
        }
      );
    return new Response(JSON.stringify(postItem), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "SERVER ERROR" }), {
      status: 500,
    });
  }
}
