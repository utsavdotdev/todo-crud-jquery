$(document).ready(function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let editIndex = null;

  const $input = $("#todo-input");
  const $button = $("#action-btn");
  const $list = $("#todo-list");

  function renderTasks() {
    $list.empty();
    tasks.forEach((task, index) => {
      $list.append(`
                <li>
                    <span class="task-content ${task.completed ? "completed" : ""}">${task.text}</span>
                    <div class="controls">
                        <span class="btn-subtle edit-trigger" data-index="${index}">Edit</span>
                        <span class="btn-subtle delete-trigger" data-index="${index}">Delete</span>
                    </div>
                </li>
            `);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  $button.on("click", function () {
    const val = $input.val().trim();
    if (!val) return;
    if (editIndex != null) {
      tasks[editIndex].text = val;
      editIndex = null;
      $button.text("Add");
    } else {
      tasks.push({ text: val, completed: false });
    }
    $input.val("");
    renderTasks();
  });

  $input.on("keypress", function (e) {
    if (e.which === 13) $button.click();
  });

  $list.on("click", ".task-content", function () {
    const index = $(this)
      .siblings(".controls")
      .find(".edit-trigger")
      .data("index");
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  });

  $list.on("click", ".delete-trigger", function () {
    const index = $(this).data("index");
    tasks.splice(index, 1);
    renderTasks();
  });

  $list.on("click", ".edit-trigger", function () {
    const index = $(this).data("index");
    editIndex = index;

    $input.val(tasks[index].text);
    $button.text("Update");
    $input.focus();
  });

  renderTasks();
});
