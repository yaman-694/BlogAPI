
import { Request, Response } from 'express';
import { BlogModel, BlogPostDocument } from '../models/blogModel'; // Replace with your actual model and schema
import { CustomRequest } from '../interfaces/interfaces';
interface utils {
    Id: string;
}
const createBlogController = async (req: CustomRequest, res: Response) => {
    try {
        // Validate the incoming request data if necessary
        const userId = req.user.userId;
        // Create a new blog post object based on your model/schema
        const newBlogPost: BlogPostDocument = new BlogModel({
            title: req.body.title,
            content: req.body.content,
            author: userId,
        });

        // Save the new blog post to your database
        const savedBlogPost = await newBlogPost.save();
        console.log(savedBlogPost)

        // a success response with the created blog post
        return res.status(201).json({data: savedBlogPost, error: {}});
    } catch (error) {
        // Handle any errors, e.g., validation errors or database errors
        console.error('Error creating blog post:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getBlogsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogPosts = await BlogModel.find();
        res.status(200).json({data: blogPosts, error: {}});
    } catch (error) {
        console.error('Error getting blog posts:', error);
        res.status(500).json({ error: 'Internal server error', data:{} });
    }
};

const getBlogController = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogId = req.params.id as utils['Id'];
        const blogPost = await BlogModel.findById(blogId);
        if(!blogPost) {
            res.status(404).json({ error: 'Blog post not found', data:{} });
            return;
        }
        res.status(200).json({data: blogPost, error: {}});
    } catch (error) {
        console.error('Error getting blog post:', error);
        res.status(500).json({ error: 'Internal server error', data:{} });
    }
};

const updateBlogController = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const blogId = req.params.id as utils['Id'];
        const { title, content } = req.body;
        const blogObj = await BlogModel.findById(blogId);
        if(blogObj?.author.toString() !== req.user.userId.toString()) {
            res.status(401).json({ error: 'Unauthorized', data:{} });
            return;
        }
        const UpdateBlog = await BlogModel.findByIdAndUpdate(blogId, { title, content }, { new: true });
        if(!UpdateBlog) {
            res.status(404).json({ error: 'Blog post not found', data:{} });
            return;
        }
        res.status(200).json({data: UpdateBlog, error: {}});
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ error: 'Internal server error', data:{} });
    }
};

const deleteBlogController = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const blogId = req.params.id as utils['Id'];
        const blogObj = await BlogModel.findById(blogId);
        if(blogObj?.author.toString() !== req.user.userId.toString()) {
            res.status(401).json({ error: 'Unauthorized', data:{} });
            return;
        }
        if(!blogObj) {
            res.status(404).json({ error: 'Blog post not found', data:{} });
            return;
        }
        const DeleteBlog = await BlogModel.findByIdAndDelete(blogId);
        res.status(200).json({data: DeleteBlog, error: {}});
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Internal server error', data:{} });
    }
};

export {
    createBlogController,
    getBlogsController,
    getBlogController,
    updateBlogController,
    deleteBlogController
};