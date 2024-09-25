const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("postsContainer");
let editMode = false;
let editPostId = null;

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Load posts on page load
loadPosts();

function loadPosts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  // postsContainer.innerHTML = "";
  posts.forEach((post) => {
    // postsContainer.innerHTML += generatePostHTML(post);

    postsContainer.appendChild(generatePostHTML(post));
  });
}

// Save or Update post
postForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const imgUrl = document.getElementById("imgUrl").value;

  if (title && content && imgUrl) {
    if (editMode) {
      updatePost({
        id: editPostId,
        title,
        content,
        imgUrl,
        userId: currentUser.username,
      });
    } else {
      createPost({
        id: Date.now().toString(),
        title,
        content,
        imgUrl,
        userId: currentUser.username,
      });
    }

    loadPosts(); // Reload posts
    postForm.reset(); // Clear form
    editMode = false;
    document.getElementById("postSubmitBtn").textContent = "Save Post";
  } else {
    alert("Please fill in all fields!");
  }
});

// Create a new post
function createPost(post) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Update an existing post
function updatePost(updatedPost) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postIndex = posts.findIndex((post) => post.id === updatedPost.id);
  posts[postIndex] = updatedPost;
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Edit a post
function editPost(postId) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find((post) => post.id === postId);

  document.getElementById("title").value = post.title;
  document.getElementById("content").value = post.content;
  document.getElementById("imgUrl").value = post.imgUrl;

  editMode = true;
  editPostId = post.id;
  document.getElementById("postSubmitBtn").textContent = "Update Post";
}

// Delete a post
function deletePost(postId) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.filter((post) => post.id !== postId);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts(); // Reload posts
}

// Generate Post HTML
function generatePostHTML(post) {
  // Create the outer div for the post card
  const postCard = document.createElement("div");
  postCard.classList.add("post-card");

  // Create the image element
  const postImage = document.createElement("img");
  postImage.src = post.imgUrl;
  postImage.alt = "Post Image";
  postCard.appendChild(postImage);

  // Create the title element (h3)
  const postTitle = document.createElement("h3");
  postTitle.textContent = post.title;
  postCard.appendChild(postTitle);

  // Create the content paragraph element (p)
  const postContent = document.createElement("p");
  postContent.textContent = post.content;
  postCard.appendChild(postContent);

  // Create the buttons container div
  const buttonsDiv = document.createElement("div");
  buttonsDiv.style.display =
    currentUser?.username !== post.userId ? "none" : "flex";
  buttonsDiv.style.justifyContent = "space-around";

  // Create the edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("button");
  editButton.onclick = function () {
    editPost(post.id);
  };
  buttonsDiv.appendChild(editButton);

  // Create the delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("button", "delete-button");
  deleteButton.onclick = function () {
    deletePost(post.id);
  };
  buttonsDiv.appendChild(deleteButton);

  // Append the buttons div only if the user is authorized
  if (currentUser?.username === post.userId) {
    postCard.appendChild(buttonsDiv);
  }
  console.log(postCard);
  return postCard;
}

// function generatePostHTML(post) {
//   return `
//         <div class="post-card">
//             <img src="${post.imgUrl}" alt="Post Image">
//             <h3>${post.title}</h3>
//             <p>${post.content}</p>
//             <div style='display: ${
//               currentUser?.username !== post.userId ? "none" : "flex"
//             }; justify-content: space-around'>
//             <button onclick="editPost('${
//               post.id
//             }')" class="button">Edit</button>
//             <button onclick="deletePost('${
//               post.id
//             }')" class="button delete-button">Delete</button>
//         </div>
//         </div>
//     `;
// }

const logOut = document.querySelector("#logout");

logOut.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});
