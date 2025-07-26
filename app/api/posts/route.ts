import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

// GET /api/posts
export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ posts: data });
}

// POST /api/posts
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();
    const category = formData.get("category")?.toString();
    const tagsStr = formData.get("tags")?.toString() || "";
    const slug = formData.get("slug")?.toString() || uuidv4();
    const featuredImage = formData.get("featuredImage") as File | null;
    const videoFile = formData.get("videoFile") as File | null;
    const videoTitle = formData.get("videoTitle")?.toString();
    const videoDescription = formData.get("videoDescription")?.toString();

    // TODO: Handle file uploads to Supabase Storage if needed
    let featuredImageUrl = "";
    let videoUrl = "";

    const tags = tagsStr.split(",").map(tag => tag.trim()).filter(Boolean);

    const { data, error } = await supabase.from("posts").insert([
      {
        title,
        content,
        author,
        category,
        tags,
        slug,
        featured_image: featuredImageUrl,
        video_url: videoUrl,
        video_title: videoTitle,
        video_description: videoDescription,
        status: "PUBLISHED",
      }
    ]).select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Post created", post: data?.[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
