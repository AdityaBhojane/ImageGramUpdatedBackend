// Here all the post related routes are present
// We look at the remaining url part after /posts
import express from 'express';

// import { s3uploader } from '../../config/multerConfig.js';
import { cloudinaryUploader } from '../../config/multerConfig.js';
import { createPost, deletePost, getAllPosts,  getPostComment, getPostsByUserId, updatePost } from '../../controllers/postController.js';
import { validate } from '../../validators/zodValidator.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
import { isAdmin, isAuthenticated } from '../../middlewares/authMiddleware.js';


const router = express.Router(); // Router object to modularize the routes

/**
 * @swagger
 * /posts:
 *  post:
 *      summary: Create a new post
 *      description: Create a new post
 * 
 */


// router.post('/', isAuthenticated,  s3uploader.single('image'), validate(zodPostSchema), createPost);
router.post('/', isAuthenticated, cloudinaryUploader.single('image'), validate(zodPostSchema), createPost);

router.get('/', getAllPosts);  

router.get('/comments', getPostComment);  


router.get('/user',isAuthenticated, getPostsByUserId);   

router.delete('/:id', isAuthenticated, deletePost);

router.put('/:id', isAuthenticated, isAdmin, cloudinaryUploader.single('image'), updatePost);

export default router;

// wrtie 2 apis to impl deletion of a post and update of a post