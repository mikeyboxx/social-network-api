[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Social Network Api

## Description

This is a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. It is a Restful API that uses a NoSQL database which can support handling large amounts of unstructured data.

---

## Table Of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

---

## Installation

---

## Usage

The following HTTP requests are supported:
* GET /api/users - get all users
* GET /api/users/:userId - get one user
* POST /api/users - create user
* PUT /api/users/:userId - update user
* DELETE /api/users/:userId - delete user
--- 
* POST /api/users/:userId/friends/:friendId - add friend
* DELETE /api/users/:userId/friends/:friendId - remove friend
---
* GET /api/thoughts  - get all thoughts
* GET /api/thoughts/:thoughtId - get one thought
* POST /api/thoughts - create thought
* PUT /api/thoughts/:thoughtId - update thought
* DELETE /api/thoughts/:thoughtId - delete thought
---
* POST /api/thoughts/:thoughtId/reactions - add reaction
* DELETE /api/thoughts/:thoughtId/reactions/:reactionId - delete reaction


[Demo Video](https://drive.google.com/file/d/123V5Oszbz4TPwpqCOrvNMlqemFXdCysX/view)

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
The MIT License

---

## Contributing

---

## Tests

---

## Questions

[Github Profile](https://www.github.com/mikeyboxx)

For any additional questions, you can contact me at happyanddebtfree@gmail.com

---

