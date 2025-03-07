import express from 'express';
import {
    addPlan,
    getPlans,
    getPlanById,
    deletePlan,
    updatePlan
} from '../controllers/finController.js';

const router = express.Router();

// Create new financial plan
router.post('/plans', addPlan);

// Get all financial plans (with optional name filter)
router.get('/plans', getPlans);

// Get specific financial plan by ID
router.get('/plans/:id', getPlanById);

// Delete financial plan
router.delete('/plans/:id', deletePlan);

// Update financial plan
router.put('/plans/:id', updatePlan);

export default router;