
import { findLike, addLike, removeLike, addLikeToParent, removeLikeFromParent } from '../repositories/likesRepository.js';

export const toggleLike = async ({ onModel, likeableId, userId }) => {
    const existingLike = await findLike({ onModel, likeableId, userId });
    
    if (existingLike) {
        await removeLike(existingLike._id);
        await removeLikeFromParent(onModel, likeableId, existingLike._id); // Remove like from parent
        return { liked: false, message: "Like removed" };
    } else {
        const newLike = await addLike({ onModel, likeableId, userId });
        await addLikeToParent(onModel, likeableId, newLike._id); // Add like to parent
        return { liked: true, message: "Like added", likeId: newLike._id };
    }
};
