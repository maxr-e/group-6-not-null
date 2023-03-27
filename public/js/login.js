var loginbutton = document.querySelector("#loginbutton");
var signupbutton = document.querySelector("#signupbutton");

const login = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Failed to log in.');
          }
}}

const signup = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const age = document.querySelector('#age-signup').value.trim();
  
    if (username && email && password && age) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({username, email, password, age}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  

loginbutton.addEventListener("click", login);

signupbutton.addEventListener("click", signup);