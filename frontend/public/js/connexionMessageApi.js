document.addEventListener("DOMContentLoaded", () => {
  const buttonPost = document.getElementById("post");
  buttonPost.addEventListener("click", async () => {
    const messageContent = document.getElementById("message-content").value;
    const userId = localStorage.getItem("userId");

    if (!messageContent.trim()) {
      console.error("Le message ne peut pas être vide.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/message/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId: userId,
          content: messageContent,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Message envoyé avec succès", data);
        document.getElementById("message-content").value = "";

        location.reload();
      } else {
        console.error("Erreur lors de l'envoi du message", response.statusText);
      }
    } catch (error) {
      console.error("Erreur interne lors de l'envoi du message", error);
    }
  });

  function fetchGetMessage() {
    const url = "http://localhost:5000/api/message/all";
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des messages");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Message récuperé: " + data);
        data.forEach((message) => {
          createMessage(message.User.username, message.content);
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la recuperation des message" + error);
      });
  }

  fetchGetMessage();
});

function createMessage(user, content) {
  const main = document.querySelector("main");

  const div = document.createElement("div");
  div.classList.add("message");
  const userSend = document.createElement("h2");
  userSend.id = "userSend";
  userSend.textContent = user;
  const p = document.createElement("p");
  p.textContent = content;

  div.appendChild(userSend);
  div.appendChild(p);

  main.appendChild(div);
}
