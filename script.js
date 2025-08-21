// Toggle dark mode
const toggle = document.getElementById("toggle-button");
toggle.addEventListener('click', () => {
  document.body.classList.toggle("dark-mode");
});

// Show section by ID
function showSection(id) {
  const section = document.getElementById(id);
  if (section) section.style.display = "block";
}

// Handle Admin Login
const adminForm = document.getElementById("admin-form");
if (adminForm) {
  adminForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById("usrnme").value;
    const password = document.getElementById("pwd").value;

    if (username == "Eshlok" && password == "Eshlok@123") {
      alert("Welcome Admin!");
      document.getElementById("admin").style.display = "none";
      document.getElementById("user").style.display = "block";
      displayUserMessages();
    } else {
      alert("Access Denied!");
    }
  });
}

// Handle Contact Form
const contactForm = document.getElementById("contact_form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e)=> {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const msg = document.getElementById("msg").value;
    const date = new Date().toLocaleString();

     try {
    // Add to Firestore
    await db.collection("messages").add({
      name,
      email,
      msg,
      date
    });

    alert("Thank you for your message!");
    contactForm.reset();
  }
  catch (error) {
    console.error("Error saving message: ", error);
    alert("Failed to send message. Please try again.")
  }
  });
}

// Display stored messages
function displayUserMessages() {
  const container = document.getElementById("user-messages");
  const messages = JSON.parse(localStorage.getItem("tempDB")) || [];

  container.innerHTML = ""; // Clear previous
  messages.forEach(({ name, email, msg, date }) => {
    const entry = document.createElement("div");
    entry.innerHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${msg}</p>
      <p><strong>Date:</strong> ${date}</p>
      <hr />
    `;
    container.appendChild(entry);
  });
}
