// Mobile Menu Logic (Animated Hamburger)
const sidemenu = document.getElementById("sidemenu");
const mainNav = document.querySelector("nav");

function toggleMenu() {
    const btn = document.querySelector(".menu-btn");
    const menu = document.getElementById("sidemenu");
    if (menu) menu.classList.toggle("active-menu");
    if (btn) btn.classList.toggle("active");
    if (mainNav) mainNav.classList.toggle("nav-active");
}

function closemenu() {
    const btn = document.querySelector(".menu-btn");
    const menu = document.getElementById("sidemenu");
    if (menu) menu.classList.remove("active-menu");
    if (btn) btn.classList.remove("active");
    if (mainNav) mainNav.classList.remove("nav-active");
}

// Component Injection (Header/Footer)
function injectComponents() {
    // Basic nav structure is now hardcoded for instant load
    const nav = document.querySelector('nav');

    // Only inject footer as it's less critical for initial paint
    const footerHTML = `
        <div class="container">
            <div>
                <h3>Malaika Alvi</h3>
                <p>Clinical Psychologist offering online therapy tailored to your needs. A safe space to think, feel, and heal.</p>
                <div class="footer-social-icons">
                    <a href="https://www.facebook.com/share/1aTFhaepJs/" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/realignedmind_withmalaika/" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/malaika-alvi-72a0913a7" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div>
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Me</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="fees.html">Fees & FAQs</a></li>
                </ul>
            </div>
            <div>
                <h3>Our Services</h3>
                <ul>
                    <li><a href="mental-health.html">Mental Health</a></li>
                    <li><a href="sleep.html">Sleep Support</a></li>
                    <li><a href="adhd.html">Adult ADHD</a></li>
                    <li><a href="approaches.html">Therapeutic Approaches</a></li>
                </ul>
            </div>
            <div>
                <h3>Heal. Grow. Thrive.</h3>
                <p><strong>Disclaimer:</strong> This website is for informational purposes only. In case of emergency, please contact your local emergency services.</p>
                <p style="margin-top:20px;"><i class="fas fa-envelope"></i> realignedmind1@gmail.com</p>
            </div>
        </div>
        <div class="copyright">
            <p>© 2026 Malaika Alvi. Developed by <a href="#" style="color: var(--secondary-blue); text-decoration: none;">Muhammad Daanyal</a>. All rights reserved.</p>
        </div>
    `;

    const footer = document.querySelector('.footer');
    if (footer && !footer.innerHTML.trim()) {
        footer.innerHTML = footerHTML;
    }

    // Set active link and handle dropdowns for hardcoded nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#sidemenu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Re-initialize sidemenu reference for mobile logic
    window.sidemenu = document.getElementById("sidemenu");
}

// Optimized Dropdown & Navigation Logic
document.addEventListener("DOMContentLoaded", function () {
    injectComponents();

    const pageOrder = [
        'index.html',
        'about.html',
        'mental-health.html',
        'adhd.html',
        'sleep.html',
        'approaches.html',
        'fees.html',
        'contact.html'
    ];

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = pageOrder.indexOf(currentPage);
    const headerContent = document.querySelector('.header-content');

    // Apply animation based on stored direction
    if (headerContent) {
        const direction = sessionStorage.getItem('nav_direction') || 'slide-in-right';
        headerContent.classList.add(direction);
    }

    // Capture click direction
    document.querySelectorAll('#sidemenu a, .logo a').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetHref = this.getAttribute('href');
            if (targetHref && targetHref !== '#' && !targetHref.startsWith('http')) {
                const targetIndex = pageOrder.indexOf(targetHref);
                if (targetIndex !== -1 && currentIndex !== -1) {
                    const direction = targetIndex > currentIndex ? 'slide-in-right' : 'slide-in-left';
                    sessionStorage.setItem('nav_direction', direction);
                }
            }
        });
    });

    // Sticky Navigation on Scroll
    const nav = document.querySelector("nav");
    if (nav) {
        window.addEventListener("scroll", function () {
            nav.classList.toggle("sticky", window.scrollY > 50);
        });
    }

    // Dropdown toggles
    document.addEventListener('click', function (e) {
        const toggle = e.target.closest('.dropdown-toggle');
        if (toggle) {
            e.preventDefault();
            const dropdown = toggle.nextElementSibling;
            if (dropdown) {
                dropdown.classList.toggle('active');
            }
            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });
            return;
        }

        // Close dropdowns when clicking outside
        if (!e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        }

        // Close mobile menu when clicking outside
        if (window.sidemenu && window.sidemenu.classList.contains('active-menu') && !e.target.closest('nav')) {
            closemenu();
        }
    });

    // Lazy Loading for Images/Videos
    const lazyMedia = document.querySelectorAll('img, video');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const media = entry.target;
                    if (media.tagName === 'VIDEO' && media.dataset.src) {
                        media.src = media.dataset.src;
                    }
                    observer.unobserve(media);
                }
            });
        });
        lazyMedia.forEach(media => observer.observe(media));
    }
});
