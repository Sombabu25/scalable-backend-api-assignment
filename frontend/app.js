// Frontend application logic
const API_BASE = 'http://127.0.0.1:8000/api/v1';

// Debug: Check if functions are loaded
console.log('app.js loaded successfully');
console.log('toggleForm function:', typeof toggleForm);
console.log('login function:', typeof login);
console.log('register function:', typeof register);

// Toggle between login and register forms
function toggleForm() {
  console.log('toggleForm called');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  console.log('loginForm:', loginForm);
  console.log('registerForm:', registerForm);
  
  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }
}

// Clear messages
function clearMessages() {
  document.getElementById('loginMessage').textContent = '';
  document.getElementById('registerMessage').textContent = '';
}

// Register new user
async function register() {
  console.log('register function called');
  clearMessages();
  
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const messageDiv = document.getElementById("registerMessage");

  console.log('Email:', email);
  console.log('Password length:', password ? password.length : 0);

  if (!email || !password) {
    messageDiv.textContent = "Please fill in all fields";
    messageDiv.className = "error";
    return;
  }

  try {
    console.log('Sending registration request to:', `${API_BASE}/register`);
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    console.log('Response status:', res.status);
    const data = await res.json();
    console.log('Response data:', data);
    
    if (res.ok) {
      messageDiv.textContent = "Registration successful! Please login.";
      messageDiv.className = "success";
      // Clear form
      document.getElementById("registerEmail").value = '';
      document.getElementById("registerPassword").value = '';
      // Switch to login form after 2 seconds
      setTimeout(() => toggleForm(), 2000);
    } else {
      console.log('Validation errors:', data.detail);
      if (Array.isArray(data.detail)) {
        messageDiv.textContent = data.detail.map(err => err.msg).join(', ');
      } else {
        messageDiv.textContent = data.detail || "Registration failed";
      }
      messageDiv.className = "error";
    }
  } catch (error) {
    console.error('Registration error:', error);
    messageDiv.textContent = "Network error. Please try again.";
    messageDiv.className = "error";
  }
}

// Login user
async function login() {
  console.log('login function called');
  clearMessages();
  
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const messageDiv = document.getElementById("loginMessage");

  console.log('Email:', email);
  console.log('Password length:', password ? password.length : 0);

  if (!email || !password) {
    messageDiv.textContent = "Please fill in all fields";
    messageDiv.className = "error";
    return;
  }

  try {
    console.log('Sending login request to:', `${API_BASE}/login`);
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    console.log('Response status:', res.status);
    const data = await res.json();
    console.log('Response data:', data);
    
    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userRole", data.user_role);
      
      messageDiv.textContent = "Login successful! Redirecting...";
      messageDiv.className = "success";
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      console.log('Login errors:', data.detail);
      if (Array.isArray(data.detail)) {
        messageDiv.textContent = data.detail.map(err => err.msg).join(', ');
      } else {
        messageDiv.textContent = data.detail || "Login failed";
      }
      messageDiv.className = "error";
    }
  } catch (error) {
    console.error('Login error:', error);
    messageDiv.textContent = "Network error. Please try again.";
    messageDiv.className = "error";
  }
}

// Get Tasks
async function getTasks() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();
  return data;
}

// Logout function
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "index.html";
}

// Check if user is authenticated
function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}
