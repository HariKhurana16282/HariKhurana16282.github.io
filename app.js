// Function to open Add Spot screen
function openAddSpot() {
    localStorage.removeItem('currentSpot'); // Clear currentSpot when adding a new spot
    window.location.href = 'add.html'; // Redirect to add.html page
}

// Function to go back to the previous screen
function goBack() {
    window.history.back(); // Navigate back to previous page in browser history
}

// Function to save a new spot
function saveSpot(event) {
    event.preventDefault();
    const imageInput = document.getElementById('image'); // gets references to the form inputs
    const reviewInput = document.getElementById('review');
    const ratingInput = document.getElementById('rating');

    const currentSpotIndex = localStorage.getItem('currentSpot'); // get current spot index from local storage
    const spots = JSON.parse(localStorage.getItem('spots')) || []; // gets the spotrs array from local storage, or initialises it if it doesn't exist

    if (currentSpotIndex !== null && currentSpotIndex !== "null") {
        const spot = spots[currentSpotIndex]; // Edit existing spot
        if (imageInput.files.length > 0) {
            const reader = new FileReader(); // If a new image i selected, read it and update the spot
            reader.onload = function () {
                spot.image = reader.result;
                spot.review = reviewInput.value;
                spot.rating = ratingInput.value;
                spots[currentSpotIndex] = spot;
                localStorage.setItem('spots', JSON.stringify(spots));
                localStorage.removeItem('currentSpot'); // Clear currentSpot after saving
                window.location.href = 'index.html'; //redirect to index.html
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            //if no new image is selected, update review and rating only
            spot.review = reviewInput.value;
            spot.rating = ratingInput.value;
            spots[currentSpotIndex] = spot;
            localStorage.setItem('spots', JSON.stringify(spots));
            localStorage.removeItem('currentSpot'); // Clear currentSpot after saving
            window.location.href = 'index.html'; //redirect to index.html
        }
    } else {
        // Add new spot
        const reader = new FileReader();
        reader.onload = function () {
            // create a new spot object with the image, review, and rating
            const newSpot = {
                image: reader.result,
                review: reviewInput.value,
                rating: ratingInput.value
            };
            spots.push(newSpot); //add the new spot to the spots array
            localStorage.setItem('spots', JSON.stringify(spots));
            window.location.href = 'index.html'; //redirect to index.html
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
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
    // save the index of the current spot to local storage
    localStorage.setItem('currentSpot', index);
    //redirect to details.html page
    window.location.href = 'detail.html';
}

// Function to display spot details
function displaySpotDetails() {
    const spotDetails = document.getElementById('spot-details');
    const index = localStorage.getItem('currentSpot');
    const spots = JSON.parse(localStorage.getItem('spots')) || [];
    const spot = spots[index];
    //populate the spot details with spot data
    spotDetails.innerHTML = `
        <img src="${spot.image}" alt="Spot Image">
        <p>${spot.review}</p>
        <p>Rating: ${spot.rating}</p>
    `;
    // Set the onclick handlers for the edit and delete buttons
    document.getElementById('edit-spot').onclick = function () {
        editSpot(index);
    };
    document.getElementById('delete-spot').onclick = function () {
        deleteSpot(index);
    };
}

// Function to edit a spot
function editSpot(index) {
    // Save the index of the current spot to local storage
    localStorage.setItem('currentSpot', index);
    // Redirect to add.html page
    window.location.href = 'add.html';
}

// Function to delete a spot with confirmation
function deleteSpot(index) {
    const confirmation = confirm("Are you sure you want to delete this spot?");
    if (confirmation) {
        const spots = JSON.parse(localStorage.getItem('spots')) || [];
        // remove the spot from the spots array
        spots.splice(index, 1);
        localStorage.setItem('spots', JSON.stringify(spots));
        // Redirect to add.html page
        window.location.href = 'index.html';
    }
}


// Event listeners for loading dashboard and spot details
window.onload = function () {
    // Check which page is loaded and call the appropriate function
    if (document.getElementById('dashboard')) {
        displaySpots();
    } else if (document.getElementById('spot-details')) {
        displaySpotDetails();
    } else if (document.getElementById('add-spot-form')) {
        const currentSpotIndex = localStorage.getItem('currentSpot');
        if (currentSpotIndex !== null && currentSpotIndex !== "null") {
            const spots = JSON.parse(localStorage.getItem('spots')) || [];
            const spot = spots[currentSpotIndex];
            // pre fill the form with the existing spot data if editing
            document.getElementById('review').value = spot.review;
            document.getElementById('rating').value = spot.rating;
        }
    }
};
