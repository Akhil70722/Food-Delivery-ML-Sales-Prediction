import express from 'express';
import * as helpAndSupportController from '../controllers/helpAndSupportController.js'; // Import all controller functions

const router = express.Router();

// Create a new support ticket
router.post('/create', helpAndSupportController.createTicket);

// Add a message to a support ticket
router.post('/message', helpAndSupportController.addMessage);

// Get all tickets by user (replace with appropriate user logic)
router.get('/user/:userId', helpAndSupportController.getTicketsByUser);

router.get('/user', helpAndSupportController.getAllTickets);

// Get a specific ticket by its ID
router.get('/:ticketId', helpAndSupportController.getTicketById);

// Update ticket status (e.g., in-progress, resolved, closed)
router.put('/:ticketId/status', helpAndSupportController.updateTicketStatus);

export default router; // Use export default for exporting the router
