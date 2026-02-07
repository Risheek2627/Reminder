// const BASE_URL = "http://localhost:5000";
// const token = localStorage.getItem("token");

// if (!token) window.location.href = "login.html";

// let editTaskId = null;

// async function fetchTasks() {
//   const res = await fetch(`${BASE_URL}/topics/get`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   const tasks = await res.json();

//   taskList.innerHTML = "";
//   tasks.forEach((task) => {
//     taskList.innerHTML += `
//       <div class="col-md-4 mb-3">
//         <div class="card">
//           <div class="card-body">
//             <h6>${task.title}</h6>
//             <button class="btn btn-sm btn-warning me-2" onclick="openEdit('${task._id}','${task.title}')">Edit</button>
//             <button class="btn btn-sm btn-danger" onclick="deleteTask('${task._id}')">Delete</button>
//           </div>
//         </div>
//       </div>`;
//   });
// }

// async function addTask() {
//   if (!taskInput.value.trim()) return alert("Empty task");

//   await fetch(`${BASE_URL}/topics/add`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ title: taskInput.value }),
//   });

//   taskInput.value = "";
//   fetchTasks();
// }

// function openEdit(id, title) {
//   editTaskId = id;
//   editTaskInput.value = title;
//   new bootstrap.Modal(editModal).show();
// }

// async function updateTask() {
//   await fetch(`${BASE_URL}/topics/${editTaskId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ title: editTaskInput.value }),
//   });

//   bootstrap.Modal.getInstance(editModal).hide();
//   fetchTasks();
// }

// async function deleteTask(id) {
//   await fetch(`${BASE_URL}/topics/${id}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   fetchTasks();
// }

// function logout() {
//   localStorage.removeItem("token");
//   window.location.href = "login.html";
// }

// fetchTasks();

const BASE_URL = "http://localhost:5000";
const token = localStorage.getItem("token");

// Protect dashboard
if (!token) {
  window.location.href = "login.html";
}

const topicList = document.getElementById("topicList");
const topicInput = document.getElementById("topicInput");
const editTopicInput = document.getElementById("editTopicInput");

let editTopicId = null;

function goHome() {
  const token = localStorage.getItem("token");

  if (token) {
    // Logged in → dashboard is home
    window.location.href = "dashboard.html";
  } else {
    // Logged out → landing page
    window.location.href = "index.html";
  }
}

/* =========================
   FETCH ALL TOPICS
========================= */
async function fetchTopics() {
  try {
    const res = await fetch(`/topics/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();

    // ✅ CORRECT: backend sends topics inside `data`
    const topics = response.data;

    topicList.innerHTML = "";

    if (!topics || topics.length === 0) {
      topicList.innerHTML = `
        <p class="text-muted">No topics added yet.</p>
      `;
      return;
    }

    topics.forEach((topic) => {
      topicList.innerHTML += `
        <div class="col-md-4 mb-3">
          <div class="card shadow-sm h-100">
            <div class="card-body d-flex flex-column justify-content-between">

              <div>
                <h6 class="card-title">${topic.title}</h6>
                <small class="text-muted">
                  Learned: ${new Date(topic.learnedDate).toLocaleString()}
                </small>
              </div>

              <div class="mt-3">
                <button
                  class="btn btn-sm btn-warning me-2"
                  onclick="openEdit('${topic._id}', '${topic.title.replace(/'/g, "\\'")}')"
                >
                  Modify
                </button>

                <button
                  class="btn btn-sm btn-danger"
                  onclick="deleteTopic('${topic._id}')"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load topics");
  }
}

/* =========================
   ADD TOPIC
========================= */
async function addTopic() {
  const title = topicInput.value.trim();

  if (!title) {
    alert("Topic cannot be empty");
    return;
  }

  try {
    await fetch(`/topics/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    topicInput.value = "";
    fetchTopics();
  } catch {
    alert("Failed to add topic");
  }
}

/* =========================
   OPEN EDIT MODAL
========================= */
function openEdit(id, title) {
  editTopicId = id;
  editTopicInput.value = title;

  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}

/* =========================
   UPDATE TOPIC
========================= */
async function updateTopic() {
  const updatedTitle = editTopicInput.value.trim();

  if (!updatedTitle) {
    alert("Title cannot be empty");
    return;
  }

  try {
    await fetch(`/topics/${editTopicId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: updatedTitle }),
    });

    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();

    fetchTopics();
  } catch {
    alert("Failed to update topic");
  }
}

/* =========================
   DELETE TOPIC
========================= */
async function deleteTopic(id) {
  if (!confirm("Delete this topic?")) return;

  try {
    await fetch(`/topics/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTopics();
  } catch {
    alert("Failed to delete topic");
  }
}

/* =========================
   LOGOUT
========================= */
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// Initial load
fetchTopics();
