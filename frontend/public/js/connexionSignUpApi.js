document.addEventListener("DOMContentLoaded", () => {
  const connexionButton = document.getElementById("connectButton");
  const signupButton = document.getElementById("inscriptionButton");
  function fetchSignup() {
    signupButton.addEventListener("click", async () => {
      const userName = document.getElementById("pseudo-register").value;
      const password = document.getElementById("password-register").value;
      const confirmedPassword = document.getElementById("confirmed-pass").value;
      const gender = "Homme";
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: password,
            confirmedPassword: confirmedPassword,
            gender: gender,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          window.location.href = "/home";
          console.log("Utilisateur créer avec succès", data);
        } else {
          console.error("Erreur lors de l'incription", data.error);
        }
      } catch (error) {
        console.error("Erreur interne au serveur", error);
      }
    });
  }
  fetchSignup();
});
