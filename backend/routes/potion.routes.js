import { Router } from 'express';
import Potion from '#models/potion.model.js';
import potionController from '#controllers/potion.controller.js';

const router = Router();

router.get('/', potionController.findAll);
router.get('/:id', potionController.findByPk);
router.post('/', potionController.create);
router.put('/:id', potionController.update);
router.delete('/:id', potionController.deleteByPk);

export default router;