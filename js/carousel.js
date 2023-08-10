document.addEventListener("DOMContentLoaded", function () {
    const carouselInner = document.getElementById("projects-carousel-inner");
    let jsonData;
    let currentIndex = 0;

    async function fetchJSONData() {
        try {
            const response = await fetch("../json/projects.json");
            jsonData = await response.json();
            startCarousel();
        } catch (error) {
            console.error("Error fetching JSON data:", error);
        }
    }

    function displayProject(index) {
        const project = jsonData.projects[index];
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.innerHTML = `
        <h2>${project.name}</h2>
        <p>${project.description}</p>
        <img src="${project.link}" alt="${project.name}">
      `;
        carouselInner.innerHTML = "";
        carouselInner.appendChild(projectElement);
    }

    function nextProject() {
        currentIndex = (currentIndex + 1) % jsonData.projects.length;
        displayProject(currentIndex);
        carouselInner.style.transform = `translateX(100%)`;
        setTimeout(() => {
            carouselInner.style.transition = "transform 1s ease-in-out";
            carouselInner.style.transform = "translateX(0)";
        }, 0);
    }

    function startCarousel() {
        if (jsonData && jsonData.projects.length > 0) {
            displayProject(currentIndex);
            setInterval(nextProject, 5000); // Change image every 5 seconds
        } else {
            console.error("No projects data found.");
        }
    }

    // Fetch JSON data and start the carousel
    fetchJSONData();
});
