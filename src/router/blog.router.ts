import { Router } from "express";
import { createBlogController, deleteBlogController, getBlogController, getBlogsController, updateBlogController } from "../controllers/blog.controller";
import { postVerify } from "../middlewares/post-verify";


const router = Router();

// create
router.post("/create-blog", createBlogController as any);
// read
router.get("/get-blogs", getBlogsController);
router.get("/get-blogs/:id", getBlogController);
// update
router.put("/update-blog/:id", postVerify as any, updateBlogController as any);
// delete
router.delete("/delete-blog/:id", postVerify as any, deleteBlogController as any);

export default router;