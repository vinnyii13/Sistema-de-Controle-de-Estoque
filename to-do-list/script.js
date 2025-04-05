let products = JSON.parse(localStorage.getItem("products")) || [];
let editingIndex = null;

const form = document.getElementById("form-product");
const list = document.getElementById("product-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const quantity = parseInt(form.quantity.value);
  const price = parseFloat(form.price.value);

  if (!name || quantity < 0 || price < 0) return;

  const product = { name, quantity, price };

  if (editingIndex !== null) {
    products[editingIndex] = product;
    editingIndex = null;
  } else {
    products.push(product);
  }

  localStorage.setItem("products", JSON.stringify(products));
  form.reset();
  render();
});

function render() {
  list.innerHTML = "";

  products.forEach((prod, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${prod.name}</td>
      <td>${prod.quantity}</td>
      <td>R$ ${prod.price.toFixed(2)}</td>
      <td>
        <button class="edit" onclick="editProduct(${index})">Editar</button>
        <button class="delete" onclick="deleteProduct(${index})">Excluir</button>
      </td>
    `;

    list.appendChild(tr);
  });
}

function editProduct(index) {
  const prod = products[index];
  form.name.value = prod.name;
  form.quantity.value = prod.quantity;
  form.price.value = prod.price;
  editingIndex = index;
}

function deleteProduct(index) {
  if (confirm("Deseja excluir este produto?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    render();
  }
}

render();
