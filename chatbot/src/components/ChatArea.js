import { IconButton, TextField, Typography } from "@mui/material";
import Lottie from "lottie-react";
import React from "react";

function ChatArea({
  handleSend,
  send,
  text,
  setText,
  messages,
  setMessages,
  handleTextChange,
  loading,
  setLoading,
  loader,
  format,
}) {
  return (
    <div className="chatSection">
      <div className="chatArea">
        {messages?.map((message, i) => {
          return (
            <>
              <div
                className={
                  message?.role === "user" ? "userChat" : "chatGptReply"
                }
              >
                <Typography
                  className={
                    message?.role === "user" ? "userTextStyle" : "gptTextStyle"
                  }
                  style={{ color: "#fff" }}
                  key={i}
                >
                  {format(message?.content)}
                  {/* {message?.content} */}
                </Typography>
              </div>
            </>
          );
        })}
        <div>
          {loading ? (
            <Lottie
              style={{ width: "100px", height: "100px", margin: "1rem" }}
              animationData={loader}
              loop={loading}
            />
          ) : null}
        </div>
      </div>

      <div className="InputArea">
        {/* <div className="inputAreaStyle"> */}
        <TextField
          className="writingArea"
          multiline
          value={text}
          onChange={handleTextChange}
          placeholder="Ask anything"
          sx={{
            "& .MuiInputBase-input": {
              color: "#fff",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#fff",
            },
            // "& .MuiOutlinedInput-root": {
            //   borderRadius: "7px",
            //   height: 50,
            //   border: "1px solid #909090",

            //   ":hover": {
            //     border: "0.5px solid #fd0000 !important",
            //     boxShadow: "-1px 1px 4px 4px #FFEAEA",
            //   },
            //   ":focus-within": { border: "0.5px solid #fd0000 !important" },
            // },
            // "& .MuiOutlinedInput-root.Mui-disabled": {
            //   ":hover": {
            //     border: "1px solid #909090 !important",
            //     boxShadow: "none",
            //   },
            // },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        ></TextField>
        <IconButton onClick={handleSend}>
          <img style={{ width: "30px", height: "30px" }} src={send} alt="" />
        </IconButton>
        {/* </div> */}
      </div>
    </div>
  );
}

export default ChatArea;
