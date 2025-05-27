let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let editingClientIndex = null;

function saveToLocalStorage() {
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

function renderClientsTable() {
  const tbody = document.getElementById('cliente-list');
  tbody.innerHTML = clientes.map((cliente, index) => `
    <tr>
      <td>${cliente.nome}</td>
      <td>${cliente.telefone}</td>
      <td>${cliente.email}</td>
      <td>
        <button class="button-edit" onclick="openClientModal(${index})">Editar</button>
        <button class="button-deleted" onclick="deleteClient(${index})">Excluir</button>
      </td>
    </tr>
  `).join('');
}
document.getElementById('open-add-modal').addEventListener('click', () => openClientModal());

function openClientModal(index = null) {
  const modal = document.getElementById('clientModal');
  document.getElementById('client-form').reset();
  document.getElementById('modal-title-client').textContent = index === null ? "Adicionar Cliente" : "Editar Cliente";

  if (index !== null) {
    editingClientIndex = index;
    const cliente = clientes[index];
    document.getElementById('client-nome').value = cliente.nome;
    document.getElementById('client-telefone').value = cliente.telefone;
    document.getElementById('client-email').value = cliente.email;
  } else {
    editingClientIndex = null;
  }

  modal.style.display = 'flex';
}

function closeClientModal() {
  document.getElementById('clientModal').style.display = 'none';
}
function saveClient(event) {
  event.preventDefault();

  const nome = document.getElementById('client-nome').value;
  const telefone = document.getElementById('client-telefone').value;
  const email = document.getElementById('client-email').value;

  const cliente = { nome, telefone, email };

  if (editingClientIndex === null) {
    clientes.push(cliente);
  } else {
    clientes[editingClientIndex] = cliente;
  }

  saveToLocalStorage();
  closeClientModal();
  renderClientsTable();
}

function deleteClient(index) {
  if (confirm('Deseja realmente excluir este cliente?')) {
    clientes.splice(index, 1);
    saveToLocalStorage();
    renderClientsTable();
  }
}

document.addEventListener('DOMContentLoaded', renderClientsTable);
