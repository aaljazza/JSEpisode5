import "jest-dom/extend-expect";
import axios from "axios";

import app from "../app";

let message;

beforeEach(() => {
  document.body.innerHTML =
    '<input id="username-input" type="text" value="MrCoded The Coding Wizard">' +
    '<button id="edit-username-button">Save</button>' +
    '<input id="new-message" type="text" value="Hi! Bru.">' +
    '<button id="send-button">Send</button>' +
    '<ul id="messages">' +
    "</ul>";
  app.setup();
  message = document.getElementById("messages");
  app.sendMessage();
});

describe("sendMessage()", () => {
  it("calls axios.post", () => {
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
    expect(axios.post).toHaveBeenCalledWith(
      "http://192.168.0.21/messages/create",
      messageObjs[0]
    );

    document.getElementById("username-input").value = messageObjs[1].username;
    document.getElementById("new-message").value = messageObjs[1].message;
    app.sendMessage();
    expect(axios.post).toHaveBeenCalledWith(
      "http://192.168.0.21/messages/create",
      messageObjs[1]
    );
  });

  // it("adds a task with the text 'New Task' when the input field is empty", () => {
  //   app.addTask();
  //   const listItems = document.getElementsByTagName("li");
  //   expect(listItems.length).toBe(1);
  //   expect(listItems[0].querySelector("label").innerHTML).toBe("New Task");
  // });

  // it("resets the value of the input field after adding a task", () => {
  //   taskInput.value = "Reticulate splines";
  //   app.addTask();
  //   expect(taskInput.value).toBe("");
  // });
});
