document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Custom Cursor Glow Tracking
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Chatbot Toggle
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChat = document.getElementById('close-chat');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    });

    closeChat.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });

    // Simple Chatbot Interaction
    const chatInput = document.querySelector('.chatbot-input input');
    const chatBtn = document.querySelector('.chatbot-input button');
    const chatBody = document.getElementById('chatbot-body');

    function addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.classList.add('message', sender);
        msg.textContent = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    chatBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            chatInput.value = '';
            
            // Simulated Bot Response
            setTimeout(() => {
                const responses = [
                    "I build intelligent systems with Java, Python, and C++.",
                    "Check out my Cricket AI Predictor, Mental Health Simulator, or Customer Churn Dashboard!",
                    "I am passionate about DSA and problem solving.",
                    "You can reach me at kesavanandapilla8@gmail.com",
                    "I'm a B.Tech student at Lovely Professional University."
                ];
                const randomResp = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResp, 'bot');
            }, 1000);
        }
    });

    // Mesh Background Animation
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, points = [];
    const gap = 40;

    function init() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        points = [];
        for (let x = 0; x < width + gap; x += gap) {
            for (let y = 0; y < height + gap; y += gap) {
                points.push({ x, y, originX: x, originY: y, phase: Math.random() * Math.PI * 2 });
            }
        }
    }

    function animate(time) {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(0, 242, 255, 0.08)';
        ctx.fillStyle = 'rgba(0, 242, 255, 0.2)';
        
        const cols = Math.ceil(width / gap) + 1;
        
        points.forEach((p, i) => {
            const shiftX = Math.sin(time * 0.0008 + p.phase) * 12;
            const shiftY = Math.cos(time * 0.0008 + p.phase) * 12;
            p.x = p.originX + shiftX;
            p.y = p.originY + shiftY;
            
            // Draw dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
            ctx.fill();

            // Draw line to right neighbor
            if ((i + 1) % cols !== 0 && i + 1 < points.length) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(points[i+1].x, points[i+1].y);
                ctx.stroke();
            }
            
            // Draw line to bottom neighbor
            if (i + cols < points.length) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(points[i+cols].x, points[i+cols].y);
                ctx.stroke();
            }
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', init);
    init();
    requestAnimationFrame(animate);

    // Typing Animation for Hero
    const heroSubtext = document.querySelector('.hero-subtext');
    if (heroSubtext) {
        const text = heroSubtext.textContent;
        heroSubtext.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                heroSubtext.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    }

    // Navbar Scroll Effect
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 4rem';
            nav.style.background = 'rgba(5, 5, 8, 0.95)';
        } else {
            nav.style.padding = '1.5rem 4rem';
            nav.style.background = 'rgba(5, 5, 8, 0.8)';
        }
    });

    // Portfolio Lightbox / Modal Logic
    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const modalPdf = document.getElementById('modal-pdf');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');

    function openModal(src, caption, type = 'image') {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling
        
        if (type === 'pdf') {
            modalImg.style.display = "none";
            modalPdf.style.display = "block";
            modalPdf.src = src;
        } else {
            modalPdf.style.display = "none";
            modalImg.style.display = "block";
            modalImg.src = src;
        }
        modalCaption.textContent = caption;
    }

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        modalImg.src = "";
        modalPdf.src = "";
    }

    // Capture clicks on Certification images and View Details buttons
    document.querySelectorAll('.cert-card .cert-thumb, .cert-card .btn-details, .achieve-thumb').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const src = el.tagName === 'IMG' ? el.src : el.getAttribute('href');
            const caption = el.closest('.cert-card, .glass.has-image')?.querySelector('.cert-title, span')?.textContent || "Portfolio Asset";
            const isPdf = src.toLowerCase().endsWith('.pdf');
            
            openModal(src, caption, isPdf ? 'pdf' : 'image');
        });
    });

    // Close modal on close button click OR clicking outside the content
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeModal();
    });
});
