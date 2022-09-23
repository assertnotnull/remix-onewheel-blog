import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getPostListings } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListings>>;
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({ posts: await getPostListings() });
};

export default function PostsRoute() {
  const { posts } = useLoaderData<LoaderData>();
  const adminUser = useOptionalAdminUser();

  return (
    <main>
      <h1>Posts</h1>
      {adminUser && (
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              prefetch="intent" //prefetch post on a slow network based on user mouse over
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
