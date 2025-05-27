    if (localStorage.getItem("logado") === "true") {
      window.location.href = "dashboard.html";
    }

    document.getElementById("login-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const usuario = document.getElementById("username").value.trim();
      const senha = document.getElementById("password").value;

      if (usuario === "admin" && senha === "admin") {
        localStorage.setItem("logado", "true");
        window.location.href = "dashboard.html";
      } else {
        alert("Usuário ou senha inválidos.");
      }
    });