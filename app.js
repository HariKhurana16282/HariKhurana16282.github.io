// Function to open Add Spot screen
function openAddSpot() {
    window.location.href = 'add.html';
}

// Function to go back to the previous screen
function goBack() {
    window.history.back();
}

// Function to save a new spot
function saveSpot(event) {
    event.preventDefault();
    const imageInput = document.getElementById('image');
    const reviewInput = document.getElementById('review');
    const ratingInput = document.getElementById('rating');

    const reader = new FileReader();
    reader.onload = function() {
        const spots = JSON.parse(localStorage.getItem('spots')) || [];
        const newSpot = {
            image: reader.result,
            review: reviewInput.value,
            rating: ratingInput.value
        };
        spots.push(newSpot);
        localStorage.setItem('spots', JSON.stringify(spots));
        window.location.href = 'index.html';
    };
    reader.readAsDataURL(imageInput.files[0]);
}

// Function to display spots in the dashboard
function displaySpots() {
    const dashboard = document.getElementById('dashboard');
    const spots = JSON.parse(localStorage.getItem('spots')) || [];
    spots.forEach((spot, index) => {
        const spotElement = document.createElement('div');
        spotElement.classList.add('spot');
        spotElement.innerHTML = `
            <img src="${spot.image}" alt="Spot Image">
            <p>${spot.review.substring(0, 100)}...</p>
            <p>Rating: ${spot.rating}</p>
            <button onclick="viewDetails(${index})">View Details</button>
        `;
        dashboard.appendChild(spotElement);
    });
}

// Function to view details of a spot
function viewDetails(index) {
    localStorage.setItem('currentSpot', index);
    window.location.href = 'detail.html';
}

// Function to display spot details
function displaySpotDetails() {
    const spotDetails = document.getElementById('spot-details');
    const index = localStorage.getItem('currentSpot');
    const spots = JSON.parse(localStorage.getItem('spots')) || [];
    const spot = spots[index];
    spotDetails.innerHTML = `
        <img src="${spot.image}" alt="Spot Image">
        <p>${spot.review}</p>
        <p>Rating: ${spot.rating}</p>
    `;
}

// Event listeners for loading dashboard and spot details
window.onload = function() {
    if (document.getElementById('dashboard')) {
        displaySpots();
    } else if (document.getElementById('spot-details')) {
        displaySpotDetails();
    }
};
