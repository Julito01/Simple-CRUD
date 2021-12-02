import React, { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [task, setTask] = useState("");
  const [arrayTask, setArrayTask] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null); // Toma los errores del formulario

  function handleChange(e) {
    const { value } = e.target;
    setTask(value);
  }

  // function handleClick() {
  //   const newArrayTask = [...arrayTask, task];
  //   setArrayTask(newArrayTask);
  // }

  function addTask(e) {
    e.preventDefault();

    if (!task.trim()) {
      console.log("Elemento vacio.");
      setError("Escriba algo por favor...");
      return;
    }

    setArrayTask([...arrayTask, { id: nanoid(10), taskName: task }]);
    setTask("");
    setError(null);
  }

  function removeTask(id) {
    // Filter sirve para filtrar elementos, si el ID del elemento es diferente al id pasado por
    // parametros lo agrega a filtersArray

    const filtersArray = arrayTask.filter((item) => item.id !== id);
    setArrayTask(filtersArray);
  }

  function editInput(item) {
    setEditMode(true);
    setTask(item.taskName);
    setId(item.id);
  }

  function editTask(e) {
    e.preventDefault();
    if (!task.trim()) {
      setError("Escriba algo por favor...");
      return;
    }

    const editedArray = arrayTask.map((item) =>
      item.id === id ? { id, taskName: task } : item
    );
    setArrayTask(editedArray);
    setEditMode(false);
    setTask("");
    setId("");
    setError(null);
  }

  return (
    <div className="container">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {arrayTask.length === 0 ? (
              <li className="list-group-item">No hay tareas.</li>
            ) : (
              arrayTask.map((item) => {
                return (
                  <li className="list-group-item" key={item.id}>
                    <span
                      style={{ textTransform: "capitalize" }}
                      className="lead"
                    >
                      {item.taskName}
                    </span>
                    <button
                      className="btn btn-warning btn-sm float-end mx-2"
                      onClick={() => editInput(item)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm float-end mx-2"
                      onClick={() => removeTask(item.id)}
                      disabled={editMode}
                    >
                      Eliminar
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Editar tarea" : "Agregar tarea"}
          </h4>
          <form onSubmit={editMode ? editTask : addTask}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={handleChange}
              value={task}
            />
            {editMode ? (
              <button
                className="form-control btn btn-warning btn-block"
                type="submit"
              >
                Editar
              </button>
            ) : (
              <button
                className="form-control btn btn-dark btn-block"
                type="submit"
              >
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
