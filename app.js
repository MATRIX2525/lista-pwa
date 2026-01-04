const lista = document.getElementById("lista");
const input = document.getElementById("inputItem");

let itens = JSON.parse(localStorage.getItem("lista")) || [];

function salvar() {
  localStorage.setItem("lista", JSON.stringify(itens));
}

function renderizar() {
  lista.innerHTML = "";

  itens.forEach((item, index) => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = item.texto;
    if (item.feito) texto.classList.add("feito");

    texto.onclick = () => {
      item.feito = !item.feito;
      salvar();
      renderizar();
    };

    const excluir = document.createElement("button");
    excluir.textContent = "🗑️";
    excluir.onclick = () => {
      itens.splice(index, 1);
      salvar();
      renderizar();
    };

    li.appendChild(texto);
    li.appendChild(excluir);
    lista.appendChild(li);
  });
}

function adicionarItem() {
  if (!input.value.trim()) return;

  itens.push({ texto: input.value, feito: false });
  input.value = "";
  salvar();
  renderizar();
}

renderizar();