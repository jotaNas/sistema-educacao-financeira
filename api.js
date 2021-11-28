function fetchJson(url, options) {
  return fetch(url, options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(resp.statusText);
      }
    })
    .catch((error) => {
      showError("Error loading data", error);
      throw error;
    });
}

const baseUrl = "http://localhost:3000";

function criarCurso(curso) {
  return fetchJson(`${baseUrl}/cursos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(curso),
  });
}

function exibirCursos(id, curso) {
  return fetchJson(`${baseUrl}/cursos/${id}`, {
    method: "GET",
    body: JSON.stringify(curso),
  });
}

function atualizarCurso(id, curso) {
  return fetchJson(`${baseUrl}/cursos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(curso),
  });
}

function deletarCurso(id) {
  return fetchJson(`${baseUrl}/cursos/${id}`, {
    method: "DELETE",
  });
}

function listaCursos() {
  return fetchJson(`${baseUrl}/cursos`);
}
