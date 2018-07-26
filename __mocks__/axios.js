const axiosMock = jest.genMockFromModule("axios");

let getResponse = {
  data: [
    {
      id: 1,
      username: "Aziz",
      message: "hi",
      timestamp: "2018-03-27T13:08:31.854256Z"
    },
    {
      id: 2,
      username: "Hamsa",
      message: "Yo",
      timestamp: "2018-03-27T13:08:38.168523Z"
    },
    {
      id: 8,
      username: "Hamsa",
      message: "Yo bru",
      timestamp: "2018-04-02T12:01:01.018620Z"
    },
    {
      id: 9,
      username: "Fawas",
      message: "Hey what is up?",
      timestamp: "2018-04-02T12:01:10.528270Z"
    },
    {
      id: 10,
      username: "Hamsa",
      message: "Why you talking like that bru?",
      timestamp: "2018-04-02T12:01:20.224895Z"
    },
    {
      id: 11,
      username: "Fawas",
      message: "Talking like what? I'm just me. Bru.",
      timestamp: "2018-04-02T12:01:40.697103Z"
    }
  ]
};

axiosMock.get.mockImplementation(get);

function get() {
  return new Promise(function(resolve) {
    resolve(getResponse);
  });
}

axiosMock.post.mockImplementation(post);

function post(_, messageObj) {
  return new Promise(function(resolve) {
    resolve({
      data: {
        id: 1,
        username: messageObj.username,
        message: messageObj.message
      }
    });
  });
}

module.exports = axiosMock;
