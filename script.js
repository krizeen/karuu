document.addEventListener('DOMContentLoaded', function() {
    // Initialize Welcome Modal
    const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'), {
        backdrop: 'static',
        keyboard: false
    });
    
    // Show welcome modal on page load
    welcomeModal.show();

    // Handle user form submission
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value;
        const interests = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        // Save user preferences
        localStorage.setItem('userName', userName);
        localStorage.setItem('interests', JSON.stringify(interests));

        // Update UI with user's name
        updateUIWithUserInfo(userName);

        // Close modal
        welcomeModal.hide();

        // Show welcome message
        showWelcomeToast(userName);
    });

    // Initialize Owl Carousel for testimonials
    $('.testimonial-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, #features .text-center');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animation on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Helper function to update UI with user's name
    function updateUIWithUserInfo(name) {
        const welcomeMessage = document.querySelector('.hero-section h1');
        welcomeMessage.textContent = `Welcome ${name}, Let's Transform Your Career!`;
    }

    // Helper function to show welcome toast
    function showWelcomeToast(name) {
        const toastHTML = `
            <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">Welcome to TechLearn Pro!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        Hi ${name}! We're excited to have you here. Start exploring our courses!
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        
        // Auto remove toast after 5 seconds
        setTimeout(() => {
            const toast = document.querySelector('.toast');
            if (toast) {
                toast.remove();
            }
        }, 5000);
    }

    // Course filter functionality
    const courseCards = document.querySelectorAll('.card');
    const savedInterests = JSON.parse(localStorage.getItem('interests') || '[]');
    
    if (savedInterests.length > 0) {
        courseCards.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const isRelevant = savedInterests.some(interest => 
                cardTitle.includes(interest.replace('-', ' '))
            );
            
            if (isRelevant) {
                card.classList.add('border-primary');
                card.querySelector('.card-body').style.backgroundColor = '#f0f7ff';
            }
        });
    }
}); 