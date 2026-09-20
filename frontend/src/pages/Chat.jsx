import { ArrowLeft, MoreVertical, Paperclip, Send, Trash2, Pencil } from "lucide-react";
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
            { id: 1, from: "them", text: "Hi, is this still available?" },
            { id: 2, from: "me", text: "Yes, it is available." },
            { id: 3, from: "them", text: "Is pickup near the library okay?" }
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
            { id: 4, from: "them", text: "Can you share a photo of the plug?" },
            { id: 5, from: "me", text: "Sure, I will send it shortly." },
            { id: 6, from: "them", text: "Thanks!" }
        ]
    }
];

const getSmartReply = (msg) => {
    const m = msg.toLowerCase().trim();

    // exact match pehle check karo
    if (m === "hi" || m === "hello" || m === "hey") return "Hey! 👋 Yes, it's available. Tell me?";
    if (m.includes("how are you")) return "I am fine, thank you! How about you? 😊";
    if (m.includes("i am fine") || m === "fine" || m === "good") return "Great to hear! So when should we meet?";
    if (m.includes("price") || m.includes("kitne")) return "Price is slightly negotiable, we can discuss on campus.";
    if (m.includes("available")) return "Yes, still available! When do you want to pick it up?";
    if (m.includes("where") || m.includes("location") || m.includes("kaha milega")) return "We can meet near the library at 5pm, is that okay?";
    if (m.includes("photo") || m.includes("pic") || m.includes("image")) return "Sure, I can share more photos if you want.";
    if (m.includes("thank")) return "Welcome! 🙏";
    if (m.includes("bye")) return "Bye! Take care 👋";

    const fallback = [
        "It's in excellent condition, barely used.",
        "You can check it tomorrow near library?",
        "Let me know your convenient time for meetup.",
        "Sure, I can help with that!",
    ];
    return fallback[Math.floor(Math.random() * fallback.length)];
};

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
    const [editingId, setEditingId] = useState(null);
    const [menuId, setMenuId] = useState(null);
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
                    messages: [{ id: Date.now(), from: "them", text: `Hi! Is ${product.title} still available?` }]
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

        // EDIT LOGIC
        if (editingId) {
            setChats((current) => current.map((chat) =>
                chat.id === activeId ? {
                    ...chat,
                    messages: chat.messages.map(m => m.id === editingId ? { ...m, text: message } : m),
                    last: message
                } : chat
            ));
            setEditingId(null);
            setMessage("");
            return;
        }

        const userMsg = { id: Date.now(), from: "me", text: message };
        setChats((current) => current.map((chat) =>
            chat.id === activeId ? { ...chat, last: userMsg.text, messages: [...chat.messages, userMsg] } : chat
        ));
        setMessage("");

        // SMART REPLY
        setIsTyping(true);
        setTimeout(() => {
            const replyText = getSmartReply(userMsg.text);
            const reply = { id: Date.now() + 1, from: "them", text: replyText };
            setChats((current) => current.map((chat) =>
                chat.id === activeId ? { ...chat, last: reply.text, messages: [...chat.messages, reply] } : chat
            ));
            setIsTyping(false);
        }, 900);
    };

    const handleDelete = (msgId) => {
        setChats((current) => current.map((chat) =>
            chat.id === activeId ? { ...chat, messages: chat.messages.filter(m => m.id !== msgId) } : chat
        ));
        setMenuId(null);
    };

    const handleEdit = (msg) => {
        setMessage(msg.text);
        setEditingId(msg.id);
        setMenuId(null);
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
                        {activeChat.messages.map((item) => (
                            <div key={item.id} className={`message-wrapper ${item.from === "me" ? "mine" : ""}`}>
                                <div className={`message ${item.from === "me" ? "mine" : ""}`} onClick={() => setMenuId(menuId === item.id ? null : item.id)}>
                                    {item.text}
                                </div>
                                {menuId === item.id && item.from === "me" && (
                                    <div className="msg-options">
                                        <button onClick={() => handleEdit(item)}><Pencil size={12} /> Edit</button>
                                        <button onClick={() => handleDelete(item.id)}><Trash2 size={12} /> Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isTyping && <div className="message">Typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="message-form" onSubmit={sendMessage}>
                        <button type="button"><Paperclip size={18} /></button>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={editingId ? "Edit message..." : `Message ${activeChat.name}...`} />
                        <button type="submit" className="send-button"><Send size={18} /></button>
                    </form>
                </section>
            </div>
        </div>
    );
}
export default Chat;