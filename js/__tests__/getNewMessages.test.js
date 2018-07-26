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
    "<li>" +
    "<label>A. Noni Mouse:</label>" +
    "<p>Hi :)</p>" +
    "</li>" +
    "</ul>";
  app.setup();

  messages = document.getElementById("messages");
  username = document.getElementById("username-input");
  messageInput = document.getElementById("new-message");
});

describe("getNewMessages()", () => {
  it("calls axios.get", () => {
    app.getNewMessages();
    expect(axios.get).toHaveBeenCalled();
  });

  it("calls axios.get with the correct url", () => {
    app.getNewMessages();
    expect(axios.get).toHaveBeenCalledWith("http://192.168.1.21/messages/");
  });

  it("removes all the old messages from the list", () => {
    let currentMessage = messages.children[0];
    return new Promise(function(resolve) {
      app.getNewMessages();
      setTimeout(() => {
        resolve();
      }, 100);
    }).then(() => {
      expect(messages).not.toContainElement(currentMessage);
    });
  });

  it("adds the new messages to the list", () => {
    return new Promise(function(resolve) {
      app.getNewMessages();
      setTimeout(() => {
        resolve();
      }, 100);
    }).then(() => {
      expect(messages.children.length).toBe(6);
      expect(
        Array.from(messages.children).map(
          message => message.querySelector("label").innerHTML
        )
      ).toContain("Hamsa");
    });
  });
});
