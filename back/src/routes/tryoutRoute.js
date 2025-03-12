import express from "express";

import * as tryoutController from "../controllers/tryoutController.js";

const router = express.Router();

/**
 * @swagger
 * /tryout:
 *   get:
 *     summary: Get All Tryout
 *     responses:
 *       200:
 *         description: Tryout retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get("/tryout", tryoutController.getTryout);

/**
 * @swagger
 * /tryout:
 *   post:
 *     summary: Create New Tryout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-25T14:00:00Z"
 *               isactive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tryout created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/tryout", tryoutController.createTryout);

/**
 * @swagger
 * /tryout/{id}:
 *   put:
 *     summary: Update Tryout by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               end_time:
 *                 type: string
 *                 format: date-time
 *               isactive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tryout updated successfully
 *       404:
 *         description: Tryout not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/tryout/:id", tryoutController.updateTryout);

/**
 * @swagger
 * /tryout/{id}:
 *   delete:
 *     summary: Delete Tryout by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tryout deleted successfully
 *       404:
 *         description: Tryout not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/tryout/:id", tryoutController.deleteTryout);

/**
 * @swagger
 * /tryout/search:
 *   get:
 *     summary: Search Tryout by Name
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results retrieved
 *       500:
 *         description: Internal Server Error
 */
router.get("/tryout/search", tryoutController.searchTryout);

export default router;
