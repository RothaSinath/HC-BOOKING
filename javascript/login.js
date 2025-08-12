const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const backBtn = document.getElementById("back-btn");

// Toggle panels
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Back button functionality
if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (document.referrer && document.referrer !== window.location.href) {
      window.location.href = document.referrer;
    } else {
      window.location.href = "index.html"; // fallback to home
    }
  });
}

// Handle Sign Up form submission
const signUpForm = document.querySelector(".sign-up-container form");
if (signUpForm) {
  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;
    // Save to localStorage
    localStorage.setItem(
      "signupData",
      JSON.stringify({ name, email, password })
    );
    // Show success message
    alert("Sign up successful!");
    // Redirect to previous page or home
    if (document.referrer && document.referrer !== window.location.href) {
      window.location.href = document.referrer;
    } else {
      window.location.href = "index.html";
    }
  });
}

// Handle Sign In form submission
const signInForm = document.querySelector(".sign-in-container form");
if (signInForm) {
  signInForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // You can add authentication logic here if needed
    alert("Sign in successful!");
    if (document.referrer && document.referrer !== window.location.href) {
      window.location.href = document.referrer;
    } else {
      window.location.href = "index.html";
    }
  });
}

// Google Sign-In
const googleBtn = document.getElementById("google-login");
if (googleBtn) {
  googleBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        alert("Signed in as: " + result.user.email);
        // Redirect or save user info as needed
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// Facebook Sign-In
const facebookBtn = document.getElementById("facebook-login");
if (facebookBtn) {
  facebookBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        alert("Signed in as: " + result.user.email);
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

if (
  document.referrer &&
  !localStorage.getItem("lastPage") &&
  !document.referrer.includes("login.html")
) {
  localStorage.setItem("lastPage", document.referrer);
}
