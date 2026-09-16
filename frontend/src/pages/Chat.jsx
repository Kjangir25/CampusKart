import { ArrowLeft, MoreVertical, Paperclip, Send, UserRound } from "lucide-react";
import { useState } from "react";
import "./Chat.css";

const initialChats = [
    {
        id: 1,
        name: "Riya Sharma",
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

function Chat() {
    const [chats, setChats] = useState(initialChats);
    const [activeId, setActiveId] = useState(1);
    const [message, setMessage] = useState("");

    const activeChat = chats.find((chat) => chat.id === activeId);

    const sendMessage = (event) => {
        event.preventDefault();
        if (!message.trim()) return;

        setChats((current) =>
            current.map((chat) =>
                chat.id === activeId
                    ? {
                        ...chat,
                        last: message,
                        messages: [...chat.messages, { from: "me", text: message }]
                    }
                    : chat
            )
        );

        setMessage("");
    };

    return (
        <div className="page chat-page">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">Student-to-student communication</span>
                    <h1>Messages</h1>
                </div>
            </div>

            <div className="chat-layout card">
                <aside className="chat-list">
                    <div className="chat-list-heading">
                        <strong>Recent chats</strong>
                        <span>{chats.length}</span>
                    </div>

                    {chats.map((chat) => (
                        <button
                            key={chat.id}
                            className={`chat-preview ${activeId === chat.id ? "active" : ""}`}
                            onClick={() => setActiveId(chat.id)}
                        >
                            <span className="chat-avatar">{chat.name.charAt(0)}</span>
                            <span className="chat-preview-copy">
                                <strong>{chat.name}</strong>
                                <small>{chat.product}</small>
                                <em>{chat.last}</em>
                            </span>
                            <time>{chat.time}</time>
                        </button>
                    ))}
                </aside>

                <section className="chat-window">
                    <header className="chat-header">
                        <button className="chat-back">
                            <ArrowLeft size={18} />
                        </button>
                        <span className="chat-avatar">{activeChat.name.charAt(0)}</span>
                        <div>
                            <strong>{activeChat.name}</strong>
                            <small>{activeChat.product}</small>
                        </div>
                        <button className="chat-more">
                            <MoreVertical size={19} />
                        </button>
                    </header>

                    <div className="messages">
                        <div className="chat-date">Today</div>
                        {activeChat.messages.map((item, index) => (
                            <div
                                key={`${item.text}-${index}`}
                                className={`message ${item.from === "me" ? "mine" : ""}`}
                            >
                                {item.text}
                            </div>
                        ))}
                    </div>

                    <form className="message-form" onSubmit={sendMessage}>
                        <button type="button" aria-label="Attach file">
                            <Paperclip size={18} />
                        </button>
                        <input
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            placeholder="Write a message..."
                        />
                        <button type="submit" className="send-button">
                            <Send size={18} />
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Chat;