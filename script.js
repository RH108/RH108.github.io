document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(r => {
            const windowHeight = window.innerHeight;
            const elementTop = r.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                r.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    
    reveal();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

function toggleGallery(galleryId) {
    const gallery = document.getElementById(galleryId);
    const icon = document.getElementById(galleryId + '-icon');
    
    if (gallery.style.maxHeight === '0px' || gallery.style.maxHeight === '') {
        gallery.style.maxHeight = gallery.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
    } else {
        gallery.style.maxHeight = "0px";
        icon.style.transform = "rotate(0deg)";
    }
}

function openLightbox(element) {
    const modal = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const desc = document.getElementById('lightbox-desc');

    const imgSrc = element.querySelector('img').src;
    const imgTitle = element.getAttribute('data-title');
    const imgDesc = element.getAttribute('data-desc');

    img.src = imgSrc;
    title.innerText = imgTitle;
    desc.innerHTML = imgDesc;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    if (window.lucide) lucide.createIcons();
}

function closeLightbox() {
    const modal = document.getElementById('lightbox');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});