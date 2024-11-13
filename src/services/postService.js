import { countAllPosts, createPost, deletePostById, findAllPosts, findPostById,  updatePostById } from "../repositories/postRepository.js";
import Comment from "../schema/comment.js";

export const createPostService = async (createPostObejct) => {
    const caption = createPostObejct.caption?.trim();
    const image = createPostObejct.image;
    const user = createPostObejct.user; 

    const post = await createPost(caption, image, user);

    return post;
}

export const getAllPostsService = async (offset, limit) => {
    const posts = await findAllPosts(offset, limit);

    // Calculate total number of posts and total number of pages
    const totalDocuments = await countAllPosts();

    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        posts, totalPages, totalDocuments
    }

}

// new service 
export async function getCommentsByIds(commentIds) {
    try {
        const comments = await Comment.find({ _id: { $in: commentIds } });
        return comments;
    } catch (error) {
        throw new Error('Error fetching comments by IDs');
    }
}

export const deletePostService = async (id, user) => {
    // call the repository function
    const post = await findPostById(id);
    if(post.user != user) {
        throw {
            status: 401,
            message: "Unauthorized"
        }
    }
    const response = await deletePostById(id);
    return response;
}




export const updatePostService = async (id, updateObject) => {
    // call the repository function
    // hW: try top impl the logic to delete old image from aws in case of update of post image
    const response = await updatePostById(id, updateObject);
    return response;
}