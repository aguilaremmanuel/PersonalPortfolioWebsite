document.addEventListener("DOMContentLoaded", function () {

    let openMenuIcon = document.getElementById('open-menu-icon');
    let closeMenuIcon = document.getElementById('close-menu-icon');
    let responsiveMenu = document.getElementById('responsive-menu');

    openMenuIcon.addEventListener('click', function() {

        this.classList.add('rotate'); 
        this.style.opacity = '0';
        this.style.position = 'absolute';
        this.style.pointerEvents = 'none'; 

        closeMenuIcon.style.position = 'relative';
        closeMenuIcon.style.opacity = '1';
        closeMenuIcon.classList.add('rotate'); 
        closeMenuIcon.style.pointerEvents = 'auto';
        responsiveMenu.classList.toggle("active");
    });

    closeMenuIcon.addEventListener('click', function() {

        this.classList.remove('rotate'); 
        openMenuIcon.classList.remove('rotate');
        this.style.opacity = '0'; 
        this.style.pointerEvents = 'none'; 
        openMenuIcon.style.opacity = '1';
        openMenuIcon.style.pointerEvents = 'auto';
        responsiveMenu.classList.remove("active");
    });

    const thresholdWidth = 750;

    function checkScreenSize() {

        if (window.innerWidth > thresholdWidth) {
            closeMenuIcon.classList.remove('rotate'); 
            openMenuIcon.classList.remove('open');
            closeMenuIcon.style.opacity = '0'; // Hide the close icon
            closeMenuIcon.style.pointerEvents = 'none';
            openMenuIcon.style.opacity = '1';
            openMenuIcon.style.pointerEvents = 'auto';
            responsiveMenu.classList.remove("active");
        }
    }

    // Add the event listener for the window resize event
    window.addEventListener('resize', checkScreenSize);

    // Optionally, you can also call checkScreenSize when the page loads to check the initial size
    checkScreenSize();

    document.querySelectorAll('.service-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.service-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    const inputs = document.querySelectorAll(".input-cont input, .input-cont textarea");
    const button = document.getElementById("inquireBtn");

    function checkInputs() {
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {  // Check if input is empty
                allFilled = false;
            }
        });

        button.disabled = !allFilled;  // Enable button if all fields are filled
    }

    inputs.forEach(input => {
        input.addEventListener("input", checkInputs);
    });

    checkInputs();

});