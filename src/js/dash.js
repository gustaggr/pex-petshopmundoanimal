document.addEventListener('DOMContentLoaded', () => {

  function atualizarDashboard() {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const pets = JSON.parse(localStorage.getItem('pets')) || [];

    const clientesCount = document.getElementById('clientes-count');
    const petsCount = document.getElementById('pets-count');
    const ulClientes = document.getElementById('latest-clientes');
    const ulPets = document.getElementById('latest-pets');

    if (clientesCount) clientesCount.textContent = clientes.length;
    if (petsCount) petsCount.textContent = pets.length;

    if (ulClientes) {
      ulClientes.innerHTML = '';
      clientes.slice(-3).reverse().forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = cliente.nome;
        ulClientes.appendChild(li);
      });
    }

    if (ulPets) {
      ulPets.innerHTML = '';
      pets.slice(-3).reverse().forEach(pet => {
        const li = document.createElement('li');
        li.textContent = pet.nome;
        ulPets.appendChild(li);
      });
    }
  }

  function logout() {
    localStorage.removeItem("logado");
    window.location.href = "index.html";
  }

  if (localStorage.getItem("logado") !== "true") {
    window.location.href = "index.html";
  }

  atualizarDashboard();

  const logoutBtn = document.querySelector('.logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});
