// Select the elements with the image backgrounds
const images = document.querySelectorAll('.image');
let currentIndex = 0;

// Function to change the opacity of the images
function changeImage() {
    images[currentIndex].style.opacity = '0'; // Hide the current image
    currentIndex = (currentIndex + 1) % images.length; // Move to the next image index
    images[currentIndex].style.opacity = '1'; // Show the next image
}

// Change the image every 4 seconds
setInterval(changeImage, 4000);

// Lightbox functionality
var slideIndex = 0;
var slides = document.querySelectorAll('.portfolio-item');
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');
var lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(index) {
    slideIndex = index;
    updateLightbox();
    lightbox.style.display = 'block';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function changeSlide(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    updateLightbox();
}

function updateLightbox() {
    var img = slides[slideIndex].getElementsByTagName('img')[0];
    var caption = slides[slideIndex].getElementsByClassName('overlay')[0].innerText;
    lightboxImg.src = img.src;
    lightboxCaption.innerText = caption;
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (lightbox.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (event.key === 'ArrowRight') {
            changeSlide(1);
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    }
});

// Add swipe functionality for mobile
var touchStartX = 0;
var touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
}

function handleSwipeGesture() {
    if (lightbox.style.display === 'block') {
        if (touchEndX < touchStartX) {
            changeSlide(1); // Swipe left to next image
        } else if (touchEndX > touchStartX) {
            changeSlide(-1); // Swipe right to previous image
        }
    }
}

lightbox.addEventListener('touchstart', handleTouchStart);
lightbox.addEventListener('touchend', handleTouchEnd);


// Disable right-click
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});


// Preload images
const preloadImages = () => {
    images.forEach(img => {
        const src = img.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
        const image = new Image();
        image.src = src;
    });
};

preloadImages();

