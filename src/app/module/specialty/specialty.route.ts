import { Router } from "express";
import { specialtyControllerObj } from "./specialty.controller";

const router = Router();
router.post('/', specialtyControllerObj.createSpecialtyController);
router.get('/', specialtyControllerObj.getAllSpecialtyController);
router.delete('/:id', specialtyControllerObj.deleteSpecialtyController);

export const SpecialtyRoutes = router;