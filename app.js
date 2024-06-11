//function to open Add Spot screen
function openAddSpot() {
    localStorage.removeItem('currentSpot'); // Clear currentSpot when adding a new spot
    window.location.href = 'add.html';
}

//function to go back to the previous screen
function goBack() {
    window.history.back();
}

//function to save a new spot
function saveSpot(event) {
    event.preventDefault();
    const imageInput = document.getElementById('image');
    const reviewInput = document.getElementById('review');
    const ratingInput = document.getElementById('rating');

    const currentSpotIndex = localStorage.getItem('currentSpot');
    const spots = JSON.parse(localStorage.getItem('spots')) || [];

    if (currentSpotIndex !== null && currentSpotIndex !== "null") {
        // Edit existing spot
        const spot = spots[currentSpotIndex];
        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function () {
                spot.image = reader.result;
                spot.review = reviewInput.value;
                spot.rating = ratingInput.value;
                spots[currentSpotIndex] = spot;
                localStorage.setItem('spots', JSON.stringify(spots));
                localStorage.removeItem('currentSpot'); //clear currentSpot after saving
                window.location.href = 'index.html';
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            spot.review = reviewInput.value;
            spot.rating = ratingInput.value;
            spots[currentSpotIndex] = spot;
            localStorage.setItem('spots', JSON.stringify(spots));
            localStorage.removeItem('currentSpot'); //clear currentSpot after saving
            window.location.href = 'index.html';
        }
    } else {
        // Add new spot
        const reader = new FileReader();
        reader.onload = function () {
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
}

//function to display spots in the dashboard
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

//function to view details of a spot
function viewDetails(index) {
    localStorage.setItem('currentSpot', index);
    window.location.href = 'detail.html';
}

//function to display spot details
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

    document.getElementById('edit-spot').onclick = function () {
        editSpot(index);
    };
    document.getElementById('delete-spot').onclick = function () {
        deleteSpot(index);
    };
}

//function to edit a spot
function editSpot(index) {
    localStorage.setItem('currentSpot', index);
    window.location.href = 'add.html';
}

//function to delete a spot
function deleteSpot(index) {
    const spots = JSON.parse(localStorage.getItem('spots')) || [];
    spots.splice(index, 1);
    localStorage.setItem('spots', JSON.stringify(spots));
    window.location.href = 'index.html';
}

//event listeners for loading dashboard and spot details
window.onload = function () {
    if (document.getElementById('dashboard')) {
        displaySpots();
    } else if (document.getElementById('spot-details')) {
        displaySpotDetails();
    } else if (document.getElementById('add-spot-form')) {
        const currentSpotIndex = localStorage.getItem('currentSpot');
        if (currentSpotIndex !== null && currentSpotIndex !== "null") {
            const spots = JSON.parse(localStorage.getItem('spots')) || [];
            const spot = spots[currentSpotIndex];
            document.getElementById('review').value = spot.review;
            document.getElementById('rating').value = spot.rating;
        }
    }
};
