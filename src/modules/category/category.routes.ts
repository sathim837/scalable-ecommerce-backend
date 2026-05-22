import express from 'express';
import * as CategoryController from './category.controller';
import { validateRequest } from '../../common/middleware/validateRequest';
import { createCategoryValidationSchema } from './category.validation';

const router = express.Router();

// router.post(
//   '/',
//   validateRequest(createCategoryValidationSchema),
//   CategoryController.createCategory
// );

router.post(
  '/',  
  validateRequest(createCategoryValidationSchema),
  CategoryController.createCategory
);

router.get('/', CategoryController.getCategories);

export default router;