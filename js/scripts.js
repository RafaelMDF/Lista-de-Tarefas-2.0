let inputNovaTarefa = document.querySelector("#inputNovaTarefa");
let btnAddTarefa = document.querySelector("#btnAddTarefa");
let listaTarefas = document.querySelector("#listaTarefas");
let janelaEdicao = document.querySelector("#janelaEdicao");
let janelaEdicaoFundo = document.querySelector("#janelaEdicaoFundo");
let janelaEdicaoBtnFechar = document.querySelector("#janelaEdicaoBtnFechar");
let btnAtualizarTarefa = document.querySelector("#btnAtualizarTarefa");
let idTarefaEdicao = document.querySelector("#idTarefaEdicao");
let inputTarefaNomeEdicao = document.querySelector("#inputTarefaNomeEdicao");
const qtdIdsDisponiveis = Number.MAX_VALUE;

inputNovaTarefa.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    adicionarTarefaSeValida();
  }
});

btnAddTarefa.addEventListener("click", (e) => {
  adicionarTarefaSeValida();
});

btnAtualizarTarefa.addEventListener("click", (e) => {
  e.preventDefault();
  atualizarTarefaSeValida();
});

janelaEdicaoBtnFechar.addEventListener("click", (e) => {
  alternarJanelaEdicao();
});

function adicionarTarefaSeValida() {
  const tarefaNome = inputNovaTarefa.value.trim();
  if (tarefaNome !== "") {
    let tarefa = {
      nome: tarefaNome,
      id: gerarIdV2(),
    };
    adicionarTarefa(tarefa);
  } else {
    alert("Por favor, insira uma tarefa válida.");
  }
}

function atualizarTarefaSeValida() {
  let idTarefa = idTarefaEdicao.innerHTML.replace("#", "");
  const tarefaNome = inputTarefaNomeEdicao.value.trim();
  if (tarefaNome !== "") {
    let tarefa = {
      nome: tarefaNome,
      id: idTarefa,
    };

    let tarefaAtual = document.getElementById("" + idTarefa + "");

    if (tarefaAtual) {
      let li = criarTagLI(tarefa);
      listaTarefas.replaceChild(li, tarefaAtual);
      alternarJanelaEdicao();
    } else {
      alert("Elemento HTML não encontrado!");
    }
  } else {
    alert("Por favor, insira uma tarefa válida.");
  }
}

function gerarId() {
  return Math.floor(Math.random() * qtdIdsDisponiveis);
}

function gerarIdV2() {
  return gerarIdUnico();
}

function gerarIdUnico() {
  let itensDaLista = document.querySelector("#listaTarefas").children;
  let idsGerados = [];

  for (let i = 0; i < itensDaLista.length; i++) {
    idsGerados.push(itensDaLista[i].id);
  }

  let contadorIds = 0;
  let id = gerarId();

  while (
    contadorIds <= qtdIdsDisponiveis &&
    idsGerados.indexOf(id.toString()) > -1
  ) {
    id = gerarId();
    contadorIds++;

    if (contadorIds >= qtdIdsDisponiveis) {
      alert("Oops, ficamos sem IDS :/");
      throw new Error("Acabou os IDs :/");
    }
  }

  return id;
}

function adicionarTarefa(tarefa) {
  let li = criarTagLI(tarefa);
  listaTarefas.appendChild(li);
  inputNovaTarefa.value = "";
}

function criarTagLI(tarefa, index) {
  let li = document.createElement("li");
  li.id = tarefa.id;

  let span = document.createElement("span");
  span.classList.add("textoTarefa");
  span.innerHTML = (index + 1) + ". " + tarefa.nome; // Adiciona o número da tarefa

  let div = document.createElement("div");

  let btnEditar = document.createElement("button");
  btnEditar.classList.add("btnAcao");
  btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
  btnEditar.setAttribute("onclick", "editar(" + tarefa.id + ")");

  let btnExcluir = document.createElement("button");
  btnExcluir.classList.add("btnAcao");
  btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
  btnExcluir.setAttribute("onclick", "excluir(" + tarefa.id + ")");

  div.appendChild(btnEditar);
  div.appendChild(btnExcluir);

  li.appendChild(span);
  li.appendChild(div);
  return li;
}

function adicionarTarefa(tarefa) {
  let index = listaTarefas.children.length;
  let li = criarTagLI(tarefa, index);
  listaTarefas.appendChild(li);
  inputNovaTarefa.value = "";
}
function editar(idTarefa) {
  let li = document.getElementById("" + idTarefa + "");
  if (li) {
    idTarefaEdicao.innerHTML = "#" + idTarefa;
    inputTarefaNomeEdicao.value = li.querySelector(".textoTarefa").innerText;
    alternarJanelaEdicao();
  } else {
    alert("Elemento HTML não encontrado!");
  }
}

function excluir(idTarefa) {
  let confirmacao = window.confirm("Tem certeza que deseja excluir?");
  if (confirmacao) {
    let li = document.getElementById("" + idTarefa + "");
    if (li) {
      listaTarefas.removeChild(li);
    } else {
      alert("Elemento HTML não encontrado!");
    }
  }
}

function alternarJanelaEdicao() {
  janelaEdicao.classList.toggle("abrir");
  janelaEdicaoFundo.classList.toggle("abrir");
}
