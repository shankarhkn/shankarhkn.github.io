'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            // Check if element is in viewport
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            } else {
                // Optional: remove the class if you want animations to replay when scrolling back up
                // element.classList.remove('animated');
            }
        });
    }
    
    // Run animation check on page load
    window.addEventListener('load', handleScrollAnimations);
    
    // Run animation check on scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Staggered animations for elements with delay classes
    function staggeredAnimations() {
        const parentElements = document.querySelectorAll('.staggered-parent');
        
        parentElements.forEach(parent => {
            const children = parent.querySelectorAll('.staggered-child');
            
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }
    
    // Run staggered animations setup
    staggeredAnimations();
    
    // Parallax effect for background elements
    function parallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.3;
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }
    
    // Initialize parallax effect
    parallaxEffect();
    
    // Counter animation for numbers
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = parseInt(counter.getAttribute('data-duration') || 2000, 10);
            const increment = target / (duration / 16); // 16ms is approximately one frame at 60fps
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let count = 0;
                        
                        const updateCount = () => {
                            count += increment;
                            
                            if (count < target) {
                                counter.textContent = Math.ceil(count);
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.textContent = target; // Ensure the final value is exactly the target
                            }
                        };
                        
                        requestAnimationFrame(updateCount);
                        observer.unobserve(entry.target); // Stop observing once animation starts
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Initialize counter animations
    animateCounters();
    
    // Custom cursor effect (optional enhancement)
    function customCursor() {
        const cursor = document.querySelector('.custom-cursor');
        
        if (!cursor) return;
        
        document.addEventListener('mousemove', e => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .interactive');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }
    
    // Only initialize custom cursor on desktop devices
    if (window.matchMedia('(min-width: 1024px)').matches && !('ontouchstart' in window)) {
        // customCursor(); // Uncomment to enable custom cursor
    }
    
    // Medical-themed animated icons
    function animateMedicalIcons() {
        const iconElements = document.querySelectorAll('.medical-icon');
        
        if (iconElements.length === 0) return;
        
        iconElements.forEach(icon => {
            const animationType = icon.getAttribute('data-animation') || 'pulse';
            icon.classList.add(animationType);
            
            // Add hover pause effect
            icon.addEventListener('mouseenter', () => {
                icon.style.animationPlayState = 'paused';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.animationPlayState = 'running';
            });
        });
    }
    
    // Initialize medical icons animation
    animateMedicalIcons();
    
    // Add floating animation for elements
    function addFloatingEffect() {
        const floatingElements = document.querySelectorAll('.floating');
        
        if (floatingElements.length === 0) return;
        
        floatingElements.forEach((element, index) => {
            // Create unique floating animation for each element
            const delay = index * 0.5;
            const duration = 3 + Math.random() * 2;
            
            element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        });
    }
    
    // Initialize floating animations
    addFloatingEffect();
    
    // Scroll progress indicator
    function scrollProgressBar() {
        const progressBar = document.querySelector('.scroll-progress');
        
        if (!progressBar) return;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.offsetHeight;
            const winHeight = window.innerHeight;
            const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
            
            progressBar.style.width = `${scrollPercent}%`;
        });
    }
    
    // Initialize scroll progress bar
    scrollProgressBar();
    
    // Animate numbers in statistics section
    function animateStatistics() {
        const stats = document.querySelectorAll('.statistic-value');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-value'), 10);
            const suffix = stat.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = Math.ceil(target / 60); // Animate over 60 frames (approximately 1 second at 60fps)
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const interval = setInterval(() => {
                            current += increment;
                            
                            if (current >= target) {
                                stat.textContent = target + suffix;
                                clearInterval(interval);
                            } else {
                                stat.textContent = current + suffix;
                            }
                        }, 16);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        });
    }
    
    // Initialize statistics animation
    animateStatistics();
});
