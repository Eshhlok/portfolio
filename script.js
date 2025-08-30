import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDhWBybiOxuy_ydLpzY_UiJUCM8X4rm5A4",
  authDomain: "eshlok-portfolio-458df.firebaseapp.com",
  projectId: "eshlok-portfolio-458df",
  storageBucket: "eshlok-portfolio-458df.firebasestorage.app",
  messagingSenderId: "75188744480",
  appId: "1:75188744480:web:4e356e733364f7d5d76745",
  measurementId: "G-2MS8B2GPQ5"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    await addDoc(collection(db, "messages"),{
      name,
      email,
      msg,
      date,
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
async function displayUserMessages() {
  const container = document.getElementById("user-messages");
  container.innerHTML = ""; // Clear old

  try {
    const querySnapshot = await getDocs(collection(db, "messages"));
    querySnapshot.forEach((doc) => {
      const { name, email, msg, date } = doc.data();
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
  } catch (error) {
    console.error("Error fetching messages: ", error);
  }
}
