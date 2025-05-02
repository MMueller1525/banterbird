let username = localStorage.getItem("username");
if( !username ) {
    window.location.href = "/login";
}

function renderPost(post, isNew = false) {
    const template = document
      .getElementById("post-template")
      .content.cloneNode(true);
    template.querySelector(".username").innerText = post.username;
    template.querySelector(".message").innerText = post.message;
  
    if (isNew) {
      document.getElementById("feed").prepend(template);
    } else {
      document.getElementById("feed").appendChild(template);
    }
  }

async function submitPost() {
  const message = document.getElementById("postInput").value;
  try {
    const response = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, message }),
    });
    if (response.ok) {
        renderPost({ username, message }, true); // Pass `isNew = true`
        document.getElementById("postInput").value = ""; // Clear the input box
      }
  } catch (error) {
    console.log("😭 Post failed", error);
  }
}

window.onload = async () => {
    try {
        const response = await fetch("/api/post");
        const posts = await response.json();
        posts.forEach(post => {
            renderPost(post);
        });

    }catch(error) {
        console.error("FIXXX THAAAT THIING, YOOUUR DAAARK SOOOUL", error);
    };
};
setInterval( async () => {
        try {
            const response = await fetch("/api/post");
            const posts = await response.json();
            document.getElementById("feed").innerHTML = "";
            posts.forEach(post => {
                renderPost(post);
            });
    
        }catch(error) {
            console.error("FIXXX THAAAT THIING, YOOUUR DAAARK SOOOUL", error);
        }
}, 5000); //Fetch new posts every 5 seconds
