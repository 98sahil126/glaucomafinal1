// Complete GSAP Navbar Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize variables
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    const body = document.body;

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu functionality
    if (hamburger && navMenu) {
        
        // Toggle menu function
        function toggleMenu() {
            const isActive = hamburger.classList.contains('active');
            
            if (!isActive) {
                // Open menu
                hamburger.classList.add('active');
                navMenu.classList.add('active');
                body.style.overflow = 'hidden';
                
                // GSAP animations for opening
                gsap.set(navMenu, { display: 'flex' });
                gsap.fromTo(navMenu, 
                    { x: '100%' }, 
                    { 
                        x: '0%', 
                        duration: 0.4, 
                        ease: 'power2.out' 
                    }
                );
                
                gsap.fromTo('.nav-menu li', 
                    { 
                        opacity: 0, 
                        y: 30 
                    }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.5, 
                        stagger: 0.1, 
                        delay: 0.3,
                        ease: 'power2.out'
                    }
                );
            } else {
                // Close menu
                closeMenu();
            }
        }
        
        // Close menu function
        function closeMenu() {
            hamburger.classList.remove('active');
            body.style.overflow = 'auto';
            
            // GSAP animations for closing
            gsap.to('.nav-menu li', { 
                opacity: 0, 
                y: -30, 
                duration: 0.3, 
                stagger: 0.05,
                ease: 'power2.in'
            });
            
            gsap.to(navMenu, { 
                x: '100%', 
                duration: 0.4, 
                ease: 'power2.in',
                delay: 0.2,
                onComplete: () => {
                    navMenu.classList.remove('active');
                    gsap.set(navMenu, { display: 'none' });
                }
            });
        }

        // Hamburger click event
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking on navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'auto';
                
                // Reset GSAP properties for desktop
                gsap.set(navMenu, { 
                    x: '0%', 
                    display: 'flex' 
                });
                gsap.set('.nav-menu li', { 
                    opacity: 1, 
                    y: 0 
                });
            } else {
                // Reset for mobile
                if (!hamburger.classList.contains('active')) {
                    gsap.set(navMenu, { 
                        x: '100%', 
                        display: 'none' 
                    });
                    gsap.set('.nav-menu li', { 
                        opacity: 0, 
                        y: 30 
                    });
                }
            }
        });

        // Initialize mobile state
        if (window.innerWidth <= 768) {
            gsap.set(navMenu, { 
                x: '100%', 
                display: 'none' 
            });
            gsap.set('.nav-menu li', { 
                opacity: 0, 
                y: 30 
            });
        }
    }

    // Enhanced smooth scrolling with GSAP
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                if (window.innerWidth <= 768 && hamburger && navMenu.classList.contains('active')) {
                    closeMenu();
                    // Wait for menu to close before scrolling
                    setTimeout(() => {
                        gsap.to(window, {
                            duration: 2,
                            scrollTo: {
                                y: target,
                                offsetY: 80 // Navbar height offset
                            },
                            ease: 'power3.inOut'
                        });
                    });
                } else {
                    // Immediate scroll for desktop
                    gsap.to(window, {
                        duration: 2,
                        scrollTo: {
                            y: target,
                            offsetY: 80 // Navbar height offset
                        },
                        ease: 'power3.inut'
                    });
                }
            }
        });
    });

    // Optional: GSAP navbar entrance animations
    // Remove these if you don't want entrance animations
    gsap.fromTo('.nav-brand img', 
    { opacity: 0, y: -50 },   // start 50px above
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
);
    
    // Only animate desktop menu items on load
    if (window.innerWidth > 768) {
        gsap.fromTo('.nav-menu li', 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.4 }
        );
    }

    // Prevent menu from showing during page load on mobile
    if (window.innerWidth <= 768) {
        gsap.set('.nav-menu li', { opacity: 0 });
    }

    // Add any additional GSAP animations for your website here
    // Example sections animations:
    /*
    // Hero section animation
    gsap.fromTo('.hero-title', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.8 }
    );
    
    // Scroll-triggered animations
    ScrollTrigger.batch('.fade-in', {
        onEnter: elements => {
            gsap.fromTo(elements, 
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out' }
            );
        },
        start: 'top 80%',
        once: true
    });
    */
});
















    // Hero Section Animations
   
    gsap.set('.hero-buttons .btn', { opacity: 1, visibility: 'visible' });
    
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero-title', {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
   
        .from('.hero-buttons', {
        duration: 1,           
        y: 50,                   
        opacity: 0,                          
        ease: 'power3.out'       
        }, '-=0.3')


        .from('.hero-visual', {
            duration: 3,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=2')
        .from('.hero-accent', {
            duration: 1,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, '-=0.5');










    // Section reveal animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.from(subtitle, {
            scrollTrigger: {
                trigger: subtitle,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.2
        });
    });





    // About section animations


    // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Section header animation
        gsap.from('.section-header', {
            scrollTrigger: {
                trigger: '.section-header',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: -30,
            opacity: 0,
            ease: 'power3.out'
        });

        // About intro animation
        gsap.from('.about-intro', {
            scrollTrigger: {
                trigger: '.about-intro',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            x: -50,
            opacity: 0,
            ease: 'power3.out'
        });

        // Stats card animation
        gsap.from('.stats-card', {
            scrollTrigger: {
                trigger: '.stats-card',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            x: 50,
            opacity: 0,
            ease: 'power3.out'
        });

     

   
     

        // Stats counter animation
        gsap.fromTo('.stat', 
            { textContent: '0+' },
            {
                scrollTrigger: {
                    trigger: '.stats-card',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                duration: 2,
                textContent: '30 &#43;',
                ease: 'power2.out',
                snap: { textContent: 1 }
            }
        );

        // Floating animation for stats card
        gsap.to('.stats-card', {
            y: -5,
            duration: 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1
        });






// Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations when page loads
        window.addEventListener('load', () => {
            // Content cards animation
            gsap.to('.glaucoma-clinic-content-card', {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.glaucoma-clinic-content-grid',
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Card header bars animation
            gsap.to('.glaucoma-clinic-content-card::before', {
                x: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.glaucoma-clinic-content-grid',
                    start: 'top 60%',
                    end: 'bottom 40%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate list items
            gsap.to('.glaucoma-clinic-tech-item, .glaucoma-clinic-service-item', {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.glaucoma-clinic-content-grid',
                    start: 'top 50%',
                    end: 'bottom 50%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Floating elements parallax effect
            gsap.to('.glaucoma-clinic-floating-circle', {
                y: -50,
                rotation: 360,
                duration: 2,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.glaucoma-clinic-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });

            // Card hover enhancement
            document.querySelectorAll('.glaucoma-clinic-content-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.02,
                        y: -10,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        });









    // machine seciton

 // Optional: Add pause on hover functionality
        const sliderElement = document.querySelector('.slider-wrapper');
        const slidingTrack = document.querySelector('.sliding-container');

        sliderElement.addEventListener('mouseenter', () => {
            slidingTrack.style.animationPlayState = 'paused';
        });

        sliderElement.addEventListener('mouseleave', () => {
            slidingTrack.style.animationPlayState = 'running';
        });

      















    // Doctor section animations
    gsap.from('.doctor-image', {
        scrollTrigger: {
            trigger: '.doctor-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.doctor-info', {
        scrollTrigger: {
            trigger: '.doctor-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        x: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });








    // Vision, Mission, Values cards animation
 // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Vision, Mission, Values cards animation
        gsap.set('.vmv-card', { opacity: 0, y: 50 });
        
        gsap.to('.vmv-card', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.vmv-grid',
                start: 'top 70%',
                end: 'bottom 30%',
                toggleActions: 'play none none reverse'
            }
        });




    // CTA section animation









    // Contact section animations
   // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Contact section animations
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            x: -50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.2,
            x: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.3
        });

        // Form elements individual animation
        gsap.from('.form-group', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.5
        });

        // Icon box hover animations
        gsap.set('.icon-box', {
            scale: 1
        });

        document.querySelectorAll('.contact-item').forEach(item => {
            const iconBox = item.querySelector('.icon-box');
            
            item.addEventListener('mouseenter', () => {
                gsap.to(iconBox, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(iconBox, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
   












    
    // Footer animation

     // GSAP ScrollTrigger registration
        gsap.registerPlugin(ScrollTrigger);

        // Footer animation (keeping your original animation)
        gsap.from('.footer-section', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Additional subtle animation for footer bottom
        gsap.from('.footer-bottom', {
            scrollTrigger: {
                trigger: '.footer-bottom',
                start: 'top 95%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            y: 30,
            opacity: 0,
            delay: 0.4,
            ease: 'power2.out'
        });


    // gsap.from('.footer-section', {
    //     scrollTrigger: {
    //         trigger: '.footer',
    //         start: 'top 90%',
    //         end: 'bottom 20%',
    //         toggleActions: 'play none none reverse'
    //     },
    //     duration: 0.8,
    //     y: 50,
    //     opacity: 0,
    //     stagger: 0.2,
    //     ease: 'power3.out'
    // });




    // Parallax effect for hero background
    gsap.to('.hero', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        yPercent: -50,
        ease: 'none'
    });

    // Button hover animations
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Card hover animations
    document.querySelectorAll('.feature, .vmv-card, .about-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                ease: 'power2.out'
            });
        });
    });






    // Form submission handling

    const contactForm = document.querySelector('.contact-form form'); if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Animate button on submission
            const submitButton = this.querySelector('button[type="submit"]'); const originalText = submitButton.textContent; gsap.to(submitButton, {
                duration: 0.3, scale: 0.95, ease: 'power2.out', onComplete: function () {
                    submitButton.textContent = 'Sending...'; submitButton.disabled = true;
                    // Simulate form submission
                    setTimeout(() => { submitButton.textContent = 'Message Sent!'; submitButton.style.background = '#27AE60'; setTimeout(() => { submitButton.textContent = originalText; submitButton.disabled = false; submitButton.style.background = ''; contactForm.reset(); }, 2000); }, 1500);
                }
            });
        });
    }
    // Initialize ScrollTrigger refresh
    ScrollTrigger.refresh();








// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth page loading
window.addEventListener('load', function() {
    // Page is fully loaded, refresh ScrollTrigger
    ScrollTrigger.refresh();
});