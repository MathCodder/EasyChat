const boutonSignup = document.getElementById("signup");
const boutonLogin = document.getElementById("login");

const registerLoginBox = document.getElementById("box-register-login");
const registerPage = document.getElementById("registerPage");

const init = () => {
  boutonLogin.addEventListener("click", afficheLoginPage);
  boutonSignup.addEventListener("click", afficheSignUpPage);
};

function afficheLoginPage() {
  const loginPage = document.getElementById("loginPage");
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const croix = document.querySelector(".croix");

  loginPage.style.display = "flex";
  left.style.filter = "blur(10px)";
  right.style.filter = "blur(10px)";

  croix.addEventListener("click", function () {
    loginPage.style.display = "none";
    left.style.filter = "none";
    right.style.filter = "none";
  });
}

function afficheSignUpPage() {
  const registerPage = document.getElementById("registerPage");
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const croix = document.querySelector(".croix-register");

  registerPage.style.display = "flex";
  left.style.filter = "blur(10px)";
  right.style.filter = "blur(10px)";

  croix.addEventListener("click", function () {
    registerPage.style.display = "none";
    left.style.filter = "none";
    right.style.filter = "none";
  });
}

init();
