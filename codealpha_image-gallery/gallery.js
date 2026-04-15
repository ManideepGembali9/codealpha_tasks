// ── GALLERY.JS ── All interactivity

(function () {
  "use strict";

  // ── STATE ──
  let currentFilter = "all";
  let currentSearch = "";
  let currentIndex = 0;
  let filteredItems = [...galleryData];
  let isListMode = false;

  // ── DOM REFS ──
  const gallery      = document.getElementById("gallery");
  const filters      = document.getElementById("filters");
  const searchInput  = document.getElementById("searchInput");
  const lightbox     = document.getElementById("lightbox");
  const lbBackdrop   = document.getElementById("lbBackdrop");
  const lbImg        = document.getElementById("lbImg");
  const lbLoader     = document.getElementById("lbLoader");
  const lbTitle      = document.getElementById("lbTitle");
  const lbCategory   = document.getElementById("lbCategory");
  const lbDesc       = document.getElementById("lbDesc");
  const lbIndex      = document.getElementById("lbIndex");
  const lbDownload   = document.getElementById("lbDownload");
  const lbClose      = document.getElementById("lbClose");
  const lbPrev       = document.getElementById("lbPrev");
  const lbNext       = document.getElementById("lbNext");
  const noResults    = document.getElementById("noResults");
  const gridViewBtn  = document.getElementById("gridView");
  const listViewBtn  = document.getElementById("listView");
  const totalCount   = document.getElementById("total-count");

  // ── RENDER GALLERY ──
  function renderGallery() {
    gallery.innerHTML = "";

    filteredItems = galleryData.filter(item => {
      const matchFilter = currentFilter === "all" || item.category === currentFilter;
      const matchSearch = item.title.toLowerCase().includes(currentSearch) ||
                          item.category.toLowerCase().includes(currentSearch) ||
                          item.desc.toLowerCase().includes(currentSearch);
      return matchFilter && matchSearch;
    });

    noResults.classList.toggle("hidden", filteredItems.length > 0);

    filteredItems.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "card";
      card.setAttribute("data-id", item.id);
      card.style.animationDelay = `${(idx % 20) * 30}ms`;

      const url     = imgUrl(item.seed, 600, 450);
      const thumbUrl = imgUrl(item.seed, 400, 300);

      card.innerHTML = `
        <div class="card-img-wrap">
          <img src="${thumbUrl}" alt="${item.title}" loading="lazy" />
          <div class="card-overlay">
            <span class="card-overlay-title">${item.title}</span>
          </div>
          <span class="card-badge">${item.category}</span>
          <span class="card-zoom">⊕</span>
        </div>
        <div class="card-footer">
          <span class="card-title">${item.title}</span>
          <span class="card-num">#${String(item.id).padStart(2, "0")}</span>
          ${isListMode ? `<span class="card-badge" style="margin-top:4px;">${item.category}</span>` : ""}
        </div>
      `;

      card.addEventListener("click", () => openLightbox(idx));
      gallery.appendChild(card);
    });
  }

  // ── LIGHTBOX ──
  function openLightbox(idx) {
    currentIndex = idx;
    updateLightbox();
    lightbox.classList.remove("hidden");
    lbBackdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lbBackdrop.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    const item = filteredItems[currentIndex];
    if (!item) return;

    // Show loader
    lbLoader.classList.remove("done");
    lbImg.style.opacity = "0";

    const fullUrl = imgUrl(item.seed, 1200, 900);

    lbImg.onload = () => {
      lbLoader.classList.add("done");
      lbImg.style.opacity = "1";
      lbImg.style.transition = "opacity 0.4s ease";
    };
    lbImg.onerror = () => {
      lbLoader.classList.add("done");
      lbImg.style.opacity = "1";
    };

    lbImg.src = fullUrl;
    lbImg.alt = item.title;
    lbTitle.textContent = item.title;
    lbCategory.textContent = "✦ " + item.category;
    lbDesc.textContent = item.desc;
    lbIndex.textContent = `${currentIndex + 1} / ${filteredItems.length}`;
    lbDownload.href = fullUrl;

    // nav button visibility
    lbPrev.style.opacity = currentIndex === 0 ? "0.3" : "1";
    lbNext.style.opacity = currentIndex === filteredItems.length - 1 ? "0.3" : "1";
  }

  function navigate(dir) {
    const next = currentIndex + dir;
    if (next < 0 || next >= filteredItems.length) return;
    currentIndex = next;
    updateLightbox();
  }

  // ── FILTER BUTTONS ──
  filters.addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderGallery();
  });

  // ── SEARCH ──
  let searchTimer;
  searchInput.addEventListener("input", e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderGallery();
    }, 200);
  });

  // ── VIEW TOGGLE ──
  gridViewBtn.addEventListener("click", () => {
    isListMode = false;
    gallery.classList.remove("list-mode");
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
    renderGallery();
  });

  listViewBtn.addEventListener("click", () => {
    isListMode = true;
    gallery.classList.add("list-mode");
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
    renderGallery();
  });

  // ── LIGHTBOX EVENTS ──
  lbClose.addEventListener("click", closeLightbox);
  lbBackdrop.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", () => navigate(-1));
  lbNext.addEventListener("click", () => navigate(1));

  // ── KEYBOARD NAV ──
  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("hidden")) {
      if (e.key === "ArrowLeft")  navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "Escape")     closeLightbox();
    }
  });

  // ── TOUCH SWIPE for lightbox ──
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  }, { passive: true });

  // ── LAZY LOAD ENHANCEMENT ──
  // Staggered reveal on scroll using IntersectionObserver
  function observeCards() {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".card").forEach(card => {
      observer.observe(card);
    });
  }

  // ── INIT ──
  function init() {
    totalCount.textContent = galleryData.length;
    renderGallery();
    setTimeout(observeCards, 50);
  }

  // Re-observe after re-render
  const origRender = renderGallery;
  window.addEventListener("DOMContentLoaded", init);
  if (document.readyState !== "loading") init();

})();
