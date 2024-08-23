document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("connectButton");
  function fetchLoginApi() {
    loginButton.addEventListener("click", async () => {
      const pseudo = document.getElementById("pseudo-login").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: pseudo,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const token = data.token;
          console.log("Token save: ", token);
          localStorage.setItem("token", token);

          window.location.href = "/home";

          console.log("Utilisateur connexter avec succès", data);
        } else {
          console.error("Erreur lors de la connexion", data.error);
        }
      } catch (error) {
        console.error("Erreur interne au serveur", error);
      }
    });
  }

  fetchLoginApi();
});
