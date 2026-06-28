const base = "http://localhost:5000";


function login() {
  fetch(base + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);

    if (data.message === "Login Success") {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "posts.html";
    }
  })
  .catch(err => console.log("Login Error:", err));
}


function createPost() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!title || !content) {
    alert("Fill all fields");
    return;
  }

  fetch(base + "/posts/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      user_id: user.id
    })
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    loadPosts();
  })
  .catch(err => console.log("Create Post Error:", err));
}


function loadPosts() {
  fetch(base + "/posts")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("posts");

    container.innerHTML = data.map(post => `
      <div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <h3>${post.title}</h3>
        <p>${post.content}</p>

        <button onclick="deletePost(${post.id})">Delete</button>
      </div>
    `).join("");
  })
  .catch(err => console.log("Load Posts Error:", err));
}


function deletePost(id) {
  fetch(base + "/posts/" + id, {
    method: "DELETE"
  })
  .then(res => res.text())
  .then(() => loadPosts())
  .catch(err => console.log("Delete Error:", err));
}


if (window.location.pathname.includes("posts")) {
  loadPosts();
}