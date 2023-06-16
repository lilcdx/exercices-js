//Récupération des values des input du form
function getFormValues() {
  let tache = {
    niveau: document.getElementById("lvl").value,
    nom: document.getElementById("name").value,
    desc: document.getElementById("description").value,
  };
  return tache;
}

//ajout du nouvel tache au json contenu dans le localStorage
function addNewTask(task) {
  if (!(task.nom == "")){
    addTaskToHtml(task);
    if (localStorage.getItem("toDoList") == null) {
      localStorage.setItem("toDoList", `[${JSON.stringify(task)}]`);
    } else {
      let toDoList = JSON.parse(localStorage.getItem("toDoList"));
      toDoList.push(task);
      localStorage.setItem("toDoList", JSON.stringify(toDoList));
    }
  }
  else{
    console.log("La tache n'a pas de nom")
  }
}

function afficherListe() {
  const toDoList = JSON.parse(localStorage.getItem("toDoList"));
  if (toDoList.length > 0){
    document.getElementById("all-tasks").innerHTML = "";
    for (let toDo of toDoList) {
      addTaskToHtml(toDo);
    }
  }
  
}

function addTaskToHtml(task) {
  let allTasks = document.getElementById("all-tasks");
  let newLi = document.createElement("li");
  newLi.dataset.index = document.querySelectorAll("#all-tasks li").length;
  newLi.innerHTML = `<p><a href="#" class='taskLink' data-index='${newLi.dataset.index}'>${task.nom}</a> - ${task.niveau}% </p>`;
  addRemoveBtn(newLi);
  allTasks.append(newLi);
  const taskLink = newLi.querySelector(".taskLink");
  taskLink.addEventListener("click", function () {
    afficherDetails(taskLink.dataset.index);
  });
}

function addRemoveBtn(newLi){
  const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn");
    removeBtn.innerHTML =
      `<i class="fa-solid fa-circle-xmark" style="color: white;"></i>`;
    newLi.append(removeBtn);
    removeBtn.addEventListener("click", function () {
      removeTask(newLi);
    });
}

function removeTask(li){
  li.remove();
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));
  toDoList.splice(li.dataset.index, 1);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  let taskDetails = document.getElementById("task-details");
  taskDetails.classList.add('hide');
  afficherListe();
}

function afficherDetails(index) {
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));
  const task = toDoList[index];
  const taskDetails = document.getElementById("task-details");
  taskDetails.querySelector("h3").textContent = `${task.nom} - ${task.niveau}%`;
  taskDetails.querySelector("p").textContent = task.desc;
  const editTask = taskDetails.querySelector("a");
  editTask.dataset.index = index;
  editTask.addEventListener("click", function () {
    modifyTask(index);
  });
  taskDetails.classList.remove("hide");
}

function modifyTask(index) {
  const taskForm = document.getElementById("task-form");
  taskForm.dataset.mode = "edit";
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));
  let task = toDoList[index];
  document.getElementById("lvl").value = task.niveau;
  document.getElementById("name").value = task.nom;
  document.getElementById("description").value = task.desc;
  taskForm.classList.remove("hide");
}

function updateHtml(index, task){
  let allLi = document.querySelectorAll("#all-tasks li");
  for (li of allLi){
    console.log(li);
    if (li.dataset.index == index){
      li.innerHTML = `<p><a href="#" class='taskLink' data-index='${index}'>${task.nom}</a> - ${task.niveau}% </p>`;      
    }
  }
}

// Action lorsque que le bouton + est cliqué (affichage du formulaire)
const taskForm = document.getElementById("task-form");
const addTask = document.getElementById("add-task");
addTask.addEventListener("click", function () {
  taskForm.classList.remove("hide");
});

// Action lorsque le bouton enregistrer est cliqué (save+reset)
const saveForm = document.getElementById("save");
saveForm.addEventListener("click", function () {
  if (taskForm.dataset.mode == "edit") {
    const changedTask = getFormValues();
    const index = document.getElementById("task-details").querySelector("a").dataset.index;
    let toDoList = JSON.parse(localStorage.getItem("toDoList"));
    toDoList[index] = changedTask;
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    updateHtml(index,changedTask);
    taskForm.dataset.mode = "add";
  } else {
    addNewTask(getFormValues());
  }
  taskForm.classList.add("hide");
  taskForm.reset();
});

const clearTodo = document.getElementById("clear-todo");
clearTodo.addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("all-tasks").innerHTML = "";
})
afficherListe();
