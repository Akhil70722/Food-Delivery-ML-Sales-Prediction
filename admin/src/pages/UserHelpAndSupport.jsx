import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserHelpAndSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the user's tickets and messages when the component mounts
  const fetchTickets = async () => {
    try {
      const userId = localStorage.getItem('user'); // Assuming user ID is stored in localStorage
      const response = await axios.get(`http://localhost:4000/api/help-support/user`);
      console.log(response)
      setTickets(response.data.tickets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };
  const updateTicketStatus = async (ticket, status) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:4000/api/help-support/${ticket._id}/status`, {
        status,
      });
      await fetchTickets();
      setLoading(false);
    } catch (error) {
      console.error('Error updating ticket:', error);
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchTickets();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">User Help and Support</h1>

      {loading ? (
        <p className="text-center text-xl text-gray-500">Loading your tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-center text-xl text-gray-500">You have no support tickets.</p>
      ) : (
        <div className="space-y-6">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-2xl font-semibold text-gray-900">{ticket.subject}</p>
              <p className="text-lg font-medium text-gray-600">Order ID: {ticket.orderId}</p>
              <p className="text-gray-600 mb-4">Status: <span className="font-medium text-blue-500">{ticket.status}</span></p>
              <p className="text-gray-600 mb-4">Created on: {new Date(ticket.createdAt).toLocaleString()}</p>
              {ticket.status === "open" ? <button type="button" className="p-2 bg-gray-300"
              onClick={() => updateTicketStatus(ticket, 'in-progress')}
              >
                Mark as In Progress
              </button>: <></>}
              {ticket.status === "in-progress" ? <button type="button" className="p-2 bg-gray-300"
              onClick={() => updateTicketStatus(ticket, 'resolved')}
              >
                Mark as resolved
              </button>: <></>}

              {/* <div className="messages space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Messages:</h3>
                {ticket.messages.length === 0 ? (
                  <p className="text-gray-500">No messages yet.</p>
                ) : (
                  ticket.messages.map((msg, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                      <p className="font-medium text-gray-800">{msg.sender}:</p>
                      <p className="text-gray-700">{msg.content}</p>
                      <p className="text-sm text-gray-500 mt-2">{new Date(msg.timestamp).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHelpAndSupport;
