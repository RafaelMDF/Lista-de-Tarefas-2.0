let inputNovaTarefa = document.querySelector("#inputNovaTarefa");
let btnAddTarefa = document.querySelector("#btnAddTarefa");
let listaTarefas = document.querySelector("#listaTarefas");
let janelaEdicao = document.querySelector("#janelaEdicao");
let janelaEdicaoFundo = document.querySelector("#janelaEdicaoFundo");

inputNovaTarefa.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    let tarefa = {
      nome: inputNovaTarefa.value,
      id: gerarId(),
    };
    adicionarTarefa(tarefa);
  }
});

btnAddTarefa.addEventListener("click", () => {
  let tarefa = {
    nome: inputNovaTarefa.value,
    id: gerarId(),
  };
  adicionarTarefa(tarefa);
});

function gerarId() {
  return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa) {
  let li = criarTagLI(tarefa);
  listaTarefas.appendChild(li);
  inputNovaTarefa.value = "";
}

function criarTagLI(tarefa) {
  let li = document.createElement("li");
  li.id = tarefa.id;

  let span = document.createElement("span");
  span.classList.add("textoTarefa");
  span.innerHTML = tarefa.nome;

  let div = document.createElement("div");

  let btnEditar = document.createElement("button");
  btnEditar.classList.add("btnAcao");
  btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
  btnEditar.addEventListener("click", () => editarTarefa(tarefa.id));

  let btnExcluir = document.createElement("button");
  btnExcluir.classList.add("btnAcao");
  btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
  btnExcluir.addEventListener("click", () => excluirTarefa(tarefa.id, li));

  div.appendChild(btnEditar);
  div.appendChild(btnExcluir);

  li.appendChild(span);
  li.appendChild(div);
  return li;
}

function editarTarefa(id) {
  // Lógica para editar a tarefa
  let li = document.getElementById("" + id + "");
  if (li) {
    listaTarefas.removeChild(li);
  }
}

function excluirTarefa(id, li) {
  // Lógica para excluir a tarefa
  li.remove();
  let confirmação = window.confirm("Tem certeza que deseja excluir? ");
  if (confirmação) {
    let li = document.getElementById("" + id + "");
    if (li) {
      listaTarefas.removeChild(li);
    }
  }
}
