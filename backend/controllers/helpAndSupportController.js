import HelpAndSupport from '../models/UserHelpSupport.js';

// Create a new help and support ticket
export const createTicket = async (req, res) => {
  const { user, subject } = req.body;

  try {
    const newTicket = new HelpAndSupport({
      user,
      subject,
      messages: [], // Initially no messages
      status: 'open', // Default status
    });

    const savedTicket = await newTicket.save();
    res.status(201).json({
      success: true,
      ticket: savedTicket,
    });
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create ticket',
    });
  }
};

// Add a message to a support ticket
export const addMessage = async (req, res) => {
  const { ticketId, sender, content } = req.body;

//   if (!['user', 'support'].includes(sender)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid sender, must be "user" or "support"',
//     });
//   }

  try {
    const ticket = await HelpAndSupport.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    // Add the new message to the ticket's messages array
    ticket.messages.push({
      sender,
      content,
      timestamp: Date.now(),
    });

    // Update the ticket's status if it is a support reply and needs to be marked as 'in-progress'
    if (sender === 'support' && ticket.status === 'open') {
      ticket.status = 'in-progress';
    }

    ticket.updatedAt = Date.now(); // Update the `updatedAt` field
    await ticket.save();

    res.status(200).json({
      success: true,
      message: 'Message added successfully',
      ticket,
    });
  } catch (err) {
    console.error('Error adding message:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to add message',
    });
  }
};

// Get all tickets of a user (admin can see all)
export const getTicketsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(userId)
    const tickets = await HelpAndSupport.find({ user: userId });

    if (tickets.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No tickets found for this user',
      });
    }

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (err) {
    console.error('Error retrieving tickets:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve tickets',
    });
  }
};

// Get a specific ticket by its ID
export const getTicketById = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await HelpAndSupport.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (err) {
    console.error('Error retrieving ticket:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve ticket',
    });
  }
};

// Update the status of a ticket (e.g., 'in-progress', 'resolved', 'closed')
export const updateTicketStatus = async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;

  const validStatuses = ['open', 'in-progress', 'resolved', 'closed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status',
    });
  }

  try {
    const ticket = await HelpAndSupport.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    ticket.status = status;
    ticket.updatedAt = Date.now(); // Update the updatedAt field
    await ticket.save();

    res.status(200).json({
      success: true,
      message: 'Ticket status updated successfully',
      ticket,
    });
  } catch (err) {
    console.error('Error updating ticket status:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update ticket status',
    });
  }
};
