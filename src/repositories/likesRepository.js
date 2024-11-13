import Like from "../schema/like.js";
import Post from "../schema/post.js"; // Assuming a Post schema exists
import Comment from "../schema/comment.js"; // Assuming a Comment schema exists

// Function to add a like to the database
export const addLike = async ({ onModel, likeableId, userId }) => {
    return await Like.create({ onModel, likeableId, user: userId });
};

// Function to find if a like already exists
export const findLike = async ({ onModel, likeableId, userId }) => {
    return await Like.findOne({ onModel, likeableId, user: userId });
};

// Function to remove a like
export const removeLike = async (likeId) => {
    return await Like.findByIdAndDelete(likeId);
};

// Function to add a like to the parent Post or Comment document
export const addLikeToParent = async (onModel, likeableId, likeId) => {
    let parentModel;
    
    if (onModel === 'Post') {
        parentModel = Post;
    } else if (onModel === 'Comment') {
        parentModel = Comment;
    }

    if (parentModel) {
        await parentModel.findByIdAndUpdate(
            likeableId,
            { $addToSet: { likes: likeId } },
            { new: true }
        );
    }
};


// Function to remove a like from the parent Post or Comment document
export const removeLikeFromParent = async (onModel, likeableId, likeId) => {
    let parentModel;
    
    if (onModel === 'Post') {
        parentModel = Post;
    } else if (onModel === 'Comment') {
        parentModel = Comment;
    }

    if (parentModel) {
        await parentModel.findByIdAndUpdate(
            likeableId,
            { $pull: { likes: likeId } }, // Remove likeId from likes array
            { new: true }
        );
    }
};