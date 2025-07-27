import { headers } from "next/headers";
import dbconnect from "../../../../config/db";
import PostItem from "../../../../models/Postitem";

dbconnect()

export async function GET(){
  const postItems = await PostItem.find().select('-__v');
  return Response.json(postItems);
}
  
export async function POST(request: Request) {
  const postItem = await request.json()

  try{
    const savedItem = await new PostItem({...postItem}).save();
    return new Response(JSON.stringify(savedItem), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 201,
  }); 
 } catch (error){
  return new Response(JSON.stringify({message: 'SRVER ERROR'}), {
    status: 500
  });
 }
}