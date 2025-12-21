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
  try {
    const postItem = await PostItem.findByIdAndUpdate(id, {
      ...updatedItem,
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
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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
