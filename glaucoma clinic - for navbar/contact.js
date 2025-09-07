
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxIBTkk8wON3qPoN5pOIz-yOM4JOGM-exBb5fYmcMXs22EuyRu5HsMzJyodOZua04-KCg/exec";

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;
  const body = new URLSearchParams(new FormData(form)); // application/x-www-form-urlencoded

  // IMPORTANT: do not add custom headers (avoid preflight). URLSearchParams keeps this a simple request.
  fetch(WEB_APP_URL, {
    method: 'POST',
    body: body
  })
  .then(response => response.json())
  .then(result => {
    if (result && result.status === 'success') {
      document.getElementById('formMsg').innerText = 'Message sent — thank you!';
      form.reset();
    } else {
      document.getElementById('formMsg').innerText = 'Server error. Please try again.';
      console.error('Server response:', result);
    }
  })
  .catch(err => {
    document.getElementById('formMsg').innerText = 'Network error. Try again later.';
    console.error('Fetch error:', err);
  });
});



