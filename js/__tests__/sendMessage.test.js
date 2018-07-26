import "jest-dom/extend-expect";
import axios from "axios";

import app from "../app";

let messages, username, messageInput;

beforeEach(() => {
  document.body.innerHTML =
    '<input id="username-input" type="text" value="MrCoded The Coding Wizard">' +
    '<button id="edit-username-button">Save</button>' +
    '<input id="new-message" type="text" value="Hi! Bru.">' +
    '<button id="send-button">Send</button>' +
    '<ul id="messages">' +
    "</ul>";
  app.setup();

  messages = document.getElementById("messages");
  username = document.getElementById("username-input");
  messageInput = document.getElementById("new-message");
});

describe("sendMessage()", () => {
  it("calls axios.post", () => {
    app.sendMessage();
    expect(axios.post).toHaveBeenCalled();
  });

  it("calls axios.post with the correct url and payload", () => {
    let messageObjs = [
      {
        username: "MrCoded The Coding Wizard",
        message: "Hi! Bru."
      },
      {
        username: "Potato Monkey",
        message: "I am Potato Monkey"
      }
    ];
    app.sendMessage();
    expect(axios.post).toHaveBeenCalledWith(
      "http://192.168.1.21/messages/create/",
      messageObjs[0]
    );

    username.value = messageObjs[1].username;
    messageInput.value = messageObjs[1].message;
    app.sendMessage();
    expect(axios.post).toHaveBeenCalledWith(
      "http://192.168.1.21/messages/create/",
      messageObjs[1]
    );
  });

  it("adds a the message to the page after a successful post", () => {
    return new Promise(function(resolve) {
      app.sendMessage();
      setTimeout(() => {
        resolve();
      }, 100);
    }).then(() => {
      expect(messages.children.length).toBe(1);
      expect(
        messages.children[0].querySelector("label").innerHTML ===
          "MrCoded The Coding Wizard"
      );
      expect(messages.children[0].querySelector("p").innerHTML === "Hi! Bru.");
    });
  });

  it("resets the value of the input field after adding the message", () => {
    return new Promise(function(resolve) {
      app.sendMessage();
      setTimeout(() => {
        resolve();
      }, 100);
    }).then(() => {
      expect(messageInput.value).toBe("");
    });
  });
});
