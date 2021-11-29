let cursos = [];

let selectedItem;
const listEl = document.querySelector("ul");
const formEl = document.querySelector("form");
const bdelete = document.getElementById("bdelete");
const bcancel = document.getElementById("bcancel");

async function init() {
  [cursos] = await Promise.all([listaCursos()]);
  renderCursos();
  renderData();
  clearSelection();
  bcancel.addEventListener("click", clearSelection);
  formEl.addEventListener("submit", onSubmit);
  bdelete.addEventListener("click", onDelete);
}
init();

function renderCursos() {
  for (const curso of cursos) {
    const option = document.createElement("option");
    option.textContent = curso.teacher_name;
    option.value = curso.teacher_name;
    formEl.teacher_name.appendChild(option);
  }
}

function selectItem(curso, li) {
  clearSelection();
  selectedItem = curso;
  li.classList.add("selected");
  formEl.name.value = curso.title;
  bdelete.style.display = "inline";
  bcancel.style.display = "inline";
  bsubmit.textContent = "Update";
}

function clearSelection() {
  clearError();
  selectedItem = undefined;
  const li = listEl.querySelector(".selected");
  if (li) {
    li.classList.remove("selected");
  }
  formEl.name.value = "";

  formEl.teacher_name.value = "";
  bdelete.style.display = "none";
  bcancel.style.display = "none";
  bsubmit.textContent = "Create";
}

async function onDelete() {
  if (selectedItem) {
    await deletarCurso(selectedItem.id);
    const i = cursos.indexOf(selectedItem);
    cursos.splice(i, 1);
    renderData();
    clearSelection();
  }
}

function renderData() {
  listEl.innerHTML = "";
  for (const curso of cursos) {
    const li = document.createElement("li");
    const divName = document.createElement("div");
    divName.textContent = curso.title;
    const divRole = document.createElement("div");
    divRole.textContent = curso.description;
    li.appendChild(divName);
    li.appendChild(divRole);
    listEl.appendChild(li);
    li.addEventListener("click", () => selectItem(curso, li));
  }
}

function showError(message, error) {
  document.getElementById("errors").textContent = message;
  if (error) {
    console.error(error);
  }
}

function clearError() {
  document.getElementById("errors").textContent = "";
}

async function onSubmit(evt) {
  evt.preventDefault();
  const cursoData = {
    title: formEl.name.value,
    teacher_name: +formEl.teacher_name.value,
  };
  if (!cursoData.title || !cursoData.teacher_name) {
    showError("Você deve preencher todos os campos.");
  } else {
    if (selectedItem) {
      const updatedCourse = await atualizarCurso(
        selectedItem.teacher_name,
        cursoData
      );
      const i = cursos.indexOf(selectedItem);
      cursos[i] = updatedCourse;
      renderData();
      selectItem(updatedCourse, listEl.children[i]);
    } else {
      const createdCourse = await criarCurso(cursoData);
      cursos.push(createdCourse);
      renderData();
      selectItem(createdCourse, listEl.lastChild);
      listEl.lastChild.scrollIntoView();
    }
  }
}
