import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import ChatArea from "./components/ChatArea";
import loader from "./lottie/loading.json";
function App() {
  const send = "/images/paper-plane-top.svg";

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hello! How can I help you today?",
    },
  ]);

  console.log(messages);

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function RefreshChat() {
    setMessages([]);
  }
  //  Uncaught (in promise) TypeError: Failed to fetch
  //  at handleSend (App.js:32:1) gettin this error in console

  const formatOutput = (text) => {
    // Simple formatter that organizes text into paragraphs and bullet points
    let lines = text.split("\n").filter((line) => line.trim() !== "");
    let formatted = lines.map((line, index) => {
      if (line.startsWith("-")) {
        return <li key={index}>{line.substring(1).trim()}</li>;
      } else if (line.includes(":")) {
        let [key, value] = line.split(":");
        return (
          <p key={index}>
            <strong>{key.trim()}:</strong> {value.trim()}
          </p>
        );
      } else {
        return <p key={index}>{line}</p>;
      }
    });
    return formatted;
  };

  async function handleSend(e) {
    e.preventDefault();
    let newMessage = {
      role: "user",
      content: text,
      // sender: "user",
      // direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setText("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessages.map((message) => message.content).join("\n"),
          // content: messages
          //   ?.map((message) => {
          //     return message?.role === "user" ? message?.content : null;
          //   })
          //   .join(""),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data-------", data);

      setMessages([...newMessages, { role: "system", content: data?.message }]);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }

  // .then((res) => res.json())
  // .then((data) => {
  //   const newMessage = {
  //     user: "gpt",
  //     message: data.message,
  //   };
  //   const newMessages = [...messages, newMessage];
  //   setMessages(newMessages);
  // });

  // const handleSend = async (message) => {
  //   const newMessage = {
  //     message: message,
  //     sender: "user",
  //     direction: "outgoing",
  //   };
  //   const newMessages = [...messages, newMessage];

  //   setMessages(newMessages);
  //   setText("");
  // };

  return (
    <div className="App">
      <Nav handleRefreshChat={RefreshChat} />
      <ChatArea
        send={send}
        text={text}
        setText={setText}
        messages={messages}
        setMessages={setMessages}
        handleSend={handleSend}
        handleTextChange={handleTextChange}
        loading={loading}
        setLoading={setLoading}
        loader={loader}
        format={formatOutput}
      />
    </div>
  );
}

export default App;
