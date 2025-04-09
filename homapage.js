        // Select the Login button
        const loginBtn = document.getElementById('loginBtn');

        // Add event listeners for mouseenter and mouseleave
        loginBtn.addEventListener('mouseenter', () => {
            loginBtn.classList.add('animate');
        });
        
        loginBtn.addEventListener('mouseleave', () => {
            // Remove the class after the animation ends to reset
            setTimeout(() => {
                loginBtn.classList.remove('animate');
            }, 400); // Match the duration of the animation
        });
        // Optionally, you can add some JavaScript to trigger animations when the page fully loads
window.onload = () => {
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');

    leftSide.style.animation = 'slideInLeft 1s ease-out';
    rightSide.style.animation = 'slideInRight 1s ease-out';
};

// Select the section you want to observe
const section = document.querySelector('#why-petopia');

// Create an intersection observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the class when section is in view
            setTimeout(() => {
                entry.target.classList.add('in-view');
            }, 300); // 1s delay
            observer.unobserve(entry.target); // Stop observing after it enters the view
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the section is in view
});

// Observe the section
observer.observe(section);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target); // Stop observing once the animation is triggered
                }
            });
        },
        {
            threshold: 0.1, // Trigger when 10% of the element is visible
        }
    );

    cards.forEach(card => {
        observer.observe(card);
    });
});

document.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) { // Change 50 to adjust scroll trigger
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


const loginPanel = document.getElementById('loginPanel');
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById('closeButton');

// Show the login panel when the login button is clicked
loginBtn.addEventListener('click', () => {
  overlay.style.display = 'block';
  loginPanel.style.display = 'block';
  document.body.style.overflow ='hidden';
  document.querySelector('.header').style.display='none';
});

// Hide the login panel and overlay when the close button is clicked
closeButton.addEventListener('click', () => {
  overlay.style.display = 'none';
  loginPanel.style.display = 'none';
  document.body.style.overflow ='auto';
  document.querySelector('.header').style.display='flex';
});

// Close the login panel and overlay if the user clicks outside the panel (on overlay)
overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
  loginPanel.style.display = 'none';
});

const signUpBtn = document.getElementById("sign-up-btn");
const signInBtn = document.getElementById("sign-in-btn");
const container = document.querySelector(".container");

signUpBtn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//logreg
// DOM Elements
const loginForm = document.querySelector('.sign-in-form');
const registerForm = document.querySelector('.sign-up-form');

// Utility function for input validation
function validateInput(input, type) {
    if (!input || input.trim() === '') {
        return `${type} is required.`;
    }

    if (type === 'Email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        return 'Invalid email format.';
    }

    if (type === 'Password' && input.length < 6) {
        return 'Password must be at least 6 characters long.';
    }

    return '';
}

// Login Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Validation
    let errorMessage = validateInput(email, 'Email') || validateInput(password, 'Password');
    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Login failed.');
        } else {
            alert('Login successful!');
            localStorage.setItem('token', data.token);
            window.location.href = 'homepage.html';
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error(error);
    }
});

// Registration Form Submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;
    const confirmPassword = registerForm.querySelector('input[placeholder="Confirm Password"]').value;

    // Validation
    let errorMessage =
        validateInput(username, 'Username') ||
        validateInput(email, 'Email') ||
        validateInput(password, 'Password');

    if (!errorMessage && password !== confirmPassword) {
        errorMessage = 'Passwords do not match.';
    }

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Registration failed.');
        } else {
            alert('Registration successful! Please log in.');
            document.querySelector('#sign-in-btn').click(); // Switch to login form
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error(error);
    }
});

// login logout btn
// Button Elements
const logoutBtn = document.getElementById('logoutBtn');
const letStartBtn = document.querySelector('.let-start-btn');

// Function to toggle button visibility
function updateButtonVisibility(isLoggedIn) {
    if (isLoggedIn) {
        loginBtn.style.display = 'none'; // Hide Login button
        letStartBtn.style.display = 'none'; // Hide Let's Start button
        logoutBtn.style.display = 'inline-block'; // Show Logout button
    } else {
        loginBtn.style.display = 'inline-block'; // Show Login button
        letStartBtn.style.display = 'none'; // Show Let's Start button
        logoutBtn.style.display = 'none'; // Hide Logout button
    }
}

// Logout Button Click Event
logoutBtn.addEventListener('click', () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Notify the user
    alert('Logged out successfully.');

    // Update button visibility to reflect logged-out state
    updateButtonVisibility(false);

    // Optional: Redirect user to the home or login page
    window.location.href = 'homepage.html'; // Adjust the URL as per your app
});

// Check login state on page load
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    updateButtonVisibility(!!token); // Update buttons based on login state
});
