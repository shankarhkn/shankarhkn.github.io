'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('.section');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.getElementById('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Typing effect
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const phrases = ['a Sophomore', 'a Student Researcher', 'an Aspiring Doctor', 'a Quizbowler', 'an Inventor'];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function typeEffect() {
            const phrase = phrases[currentPhrase];
            
            if (isDeleting) {
                // Deleting characters
                typedTextElement.textContent = phrase.substring(0, currentChar - 1);
                currentChar--;
                typeSpeed = 50;
            } else {
                // Typing characters
                typedTextElement.textContent = phrase.substring(0, currentChar + 1);
                currentChar++;
                typeSpeed = 100;
            }
            
            // Handle phrase completion
            if (!isDeleting && currentChar === phrase.length) {
                // Pause at the end of phrase
                isDeleting = true;
                typeSpeed = 1000;
            } else if (isDeleting && currentChar === 0) {
                // Move to next phrase
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeEffect, 1000);
    }
    
    // Initialize skill bars
    const skillLevels = document.querySelectorAll('.skill-level');
    if (skillLevels.length > 0) {
        skillLevels.forEach(skill => {
            const level = skill.getAttribute('data-level');
            skill.style.width = level;
        });
    }
    
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.elements.name.value,
                email: this.elements.email.value,
                subject: this.elements.subject.value,
                message: this.elements.message.value
            };
            
            // Validate form data
            if (validateForm(formData)) {
                // In a real application, you would send this data to a server
                // For now, we'll just log it and show a success message
                console.log('Form submission:', formData);
                
                // Show success message
                alert('Your message has been sent! Thank you for reaching out.');
                
                // Reset form
                contactForm.reset();
            }
        });
    }
    
    // Form validation
    function validateForm(data) {
        let isValid = true;
        let errorMessage = '';
        
        if (!data.name.trim()) {
            errorMessage += 'Please enter your name.\n';
            isValid = false;
        }
        
        if (!data.email.trim()) {
            errorMessage += 'Please enter your email.\n';
            isValid = false;
        } else if (!isValidEmail(data.email)) {
            errorMessage += 'Please enter a valid email address.\n';
            isValid = false;
        }
        
        if (!data.subject.trim()) {
            errorMessage += 'Please enter a subject.\n';
            isValid = false;
        }
        
        if (!data.message.trim()) {
            errorMessage += 'Please enter your message.\n';
            isValid = false;
        }
        
        if (!isValid) {
            alert(errorMessage);
        }
        
        return isValid;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
