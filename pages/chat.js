import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

export default function Chat() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: message,
      sender: user.uid,
      senderName: user.displayName,
      timestamp: new Date(),
    });

    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-200">
      <div className="flex-grow overflow-auto">
        {messages.map(msg => (
          <p key={msg.id} className={`p-2 ${msg.sender === user.uid ? "text-right" : "text-left"}`}>
            <strong>{msg.senderName}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
        {showEmojiPicker && <EmojiPicker onEmojiClick={(e) => setMessage(message + e.emoji)} />}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
