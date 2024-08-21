const apiBaseURL = 'http://localhost:10000/api';

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const bookingForm = document.getElementById('bookingForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      const res = await fetch(`${apiBaseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      if (data.success) {
        alert('Registration successful');
        window.location.href = 'login.html';
      } else {
        alert(`Error: ${data.error}`);
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      const res = await fetch(`${apiBaseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
        window.location.href = 'places.html';
      } else {
        alert(`Error: ${data.error}`);
      }
    });
  }

  if (document.getElementById('placesList')) {
    fetchPlaces();
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const date = document.getElementById('date').value;
      const placeId = new URLSearchParams(window.location.search).get('placeId');
      const token = localStorage.getItem('token');
      
      const res = await fetch(`${apiBaseURL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ placeId, date }),
      });
      
      const data = await res.json();
      if (data.success) {
        alert('Booking successful');
        window.location.href = 'bookings.html';
      } else {
        alert(`Error: ${data.error}`);
      }
    });
  }

  if (document.getElementById('bookingsList')) {
    fetchBookings();
  }
});

async function fetchPlaces() {
  const res = await fetch(`${apiBaseURL}/places`);
  const data = await res.json();
  const placesList = document.getElementById('placesList');
  data.data.forEach(place => {
    const placeDiv = document.createElement('div');
    placeDiv.classList.add('place');
    placeDiv.innerHTML = `
      <h2>${place.name}</h2>
      <p>${place.description}</p>
      <p>Location: ${place.location}</p>
      <p>Price: ${place.price}</p>
      <a href="book.html?placeId=${place._id}">Book Now</a>
    `;
    placesList.appendChild(placeDiv);
  });
}

async function fetchBookings() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${apiBaseURL}/bookings`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const bookingsList = document.getElementById('bookingsList');
  data.data.forEach(booking => {
    const bookingDiv = document.createElement('div');
    bookingDiv.classList.add('booking');
    bookingDiv.innerHTML = `
      <h2>${booking.place.name}</h2>
      <p>Date: ${new Date(booking.date).toDateString()}</p>
      <p>Ticket Number: ${booking.ticketNumber}</p>
    `;
    bookingsList.appendChild(bookingDiv);
  });
}
