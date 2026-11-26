const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-758797-wallpaper.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/1-Rome-Temple-2160936.jpg"
    }
];

function getDedicatedYear(dedicatedStr) {
    const year = parseInt(String(dedicatedStr).split(",")[0].trim(), 10);
    return Number.isNaN(year) ? 0 : year;
}

function getDimensionsFromUrl(url) {
    return url.includes("/400x225/")
        ? { width: 400, height: 225 }
        : { width: 400, height: 250 };
}

function createTempleCard(temple, index) {
    const card = document.createElement("article");
    card.className = "temple-card";

    const title = document.createElement("h3");
    title.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

    const area = document.createElement("p");
    area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

    const { width, height } = getDimensionsFromUrl(temple.imageUrl);
    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.width = width;
    img.height = height;
    img.decoding = "async";
    if (index === 0) {
        img.loading = "eager";
        img.fetchPriority = "high";
    } else {
        img.loading = "lazy";
    }

    card.append(title, location, dedicated, area, img);
    return card;
}

function displayTemples(list) {
    const grid = document.querySelector(".grid-container");
    if (!grid) return;

    const fragment = document.createDocumentFragment();
    list.forEach((temple, index) => {
        fragment.appendChild(createTempleCard(temple, index));
    });
    grid.replaceChildren(fragment);
}

function setActiveNav(clickedLink, headingText) {
    document.querySelectorAll(".navigation a").forEach((link) => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
    });

    clickedLink.classList.add("active");
    clickedLink.setAttribute("aria-current", "page");

    const heading = document.querySelector("#page-title") || document.querySelector("main h2");
    if (heading) {
        heading.textContent = headingText;
    }
}

function setFooterInfo() {
    const yearSpan = document.querySelector("#currentyear");
    const modifiedSpan = document.querySelector("#last-modified");

    if (yearSpan) {
        yearSpan.textContent = String(new Date().getFullYear());
    }

    if (modifiedSpan) {
        modifiedSpan.textContent = document.lastModified;
    }
}

function initPage() {
    setFooterInfo();
    displayTemples(temples);

    const menuButton = document.querySelector("#menu");
    const navTarget = document.querySelector("header nav") || document.querySelector(".navigation");

    function closeMenu() {
        if (navTarget) navTarget.classList.remove("open");
        if (menuButton) {
            menuButton.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    }

    if (menuButton && navTarget) {
        menuButton.addEventListener("click", () => {
            const isOpen = navTarget.classList.toggle("open");
            menuButton.classList.toggle("open", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });
    }

    const filterConfig = [
        { selector: "#filter-home", label: "Home", filterFn: () => true },
        { selector: "#filter-old", label: "Old", filterFn: (t) => getDedicatedYear(t.dedicated) < 1900 },
        { selector: "#filter-new", label: "New", filterFn: (t) => getDedicatedYear(t.dedicated) > 2000 },
        { selector: "#filter-large", label: "Large", filterFn: (t) => t.area > 90000 },
        { selector: "#filter-small", label: "Small", filterFn: (t) => t.area < 10000 }
    ];

    filterConfig.forEach(({ selector, label, filterFn }) => {
        const el = document.querySelector(selector);
        if (!el) return;

        el.addEventListener("click", (e) => {
            e.preventDefault();
            setActiveNav(el, label);
            displayTemples(temples.filter(filterFn));
            closeMenu();
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
} else {
    initPage();
}