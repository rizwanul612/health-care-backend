import { Router } from "express";
import { userControllerObj } from "./user.controller";

const router = Router();
router.post('/create-doctor', userControllerObj.createUserController);
// router.get('/', specialtyControllerObj.getAllSpecialtyController);
// router.delete('/:id', specialtyControllerObj.deleteSpecialtyController);

export const UserRoutes = router;