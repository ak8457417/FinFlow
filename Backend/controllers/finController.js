import FinancialPlan from '../models/finModel.js';

// Add new financial plan
export const addPlan = async (req, res) => {
    try {
        const {
            name,
            income,
            expenses,
            goalDescription,
            goalAmount,
            timeframe,
            monthlySavingAmount,
            adjustedGoalAmount,
            financialPlan
        } = req.body;

        // Validate required fields
        if (!name || !income || !expenses || !goalDescription || !goalAmount || !timeframe) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // Create new financial plan
        const newPlan = new FinancialPlan({
            name,
            income,
            expenses,
            goalDescription,
            goalAmount,
            timeframe,
            monthlySavingAmount,
            adjustedGoalAmount,
            financialPlan
        });

        // Save to database
        const savedPlan = await newPlan.save();
        res.status(201).json(savedPlan);
    } catch (error) {
        console.error('Error adding plan:', error);
        res.status(500).json({ message: 'Error creating financial plan', error: error.message });
    }
};

// Get all plans for a user
export const getPlans = async (req, res) => {
    try {

        const plans = await FinancialPlan.find()
            // .sort({ createdAt: -1 })
            // .limit(10);

        res.status(200).json(plans);
    } catch (error) {
        console.error('Error getting plans:', error);
        res.status(500).json({ message: 'Error retrieving financial plans', error: error.message });
    }
};

// Get a specific plan by ID
export const getPlanById = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await FinancialPlan.findById(id);

        if (!plan) {
            return res.status(404).json({ message: 'Financial plan not found' });
        }

        res.status(200).json(plan);
    } catch (error) {
        console.error('Error getting plan:', error);
        res.status(500).json({ message: 'Error retrieving financial plan', error: error.message });
    }
};

// Delete a plan
export const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPlan = await FinancialPlan.findByIdAndDelete(id);

        if (!deletedPlan) {
            return res.status(404).json({ message: 'Financial plan not found' });
        }

        res.status(200).json({ message: 'Financial plan deleted successfully' });
    } catch (error) {
        console.error('Error deleting plan:', error);
        res.status(500).json({ message: 'Error deleting financial plan', error: error.message });
    }
};

// Update a plan
export const updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedPlan = await FinancialPlan.findByIdAndUpdate(
            id,
            { ...updates, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({ message: 'Financial plan not found' });
        }

        res.status(200).json(updatedPlan);
    } catch (error) {
        console.error('Error updating plan:', error);
        res.status(500).json({ message: 'Error updating financial plan', error: error.message });
    }
};