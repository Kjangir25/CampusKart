import { ArrowLeft, MoreVertical, Paperclip, Send } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import "./Chat.css";

const initialChats = [
    {
        id: 1,
        name: "Riya Sharma",
        productId: 2,
        product: "AirPods Pro 2nd Generation",
        last: "Is pickup near the library okay?",
        time: "10:42 AM",
        messages: [
            { from: "them", text: "Hi, is this still available?" },
            { from: "me", text: "Yes, it is available." },
            { from: "them", text: "Is pickup near the library okay?" }
        ]
    },
    {
        id: 2,
        name: "Kabir Singh",
        productId: 3,
        product: "Study Table Lamp",
        last: "Thanks!",
        time: "Yesterday",
        messages: [
            { from: "them", text: "Can you share a photo of the plug?" },
            { from: "me", text: "Sure, I will send it shortly." },
            { from: "them", text: "Thanks!" }
        ]
    }
];

// Resume ke liye smart auto-replies
const AUTO_REPLIES = [
    "Yes, still available! When do you want to pick it up?",
    "Price is slightly negotiable, we can discuss on campus.",
    "You can check it tomorrow near library at 5pm?",
    "It's in excellent condition, barely used.",
    "Sure, I can share more photos if you want.",
    "Let me know your convenient time for meetup."
];

function Chat({ product }) {
    const [chats, setChats] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("campuskart-chats"));
            return saved || initialChats;
        } catch { return initialChats; }
    });
    const [activeId, setActiveId] = useState(initialChats[0].id);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (product) {
            setChats((curr) => {
                const exists = curr.find(c => c.productId === product.id);
                if (exists) { setActiveId(exists.id); return curr; }
                const newChat = {
                    id: Date.now(),
                    name: product.seller,
                    productId: product.id,
                    product: product.title,
                    last: `Chat started for ${product.title}`,
                    time: "Now",
                    messages: [{ from: "them", text: `Hi! Is ${product.title} still available?` }]
                };
                setActiveId(newChat.id);
                return [newChat, ...curr];
            });
        }
    }, [product]);

    useEffect(() => {
        localStorage.setItem("campuskart-chats", JSON.stringify(chats));
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats, isTyping]);

    const activeChat = chats.find((chat) => chat.id === activeId) || chats[0];
    if (!activeChat) return null;

    const sendMessage = (event) => {
        event.preventDefault();
        if (!message.trim()) return;

        const userMsg = message;
        setChats((current) => current.map((chat) =>
            chat.id === activeId ? { ...chat, last: userMsg, messages: [...chat.messages, { from: "me", text: userMsg }] } : chat
        ));
        setMessage("");

        // FAKE LIVE REPLY - Resume ke liye
        setIsTyping(true);
        setTimeout(() => {
            const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
            setChats((current) => current.map((chat) =>
                chat.id === activeId ? { ...chat, last: reply, messages: [...chat.messages, { from: "them", text: reply }] } : chat
            ));
            setIsTyping(false);
        }, 1200 + Math.random() * 1000);
    };

    return (
        <div className="page chat-page">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">Live chat simulation for demo</span>
                    <h1>Messages</h1>
                </div>
            </div>

            <div className="chat-layout card">
                <aside className="chat-list">
                    <div className="chat-list-heading"><strong>Recent chats</strong><span>{chats.length}</span></div>
                    {chats.map((chat) => (
                        <button key={chat.id} className={`chat-preview ${activeId === chat.id ? "active" : ""}`} onClick={() => setActiveId(chat.id)}>
                            <span className="chat-avatar">{chat.name.charAt(0)}</span>
                            <span className="chat-preview-copy"><strong>{chat.name}</strong><small>{chat.product}</small><em>{chat.last}</em></span>
                            <time>{chat.time}</time>
                        </button>
                    ))}
                </aside>

                <section className="chat-window">
                    <header className="chat-header">
                        <button className="chat-back"><ArrowLeft size={18} /></button>
                        <span className="chat-avatar">{activeChat.name.charAt(0)}</span>
                        <div><strong>{activeChat.name}</strong><small>{activeChat.product} • <span style={{ color: '#22c55e' }}>Online</span></small></div>
                        <button className="chat-more"><MoreVertical size={19} /></button>
                    </header>

                    <div className="messages">
                        <div className="chat-date">Today</div>
                        {activeChat.messages.map((item, index) => (
                            <div key={`${item.text}-${index}`} className={`message ${item.from === "me" ? "mine" : ""}`}>{item.text}</div>
                        ))}
                        {isTyping && <div className="message">Typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="message-form" onSubmit={sendMessage}>
                        <button type="button"><Paperclip size={18} /></button>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Message ${activeChat.name}...`} />
                        <button type="submit" className="send-button"><Send size={18} /></button>
                    </form>
                </section>
            </div>
        </div>
    );
}
export default Chat;