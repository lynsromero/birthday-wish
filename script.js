(function () {
  'use strict';

  // ============================================================
  // CONFIG — Add your photos here! Name them as you like.
  // Example: 'images/photo-1.jpg', 'images/us-at-beach.jpg', etc.
  // ============================================================
  var PHOTOS = [
    'images/photo-1.webp',
    'images/photo-2.webp',
    'images/photo-3.webp',
    'images/photo-4.webp',
    'images/photo-5.webp',
    'images/photo-6.webp',
  ];

  // ============================================================
  // DOM REFERENCES
  // ============================================================
  var loadingScreen = document.getElementById('loading-screen');
  var mainScreen = document.getElementById('main-screen');
  var gallery = document.getElementById('gallery');
  var quoteContainer = document.getElementById('quote-container');
  var btnYes = document.getElementById('btn-yes');
  var btnNo = document.getElementById('btn-no');

  // ============================================================
  // LOADING TIMER (3 seconds)
  // ============================================================
  var petalOverlay = document.getElementById('petal-overlay');

  function showMainScreen() {
    loadingScreen.classList.add('fade-out');
    setTimeout(function () {
      loadingScreen.style.display = 'none';
      mainScreen.classList.remove('hidden');
      mainScreen.style.display = 'flex';
      petalOverlay.classList.add('visible');
    }, 800);
  }

  setTimeout(showMainScreen, 3000);

  // Preload gallery images now so they're cached when Yes is clicked
  for (var p = 0; p < PHOTOS.length; p++) {
    var img = new Image();
    img.src = PHOTOS[p];
  }

  // ============================================================
  // NO BUTTON — Dodge logic
  // ============================================================
  var corners = [
    { top: '16px', left: '16px', bottom: 'auto', right: 'auto' },
    { top: '16px', right: '16px', bottom: 'auto', left: 'auto' },
    { bottom: '16px', left: '16px', top: 'auto', right: 'auto' },
    { bottom: '16px', right: '16px', top: 'auto', left: 'auto' },
  ];
  var lastCorner = -1;

  function moveNoButton() {
    var idx;
    do {
      idx = Math.floor(Math.random() * corners.length);
    } while (idx === lastCorner);
    lastCorner = idx;

    var corner = corners[idx];
    btnNo.style.position = 'fixed';
    btnNo.style.top = corner.top || 'auto';
    btnNo.style.bottom = corner.bottom || 'auto';
    btnNo.style.left = corner.left || 'auto';
    btnNo.style.right = corner.right || 'auto';
    btnNo.style.zIndex = '999';
    btnNo.style.transform = 'scale(0.85)';
    setTimeout(function () {
      btnNo.style.transform = 'scale(1)';
    }, 150);
  }

  btnNo.addEventListener('click', function (e) {
    e.preventDefault();
    moveNoButton();
  });

  btnNo.addEventListener('mouseenter', function () {
    if (window.innerWidth > 768) {
      moveNoButton();
    }
  });

  btnNo.addEventListener('touchstart', function (e) {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });

  // ============================================================
  // YES BUTTON — Transition to gallery
  // ============================================================
  btnYes.addEventListener('click', function () {
    quoteContainer.classList.add('slide-up');
    var buttons = document.querySelector('.buttons');
    if (buttons) {
      buttons.style.transition = 'opacity 0.5s ease';
      buttons.style.opacity = '0';
    }
    setTimeout(function () {
      mainScreen.style.display = 'none';
      mainScreen.classList.add('hidden');
      gallery.classList.remove('hidden');
      gallery.style.display = 'flex';
      startSlideshow();
    }, 900);
  });

  // ============================================================
  // SLIDESHOW — Slide-in/out animation loop
  // ============================================================
  var leftImgs = document.querySelectorAll('.slide.left .slide-img');
  var rightImgs = document.querySelectorAll('.slide.right .slide-img');
  var slideshowTimer = null;
  var nextPhotoIdx = 0;
  var leftActive = 0;
  var rightActive = 0;
  var transDuration = 500;

  function snapImg(el, className) {
    el.classList.add('notrans');
    el.className = 'slide-img ' + className;
    void el.offsetHeight;
    el.classList.remove('notrans');
  }

  function transitionSlides() {
    var N = PHOTOS.length;
    var leftNext = nextPhotoIdx % N;
    var rightNext = (nextPhotoIdx + 1) % N;

    // --- LEFT slide ---
    var leftCur = leftImgs[leftActive];
    var leftWait = leftImgs[1 - leftActive];

    leftWait.src = PHOTOS[leftNext];
    snapImg(leftWait, 'pos-enter');
    leftCur.className = 'slide-img pos-exit';
    leftWait.className = 'slide-img pos-active';

    // --- RIGHT slide ---
    var rightCur = rightImgs[rightActive];
    var rightWait = rightImgs[1 - rightActive];

    rightWait.src = PHOTOS[rightNext];
    snapImg(rightWait, 'pos-enter');
    rightCur.className = 'slide-img pos-exit';
    rightWait.className = 'slide-img pos-active';

    // --- After animation ---
    setTimeout(function () {
      var nextLeft = (nextPhotoIdx + 2) % N;
      var nextRight = (nextPhotoIdx + 3) % N;

      snapImg(leftCur, 'pos-enter');
      leftCur.src = PHOTOS[nextLeft];

      snapImg(rightCur, 'pos-enter');
      rightCur.src = PHOTOS[nextRight];

      leftActive = 1 - leftActive;
      rightActive = 1 - rightActive;
      nextPhotoIdx = (nextPhotoIdx + 2) % N;
    }, transDuration);
  }

  function startSlideshow() {
    if (slideshowTimer) {
      clearInterval(slideshowTimer);
    }
    if (!PHOTOS || PHOTOS.length < 2) return;

    var N = PHOTOS.length;

    snapImg(leftImgs[0], 'pos-active');
    leftImgs[0].src = PHOTOS[0];
    snapImg(leftImgs[1], 'pos-enter');
    leftImgs[1].src = PHOTOS[2 % N];

    snapImg(rightImgs[0], 'pos-active');
    rightImgs[0].src = PHOTOS[1];
    snapImg(rightImgs[1], 'pos-enter');
    rightImgs[1].src = PHOTOS[3 % N];

    nextPhotoIdx = 2;
    leftActive = 0;
    rightActive = 0;

    slideshowTimer = setInterval(transitionSlides, 2000);
  }

})();
