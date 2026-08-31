import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostEditor from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Post - VIDO Admin",
};

export default async function EditPostPage({ params }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <div>
      <div className="admin-page-header">
        <h1>Edit Post</h1>
      </div>
      <PostEditor post={post} />
    </div>
  );
}
