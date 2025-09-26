// Elements
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const skillBars = document.querySelectorAll('.progress');
const contactForm = document.getElementById('contactForm');

// Toggle menu
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 10);
});

// Portfolio filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Animate skill bars on scroll
function animateSkills() {
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        // Reset width first
        bar.style.width = '0';
        
        // Add a small delay before animation starts
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300);
    });
}

// Intersection Observer for skills animation
const aboutSection = document.querySelector('#about');
const observerOptions = {
    threshold: 0.3
};

const skillsObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

if (aboutSection) {
    skillsObserver.observe(aboutSection);
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (name && email && subject && message) {
            // In a real application, you would send this data to a server
            alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.');
            contactForm.reset();
        } else {
            alert('Mohon isi semua field yang diperlukan.');
        }
    });
}

// AOS (Animate On Scroll) - Initialization if AOS is added to project
document.addEventListener('DOMContentLoaded', function() {
    // If you add AOS library later, uncomment this
    // AOS.init({
    //     duration: 1000,
    //     once: true
    // });
    
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
