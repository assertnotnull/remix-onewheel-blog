import { Outlet } from "@remix-run/react";

/** default behavior of the route */
export default function PostsRoute() {
  return <Outlet />;
}

/** catch errors in the /posts route */
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="text-red-500">
      Oh no somthing went wrong
      <pre>{error.message}</pre>
    </div>
  );
}
