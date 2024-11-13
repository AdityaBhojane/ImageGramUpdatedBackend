import { findPostByUserId } from '../repositories/postRepository.js';
import { createPostService, deletePostService, getAllPostsService, getCommentsByIds,  updatePostService } from '../services/postService.js';

export async function createPost(req, res) {
    const userDetails = req.user;

    if (!req.file || !req.file.path) {
        return res.status(400).json({
            success: false,
            message: "Image is required"
        });
    }

    const post = await createPostService({ 
        caption: req.body.caption, 
        image: req.file.path, // Cloudinary URL
        user: userDetails._id
    });

    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post
    });
}

// /api/v1/posts?limit=10&offset=0
export async function getAllPosts(req, res) {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const paginatedPosts = await getAllPostsService(offset, limit);

        return res.status(200).json({
            success: true,
            message: "All posts fetched successfully",
            data: paginatedPosts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


// new controller
export async function getPostComment(req, res) {
    try {
        const commentIds = req.query.commentIds;
    
        // Ensure commentIds is an array
        const idsArray = Array.isArray(commentIds) ? commentIds : [commentIds];
    
        const comments = await getCommentsByIds(idsArray); // Implement this function to fetch comments
        return res.status(200).json({
          success: true,
          message: "Comments fetched successfully",
          data: comments,
        });
      } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
}

export async function deletePost(req, res) {
    console.log('del')
    try {
        const postId = req.params.id;
        const response = await deletePostService(postId, req.user._id);
        if(!response) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: response
        })
    } catch(error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export async function updatePost(req, res) {
    try {
        console.log("req file", req.file);
        const updateObject = req.body;
        if(req.file) {
            updateObject.image = req.file.path;
        }
        const response = await updatePostService(req.params.id, updateObject);
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: response
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Function to fetch posts by user ID
export const getPostsByUserId = async (req,res) => {
    try {
      const userId = req.user._id
      const posts = await findPostByUserId(userId)
      res.json({ posts });
    } catch (error) {
      console.error('Error fetching posts by user:', error);
      throw new Error('Could not fetch posts for the user');
    }
  };