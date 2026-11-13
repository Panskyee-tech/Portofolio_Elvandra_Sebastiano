// 1. Toggle Hamburger Menu untuk Mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik di mode mobile
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 2. Dark Mode Toggle Interaktif
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        darkModeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.textContent = '☀️';
    }
});

// 3. Animasi Efek Mengetik (Typing Effect)
const roles = [
    "Junior Web Developer",
    "Network Engineering Student",
    "Database Enthusiast"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 1800; // Jeda setelah selesai mengetik
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}
document.addEventListener('DOMContentLoaded', typeEffect);

// 4. Data Proyek Sesuai Permintaan & Fitur Filter Kategori
const projects = [
    {
        title: "Konfigurasi Jaringan",
        tag: "Jaringan",
        img: "assets/packet-tracer-screenshot.avif",
        desc: "Perancangan topologi jaringan komputer, pengaturan router dan switch, serta implementasi routing statis dan dinamis."
    },
    {
        title: "Pembuatan Proyek AMBALOT",
        tag: "Kreatif Inovativ Kewirausahaan",
        img: "assets/AMBALOT.jpeg",
        desc: "Pengembangan sistem aplikasi kreatif AMBALOT dengan integrasi antarmuka interaktif dan logika pemrograman modern."
    },
    {
        title: "Pengembangan Web Kassir Digital",
        tag: "Database",
        img: "assets/OIP.jpg",
        desc: "Pembuatan aplikasi kasir berbasis web yang dilengkapi manajemen data transaksi dan pengelolaan item terstruktur."
    }
];

const grid = document.getElementById('projectGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderProjects(category = 'all') {
    grid.innerHTML = ''; // Bersihkan grid sebelum render ulang
    
    const filtered = category === 'all' 
        ? projects 
        : projects.filter(p => p.tag === category);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${p.img}" alt="${p.title}" onerror="this.src='https://placehold.co/600x400/1e293b/38bdf8?text=${encodeURIComponent(p.title)}'">
            </div>
            <div class="project-info">
                <span class="project-tag">${p.tag}</span>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Render pertama kali saat halaman dimuat
renderProjects();

// Event listener untuk tombol filter
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.getAttribute('data-filter'));
    });
});

// 5. Handler Form Kontak
function handleForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    alert(`Terima kasih, ${name}! Pesan Anda untuk Elvandra Sebastiano telah terkirim.`);
    document.getElementById('contactForm').reset();
}