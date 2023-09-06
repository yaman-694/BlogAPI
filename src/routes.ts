import userRoute from "./router/user.router";
import blogRoute from "./router/blog.router";

export const ROUTER = [
  {
    path: "/user",
    router: userRoute,
  },
  {
    path: "/blog",
    router: blogRoute,
  },
];
