// JavaScript for Full Content Transition

// Select all navbar links and the page content container
const navLinks = document.querySelectorAll(".nav-link");
const pageContent = document.getElementById("page-content");
const currentPage = window.location.pathname.split('/').pop();

// Add click event listeners to all navbar links
navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default navigation

        const color = this.getAttribute("data-color");

        // Change the background color of the page
        document.body.style.backgroundColor = color;
        // Add fade-out class to the page content
        pageContent.classList.add("fade-out");

        // Wait for the fade-out animation to complete
        setTimeout(() => {
            // Load the new page content
            loadNewContent(this.href);
        }, 500); // Match the duration of the fade-out animation
    });
});


// Function to load new content
function loadNewContent(url) {
    // Simulate fetching the new content (in a real app, use fetch or AJAX)
    fetch(url)
        .then(response => response.text())
        .then(html => {
            // Parse the new content from the fetched HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const newContent = doc.querySelector("main").innerHTML;

            // Update the current page content
            pageContent.innerHTML = newContent;

            // Add fade-in class to show the new content
            pageContent.classList.remove("fade-out");
            pageContent.classList.add("fade-in");

            // Remove the fade-in class after the animation
            setTimeout(() => {
                pageContent.classList.remove("fade-in");
            }, 500);
        });
}