let pets = JSON.parse(localStorage.getItem("pets")) || [];
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let editingPetIndex = null;

function savePetsToLocalStorage() {
  localStorage.setItem("pets", JSON.stringify(pets));
}

function renderClientsInSelect() {
  const select = document.getElementById("pet-owner");
  select.innerHTML = clientes.map(cliente =>
    `<option value="${cliente.nome}">${cliente.nome}</option>`
  ).join("");
}

function openPetModal(index = null) {
  const modal = document.getElementById("petModal");
  document.getElementById("pet-form").reset();
  document.getElementById("modal-title").textContent = index === null ? "Adicionar Pet" : "Editar Pet";
  renderClientsInSelect();

  if (index !== null) {
    editingPetIndex = index;
    const pet = pets[index];
    document.getElementById("pet-id").value = pet.id;
    document.getElementById("pet-name").value = pet.nome;
    document.getElementById("pet-species").value = pet.especie;
    document.getElementById("pet-age").value = pet.idade;
    document.getElementById("pet-owner").value = pet.clienteNome;
  } else {
    editingPetIndex = null;
  }

  modal.classList.remove("hidden-modal");
  modal.style.display = "flex";
}

function closePetModal() {
  document.getElementById("petModal").style.display = "none";
}

function savePet(event) {
  event.preventDefault();

  const nome = document.getElementById("pet-name").value;
  const especie = document.getElementById("pet-species").value;
  const idade = document.getElementById("pet-age").value;
  const clienteNome = document.getElementById("pet-owner").value;

  const pet = { nome, especie, idade, clienteNome };

  if (editingPetIndex === null) {
    pets.push(pet);
  } else {
    pets[editingPetIndex] = pet;
  }

  savePetsToLocalStorage();
  closePetModal();
  renderPetsTable();
}

function deletePet(index) {
  if (confirm("Deseja realmente remover este pet?")) {
    pets.splice(index, 1);
    savePetsToLocalStorage();
    renderPetsTable();
  }
}

function renderPetsTable() {
  const tbody = document.getElementById("pets-table-body");
  tbody.innerHTML = pets.map((pet, index) => `
    <tr>
      <td>${pet.nome}</td>
      <td>${pet.especie}</td>
      <td>${pet.idade}</td>
      <td>${pet.clienteNome}</td>
      <td>
        <button class="button-edit" onclick="openPetModal(${index})">Editar</button>
        <button class="button-deleted" onclick="deletePet(${index})">Excluir</button>
      </td>
    </tr>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  pets = JSON.parse(localStorage.getItem("pets")) || [];
  clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  renderPetsTable();
});
