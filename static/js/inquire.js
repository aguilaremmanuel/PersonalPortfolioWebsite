function getCSRFToken() {
    let cookieValue = null;
    const name = 'csrftoken';
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.addEventListener("DOMContentLoaded", function () {

    const notyf = new Notyf({
        duration: 3000, // Auto-close after 3 seconds
        position: { x: "right", y: "bottom" }, // 📌 Lower-left position
        dismissible: true, // Allow manual close
        ripple: true, // Add ripple effect
    });
      

    document.querySelectorAll('.service-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.service-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('service').value = this.getAttribute('data-value');
        });
    });

    const inputs = document.querySelectorAll(".input-cont input, .input-cont textarea, #service");
    const button = document.getElementById("inquireBtn");
    const hiddenInput = document.getElementById("service");

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

    const observer = new MutationObserver(checkInputs);
    observer.observe(hiddenInput, { attributes: true, attributeFilter: ["value"] });

    checkInputs();

    inquire_form = document.getElementById('inquireForm');
    emailInput = document.getElementById('emailInput');
    document.getElementById('inquireBtn').addEventListener('click', function(e) {

        e.preventDefault();

        const emailContainer = document.getElementById('emailContainer');
        const warningMessage = document.getElementById('warningMessage');

        if (!emailInput.checkValidity()) {

            emailContainer.classList.add('error');
            warningMessage.style.display = 'block';

        } else {

            button.disabled = true;
            notyf.success("Thank you! Your inquiry has been sent.");
            emailContainer.classList.remove('error');
            warningMessage.style.display = 'none';

            const formData = new FormData(inquire_form);

            fetch(`/send-inquiry/`, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                }
            })
            .then(response => response.json())
            .then(data => {
                inquire_form.reset();
                document.querySelectorAll('.service-btn').forEach(btn => btn.classList.remove('selected'));
                
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }

    });

});