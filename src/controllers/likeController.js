import { addLikeToParent } from '../repositories/likesRepository.js';
import { toggleLike } from '../services/likeService.js';

export const postLikes = async (req, res) => {
    const { onModel, likeableId } = req.body;
    const userId = req.user?._id;

    if (!onModel || !likeableId || !userId) {
        return res.status(400).json({ success: false, message: "Invalid request data. 'onModel', 'likeableId', and user ID are required." });
    }

    try {
        const result = await toggleLike({ onModel, likeableId, userId });

        // If like was added, add it to the parent document (Post or Comment)
        if (result.liked) {
            await addLikeToParent(onModel, likeableId, result.likeId);
        }

        res.status(200).json({ success: true, message: result.message, liked: result.liked });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ success: false, message: "Invalid data format.", error: error.message });
        } else if (error.name === 'CastError') {
            res.status(400).json({ success: false, message: "Invalid ID format.", error: error.message });
        } else {
            console.error("Unexpected error in postLikes:", error);
            res.status(500).json({ success: false, message: "An unexpected error occurred. Please try again later." });
        }
    }
};
