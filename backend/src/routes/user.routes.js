const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

/*
 * GET /api/users/
 *
 * Purpose: Return a paginated list of users.
 * Middleware: `authMiddleware.authMiddleware` ensures the request is authenticated.
 *             `roleMiddleware.roleMiddleware` ensures the caller has sufficient role (admin).
 */
router.get(
  "/",
  authMiddleware.authMiddleware,
  roleMiddleware.roleMiddleware,
  userController.getUsersController,
);

router.post(
  "/register",
  /*
   * POST /api/users/register
   *
   * Purpose: Create a new user (admin-only operation).
   * Middleware: Auth + role check to restrict who can create users.
   */
  authMiddleware.authMiddleware,
  roleMiddleware.roleMiddleware,
  userController.registerUserController,
);

router.delete(
  "/delete/:id",
  /*
   * DELETE /api/users/delete/:id
   *
   * Purpose: Delete a user by id. Typically restricted to admin roles.
   * Middleware: Auth + role check.
   */
  authMiddleware.authMiddleware,
  roleMiddleware.roleMiddleware,
  userController.deleteUserController,
);

router.patch(
  "/update/:id",
  /*
   * PUT /api/users/update/:id
   *
   * Purpose: Update user details for the given id. Usually admin-only.
   * Middleware: Auth + role check.
   */
  authMiddleware.authMiddleware,
  roleMiddleware.roleMiddleware,
  userController.updateUserController,
);


module.exports = router;
