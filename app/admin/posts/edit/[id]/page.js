import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import PostEditor from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Post - VIDO Admin",
};

export default async function EditPostPage({ params }) {
  await dbConnect();
  const post = await Post.findById(params.id).lean();
  if (!post) notFound();

  return (
    <div>
      <div className="admin-page-header">
        <h1>Edit Post</h1>
      </div>
      <PostEditor post={{ ...post, _id: post._id.toString() }} />
    </div>
  );
}
