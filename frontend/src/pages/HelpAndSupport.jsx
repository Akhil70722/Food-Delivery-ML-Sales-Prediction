import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HelpAndSupport = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userTickets, setUserTickets] = useState([]);
  const [ticketId, setTicketId] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      setUserData(JSON.parse(localStorage.getItem('user')));
      if (localStorage.getItem('user')) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const fetchTickets = async () => {
    try {
      const userId = userData?.email;
      const response = await axios.get(`http://localhost:4000/api/help-support/user/${userId}`);
      setUserTickets(response.data.tickets);
      // console.log(response)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userLoggedIn) {
      fetchTickets();
      console.log(userTickets)
    }
  }, [userLoggedIn]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return alert('Message cannot be empty!');
    }
    try {
      const response = await axios.post('http://localhost:4000/api/help-support/message', {
        ticketId,
        sender: userData?.email,
        content: message,
      });
      setUserTickets([response.data.ticket, ...userTickets]); // Prepend the new ticket
      setMessage('');
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!subject) {
      return alert('Subject cannot be empty!');
    }
    try {
      const userId = userData?.email;
      const response = await axios.post('http://localhost:4000/api/help-support/create', {
        user: userId,
        subject,
      });
      setUserTickets([response.data.ticket, ...userTickets]);
      setTicketId(response.data.ticket._id);
      setSubject('');
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {userLoggedIn ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-semibold mb-6 text-center">Help and Support</h1>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 ">Previous Requests</h2>
            {loading ? (
              <p className="text-center">Loading your tickets...</p>
            ) : (
              <div>
                {userTickets.length === 0 ? (
                  <p className="text-center">No previous requests found.</p>
                ) : (
                  userTickets.map((ticket) => (
                    <div key={ticket._id} className="ticket flex justify-between mb-6 p-4 border border-gray-300 rounded-md">
                      <h6 className="text-lg ">{ticket.subject}</h6>
                      <p className="text-gray-500">Status: {ticket.status}</p>
                      {/* <div>
                        <h4 className="mt-4 font-medium">Messages:</h4>
                        {ticket.messages.map((msg, index) => (
                          <div key={index} className="mt-2">
                            <p className="font-medium">{msg.sender}:</p>
                            <p>{msg.content}</p>
                            <p className="text-xs text-gray-400">
                              <small>{new Date(msg.timestamp).toLocaleString()}</small>
                            </p>
                          </div>
                        ))}
                      </div> */}
                    </div>
                  ))
                )}

              </div>
            )}
          </div>

          <div>
            {/* {ticketId ? (
              <div>
                <h2 className="text-2xl font-medium mb-4">Add Message to Ticket</h2>
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-md"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here"
                    required
                  ></textarea>
                  <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" type="submit">
                    Send Message
                  </button>
                </form>
              </div>
            ) : ( */}
            <div>
              <h2 className="text-2xl font-medium mb-4">Create a New Ticket</h2>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <input
                  type="text"
                  className="w-full p-4 border border-gray-300 rounded-md"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject"
                  required
                />
                <button className="bg-orange-500 text-white p-2 rounded-md hover:bg-green-600" type="submit">
                  Create Ticket
                </button>
              </form>
            </div>
            {/* )} */}
          </div>
        </div>
      ) : (
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-lg">Please log in to access the Help and Support section.</p>
        </div>
      )}
    </div>
  );
};

export default HelpAndSupport;
