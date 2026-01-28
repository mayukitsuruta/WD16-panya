const menuData = {
  1: {
    image: "images/pan001.png",
    name: "フランスパン・ドーナツ",
    price: "¥300",
    alt: "フランスパン・ドーナツ",
    description: "フランスパンを使用した、もちもちのドーナツです。",
  },
  2: {
    image: "images/pan002.png",
    name: "ショコラ・バゲット",
    price: "¥350",
    alt: "ショコラ・バゲット",
    description:
      "甘さたっぷりショコラ・バゲット。チョコレートの風味が広がります。",
  },
  3: {
    image: "images/pan003.png",
    name: "キャラメル・バゲット",
    price: "¥350",
    alt: "キャラメル・バゲット",
    description: "キャラメルの甘さとバゲットの香ばしさが絶妙にマッチ。",
  },
  4: {
    image: "images/pan004.png",
    name: "アップルパイ",
    price: "¥380",
    alt: "アップルパイ",
    description: "りんごの甘さと香ばしさが詰まったアップルパイです。",
  },
  5: {
    image: "images/pan005.png",
    name: "パン・オ・レザン",
    price: "¥280",
    alt: "パン・オ・レザン",
    description: "レーズンがたっぷり入った甘みのあるパン。おやつにも最適です。",
  },
  6: {
    image: "images/pan006.png",
    name: "食パン",
    price: "¥450",
    alt: "食パン",
    description: "小麦の香りが豊かで、もっちりとした食感が楽しめる食パンです。",
  },
  7: {
    image: "images/pan007.png",
    name: "パン・ド・カンパーニュ",
    price: "¥320",
    alt: "パン・ド・カンパーニュ",
    description:
      "サクサクの食感が楽しめるパン・ド・カンパーニュ。バターの香りが豊かです。",
  },
  8: {
    image: "images/pan008.png",
    name: "クロワッサン",
    price: "¥380",
    alt: "クロワッサン",
    description: "バターと卵の風味が豊かなクロワッサン。朝食にぴったりです。",
  },
};

function generateMenuCards() {
  const allMenuWrapper = document.getElementById("allMenuCards");
  if (!allMenuWrapper) return;

  allMenuWrapper.innerHTML = "";

  delete allMenuWrapper.dataset.infiniteLoopInitialized;

  Object.keys(menuData).forEach((itemId) => {
    const menu = menuData[itemId];
    const card = document.createElement("div");
    card.className = "menu-card";
    card.setAttribute("data-item", itemId);
    card.innerHTML = `
            <div class="menu-card-front">
                <img
                    src="${menu.image}"
                    alt="${menu.alt}"
                    class="menu-card-image"
                />
                <div class="menu-card-info">
                    <button class="favorite-btn" data-item="${itemId}">❤️</button>
                    <p class="menu-name">${menu.name}</p>
                    <p class="menu-price">${menu.price}</p>
                </div>
            </div>
            <div class="menu-card-back">
                <img
                    src="${menu.image}"
                    alt="${menu.alt}"
                    class="menu-card-image"
                />
                <div class="menu-card-info">
                    <button class="favorite-btn" data-item="${itemId}">❤️</button>
                    <p class="menu-name">${menu.name}</p>
                    <p class="menu-description">${menu.description}</p>
                </div>
            </div>
        `;
    allMenuWrapper.appendChild(card);
  });
}

function generateRecommendations() {
  const recommendationItems = document.getElementById("recommendationItems");
  if (!recommendationItems) return;

  const recommendedIds = [5, 2];

  recommendationItems.innerHTML = "";

  recommendedIds.forEach((itemId) => {
    const menu = menuData[itemId];
    if (!menu) return;

    const item = document.createElement("div");
    item.className = "recommendation-item";
    item.innerHTML = `
      <img
        src="${menu.image}"
        alt="${menu.alt}"
        class="rec-image"
      />
      <p class="rec-name">${menu.name}</p>
      <p class="rec-price">${menu.price}</p>
      <p class="rec-description">${menu.description}</p>
    `;
    recommendationItems.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  generateMenuCards();

  generateRecommendations();

  const allMenuWrapper = document.getElementById("allMenuCards");
  const favoriteMenuWrapper = document.getElementById("favoriteMenuCards");

  initFavoriteButtons();

  updateFavoriteMenu();

  initInfiniteLoop(allMenuWrapper);
  initInfiniteLoop(favoriteMenuWrapper);

  initSlider(allMenuWrapper);
  initSlider(favoriteMenuWrapper);

  initMenuNavigation();

  init3DEffect(allMenuWrapper);
  init3DEffect(favoriteMenuWrapper);

  initScrollAnimations();
});

function initSlider(wrapper) {
  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    wrapper.style.cursor = "grabbing";
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener("mouseleave", () => {
    isDown = false;
    wrapper.style.cursor = "grab";
  });

  wrapper.addEventListener("mouseup", () => {
    isDown = false;
    wrapper.style.cursor = "grab";
  });

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2; // スクロール速度を調整
    wrapper.scrollLeft = scrollLeft - walk;
  });

  let touchStartX = 0;
  let touchScrollLeft = 0;

  wrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].pageX - wrapper.offsetLeft;
    touchScrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener("touchmove", (e) => {
    if (!touchStartX) return;
    const x = e.touches[0].pageX - wrapper.offsetLeft;
    const walk = (x - touchStartX) * 2;
    wrapper.scrollLeft = touchScrollLeft - walk;
  });

  wrapper.addEventListener("touchend", () => {
    touchStartX = 0;
  });

  wrapper.addEventListener("wheel", (e) => {
    e.preventDefault();
    wrapper.scrollLeft += e.deltaY;
  });
}

function updateFavoriteMenu() {
  const favoriteMenuWrapper = document.getElementById("favoriteMenuCards");
  if (!favoriteMenuWrapper) return;

  const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
  const favoriteIds = Object.keys(favorites).filter((id) => favorites[id]);

  favoriteMenuWrapper.innerHTML = "";

  favoriteIds.forEach((itemId, index) => {
    const menu = menuData[Number(itemId)] || menuData[itemId];
    if (!menu) return;

    const card = document.createElement("div");
    card.className = "menu-card original-card";
    card.setAttribute("data-item", itemId);
    card.innerHTML = `
            <div class="menu-card-front">
                <img src="${menu.image}" alt="${
                  menu.alt
                }" class="menu-card-image">
                <div class="menu-card-info">
                    <button class="favorite-btn" data-item="${itemId}">❤️</button>
                    <p class="menu-name">${menu.name}</p>
                    <p class="menu-price">${menu.price}</p>
                </div>
            </div>
            <div class="menu-card-back">
                <img src="${menu.image}" alt="${
                  menu.alt
                }" class="menu-card-image">
                <div class="menu-card-info">
                    <button class="favorite-btn" data-item="${itemId}">❤️</button>
                    <p class="menu-name">${menu.name}</p>
                    <p class="menu-description">${menu.description}</p>
                </div>
            </div>
        `;
    favoriteMenuWrapper.appendChild(card);
  });

  setTimeout(() => {
    initFavoriteButtons();

    if (favoriteIds.length > 0) {
      delete favoriteMenuWrapper.dataset.infiniteLoopInitialized;

      favoriteMenuWrapper.scrollLeft = 0;

      initInfiniteLoop(favoriteMenuWrapper);
      initSlider(favoriteMenuWrapper);
      init3DEffect(favoriteMenuWrapper);

      setTimeout(() => {
        update3DEffect(favoriteMenuWrapper);
      }, 200);
    } else {
      favoriteMenuWrapper.innerHTML = "";
      delete favoriteMenuWrapper.dataset.infiniteLoopInitialized;
    }
  }, 100);
}

function initFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");

  favoriteButtons.forEach((button) => {
    const itemId = button.getAttribute("data-item");
    if (favorites[itemId]) {
      button.classList.add("active");
      button.textContent = "❤️";
    } else {
      button.textContent = "🤍";
    }
  });

  favoriteButtons.forEach((button) => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);

    newButton.addEventListener("click", function (e) {
      e.stopPropagation();
      const itemId = this.getAttribute("data-item");
      const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");

      if (favorites[itemId]) {
        // お気に入りから削除
        delete favorites[itemId];
        this.classList.remove("active");
        this.textContent = "🤍";
      } else {
        // お気に入りに追加
        favorites[itemId] = true;
        this.classList.add("active");
        this.textContent = "❤️";
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));

      updateFavoriteMenu();
    });
  });
}

function initInfiniteLoop(wrapper) {
  if (!wrapper) return;

  if (wrapper.dataset.infiniteLoopInitialized === "true") {
    return;
  }

  const existingDuplicates = wrapper.querySelectorAll(".menu-card.duplicate");
  existingDuplicates.forEach((duplicate) => {
    duplicate.remove();
  });

  const originalCards = Array.from(
    wrapper.querySelectorAll(".menu-card:not(.duplicate)"),
  );

  if (originalCards.length === 0) return;

  originalCards.forEach((card) => {
    if (!card.classList.contains("original-card")) {
      card.classList.add("original-card");
    }
  });

  originalCards.forEach((card) => {
    const cloneBefore = card.cloneNode(true);
    const cloneAfter = card.cloneNode(true);
    cloneBefore.classList.add("duplicate");
    cloneAfter.classList.add("duplicate");
    wrapper.insertBefore(cloneBefore, wrapper.firstChild);
    wrapper.appendChild(cloneAfter);
  });

  wrapper.dataset.infiniteLoopInitialized = "true";

  const cardWidth = originalCards[0].offsetWidth + 30;
  const originalSetWidth = cardWidth * originalCards.length;

  const setInitialPosition = () => {
    const currentCardWidth = originalCards[0].offsetWidth + 30;
    const currentOriginalSetWidth = currentCardWidth * originalCards.length;
    const firstCard = wrapper.querySelector(
      '.menu-card.original-card[data-item="1"]',
    );
    if (firstCard) {
      const cardRect = firstCard.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();
      const scrollPosition =
        wrapper.scrollLeft + (cardRect.left - wrapperRect.left);
      wrapper.scrollLeft = scrollPosition;
    } else {
      wrapper.scrollLeft = currentOriginalSetWidth;
    }
  };

  requestAnimationFrame(() => {
    setInitialPosition();
    setTimeout(() => {
      setInitialPosition();
    }, 100);
    setTimeout(() => {
      setInitialPosition();
    }, 300);
  });

  let lastScrollLeft = originalSetWidth;
  let scrollDirection = 0;
  let isNavigating = false;
  let navigationDirection = 0;

  wrapper.addEventListener("navigation-scroll", (e) => {
    navigationDirection = e.detail.direction;
    isNavigating = true;
    setTimeout(() => {
      isNavigating = false;
    }, 500);
  });

  let isAdjusting = false;
  wrapper.addEventListener(
    "scroll",
    () => {
      if (isAdjusting) return;

      const scrollLeft = wrapper.scrollLeft;
      const cardWidth = originalCards[0].offsetWidth + 30;
      const originalSetWidth = cardWidth * originalCards.length;

      if (isNavigating && navigationDirection !== 0) {
        scrollDirection = navigationDirection;
      } else {
        if (scrollLeft > lastScrollLeft) {
          scrollDirection = 1;
        } else if (scrollLeft < lastScrollLeft) {
          scrollDirection = -1;
        }
      }
      lastScrollLeft = scrollLeft;

      if (scrollLeft >= originalSetWidth * 2 - 5) {
        isAdjusting = true;
        const offset = scrollLeft - originalSetWidth * 2;
        if (scrollDirection > 0) {
          wrapper.scrollLeft =
            originalSetWidth + Math.max(0, Math.min(offset, cardWidth - 1));
        } else {
          wrapper.scrollLeft = originalSetWidth + offset;
        }
        setTimeout(() => {
          isAdjusting = false;
          lastScrollLeft = wrapper.scrollLeft;
        }, 10);
      } else if (scrollLeft <= 5) {
        isAdjusting = true;
        const offset = scrollLeft + originalSetWidth;
        if (scrollDirection < 0) {
          wrapper.scrollLeft =
            originalSetWidth * 2 +
            Math.min(0, Math.max(offset, -cardWidth + 1));
        } else {
          wrapper.scrollLeft = originalSetWidth + offset;
        }
        setTimeout(() => {
          isAdjusting = false;
          lastScrollLeft = wrapper.scrollLeft;
        }, 10);
      }
    },
    { passive: true },
  );
}

function initMenuNavigation() {
  const navButtons = document.querySelectorAll(".menu-nav-btn");
  const scrollIntervals = new Map(); // 各ボタンのインターバルを管理

  navButtons.forEach((button) => {
    let intervalId = null;

    button.addEventListener("mousedown", function (e) {
      e.preventDefault();
      startScrolling(this);
    });

    button.addEventListener("touchstart", function (e) {
      e.preventDefault();
      startScrolling(this);
    });

    button.addEventListener("mouseup", function () {
      stopScrolling(this);
    });

    button.addEventListener("mouseleave", function () {
      stopScrolling(this);
    });

    button.addEventListener("touchend", function () {
      stopScrolling(this);
    });

    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-target");
      const wrapper = document.getElementById(targetId);
      const originalCards = wrapper.querySelectorAll(
        ".menu-card.original-card",
      );
      const cardWidth = originalCards[0]
        ? originalCards[0].offsetWidth + 30
        : 310;

      const direction = this.classList.contains("menu-nav-prev") ? -1 : 1;
      wrapper.dispatchEvent(
        new CustomEvent("navigation-scroll", {
          detail: { direction: direction },
        }),
      );

      if (this.classList.contains("menu-nav-prev")) {
        wrapper.scrollBy({
          left: -cardWidth,
          behavior: "smooth",
        });
      } else if (this.classList.contains("menu-nav-next")) {
        wrapper.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      }

      setTimeout(() => {
        update3DEffect(wrapper);
        checkAndAdjustLoop(wrapper, originalCards);
      }, 300);
    });

    function startScrolling(btn) {
      if (intervalId) return;

      const targetId = btn.getAttribute("data-target");
      const wrapper = document.getElementById(targetId);
      const originalCards = wrapper.querySelectorAll(
        ".menu-card.original-card",
      );
      const cardWidth = originalCards[0]
        ? originalCards[0].offsetWidth + 30
        : 310;
      const direction = btn.classList.contains("menu-nav-prev") ? -1 : 1;

      wrapper.dispatchEvent(
        new CustomEvent("navigation-scroll", {
          detail: { direction: direction },
        }),
      );
      wrapper.scrollBy({
        left: cardWidth * direction,
        behavior: "smooth",
      });

      intervalId = setInterval(() => {
        wrapper.dispatchEvent(
          new CustomEvent("navigation-scroll", {
            detail: { direction: direction },
          }),
        );
        wrapper.scrollBy({
          left: cardWidth * direction,
          behavior: "smooth",
        });
        setTimeout(() => {
          update3DEffect(wrapper);
          checkAndAdjustLoop(wrapper, originalCards);
        }, 50);
      }, 300);

      scrollIntervals.set(btn, intervalId);
    }

    function stopScrolling(btn) {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        scrollIntervals.delete(btn);
      }
    }
  });
}

function checkAndAdjustLoop(wrapper, originalCards) {
  if (!wrapper || !originalCards || originalCards.length === 0) return;

  const cardWidth = originalCards[0].offsetWidth + 30;
  const originalSetWidth = cardWidth * originalCards.length;
  const scrollLeft = wrapper.scrollLeft;

  if (scrollLeft >= originalSetWidth * 2 - 10) {
    const offset = scrollLeft - originalSetWidth * 2;
    wrapper.scrollLeft = originalSetWidth + offset;
  } else if (scrollLeft <= 10) {
    const offset = scrollLeft + originalSetWidth;
    wrapper.scrollLeft = originalSetWidth + offset;
  }
}

function init3DEffect(wrapper) {
  if (!wrapper) return;

  update3DEffect(wrapper);

  wrapper.addEventListener(
    "scroll",
    () => {
      update3DEffect(wrapper);
    },
    { passive: true },
  );

  window.addEventListener("resize", () => {
    update3DEffect(wrapper);
  });
}

function update3DEffect(wrapper) {
  if (!wrapper) return;

  const cards = wrapper.querySelectorAll(".menu-card");
  const wrapperRect = wrapper.getBoundingClientRect();
  const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
  const baseWidth = 280;

  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distanceFromCenter = Math.abs(cardCenter - wrapperCenter);

    const offset = cardCenter - wrapperCenter;
    const translateX = offset * 0.1;

    card.classList.remove("active", "side-left", "side-right");

    card.style.width = `${baseWidth}px`;
    card.style.minWidth = `${baseWidth}px`;

    if (distanceFromCenter < 50) {
      card.classList.add("active");
      card.style.zIndex = "10";
    } else {
      if (cardCenter < wrapperCenter) {
        card.classList.add("side-left");
      } else {
        card.classList.add("side-right");
      }
      card.style.zIndex = "1";
    }
  });
}
function initScrollAnimations() {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  const aboutImg = document.querySelector(".about-img");
  const baguetteImg = document.querySelector(".baguette-img");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (aboutImg && !aboutImg.classList.contains("animate")) {
            aboutImg.classList.add("animate");
          }
          if (baguetteImg && !baguetteImg.classList.contains("animate")) {
            baguetteImg.classList.add("animate");
          }
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(aboutSection);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
