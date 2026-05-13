import React, { useState, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [{ from: "bot", text: "Hi! How can I help you today?" }];
  });
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // ✅ toggle state

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    setTimeout(() => {
      let reply = "Thanks for your message! I'll get back to you.";
      const lower = input.toLowerCase();

      if (lower.includes("payment")) {
        reply = "Payments are only available to logged-in users. Please sign in first.";
      } else if (lower.includes("signup") || lower.includes("sign up")) {
        reply = "You can create an account by clicking Sign Up in the menu.";
      } else if (lower.includes("order") || lower.includes("buy")) {
        reply = "To place an order, add items to your cart and proceed to checkout.";
      } else if (lower.includes("cart")) {
        reply = "Your cart shows all items you’ve selected. You can access it from the Cart page.";
      } else if (lower.includes("order") || lower.includes("buy")) {
        reply = "To place an order, add items to your cart and proceed to checkout.";
      } else if (lower.includes("cart")) {
        reply = "Your cart shows all items you’ve selected. You can access it from the Cart page.";
      } else if (lower.includes("payment") || lower.includes("mpesa")) {
        reply = "We support Lipa na M-Pesa. At checkout, enter your phone number to complete payment.";
      } else if (lower.includes("delivery") || lower.includes("shipping")) {
        reply = "We deliver across Nairobi. Please provide your delivery address at checkout.";
      } else if (lower.includes("location")) {
        reply = "Enable location access so we can deliver faster and more accurately.";
      } else if (lower.includes("admin") || lower.includes("dashboard")) {
        reply = "Admins can manage products and view orders from the Admin Dashboard.";
      } else if (lower.includes("help") || lower.includes("support")) {
        reply = "Need help? Our chatbot is here 24/7, or you can contact customer support.";
      } else {
        reply = "Sorry, I didn’t understand that. Try asking about signup, order, cart, payment, or delivery.";
      }

      setMessages(prev => [...prev, { from: "bot", text: reply }]);
    }, 1000);
  };

  return (
    <div>
      {/* ✅ Floating chat icon */}
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>

      {/* ✅ Chat window toggled by icon */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            Liquor Hub Assistant
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
