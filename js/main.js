
/* Raviraj Dhadhal Portfolio
   Editable content + responsive interactions + GSAP animations
*/

(() => {
  'use strict';

  // ==========================================
  // 1. EDITABLE PORTFOLIO CONFIGURATION
  // ==========================================

  const CONFIG = {
    collaborationRoles: {
      taranovas: '[Add your exact role]',
      sadguru: '[Add your exact role]',
      vrajlila: '[Add your exact role]',
      murlidhar: '[Add your exact role]'
    },

    films: [
      {
        title: '[Project title]',
        description: '[Short description]',
        year: '[Year]',
        credits: '[Your credits]',
        poster: 'assets/films/film-01.jpg',
        link: ''
      },
      {
        title: '[Project title]',
        description: '[Short description]',
        year: '[Year]',
        credits: '[Your credits]',
        poster: 'assets/films/film-02.jpg',
        link: ''
      },
      {
        title: '[Project title]',
        description: '[Short description]',
        year: '[Year]',
        credits: '[Your credits]',
        poster: 'assets/films/film-03.jpg',
        link: ''
      }
    ],

    evidence: {
      instagramScreenshot:
        'assets/screenshots/vxr-instagram.jpg',

      facebookUrl:
        'https://www.facebook.com/share/r/18tem4nmk3/?mibextid=wwXIfr'
    }
  };

  window.PORTFOLIO_CONTENT = CONFIG;


  // ==========================================
  // 2. INITIAL PAGE SETUP
  // ==========================================

  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // ==========================================
  // 3. PROFILE PHOTO FALLBACK
  // ==========================================

  const portrait = document.querySelector(
    '.portrait-frame img'
  );

  if (portrait) {
    const placeholder =
      portrait.parentElement.querySelector(
        '.portrait-placeholder'
      );

    const showPortraitFallback = () => {
      portrait.style.display = 'none';

      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    };

    const showPortrait = () => {
      portrait.style.display = 'block';

      if (placeholder) {
        placeholder.style.display = 'none';
      }
    };

    portrait.addEventListener(
      'error',
      showPortraitFallback,
      { once: true }
    );

    portrait.addEventListener(
      'load',
      showPortrait
    );

    if (
      portrait.complete &&
      portrait.naturalWidth > 0
    ) {
      showPortrait();
    } else if (
      portrait.complete &&
      portrait.naturalWidth === 0
    ) {
      showPortraitFallback();
    }
  }


  // ==========================================
  // 4. COLLABORATION ROLE CONTENT
  // ==========================================

  document.querySelectorAll('[data-project]')
    .forEach(card => {
      const projectName = card.dataset.project;

      const role =
        CONFIG.collaborationRoles[projectName];

      const output =
        card.querySelector('.role-edit span');

      if (
        output &&
        role &&
        !role.startsWith('[Add')
      ) {
        output.textContent = role;
      }
    });


  // ==========================================
  // 5. MOBILE NAVIGATION
  // ==========================================

  const menuToggle =
    document.querySelector('.menu-toggle');

  const nav =
    document.querySelector('.primary-nav');

  const closeMenu = () => {
    if (!menuToggle || !nav) return;

    menuToggle.setAttribute(
      'aria-expanded',
      'false'
    );

    menuToggle.setAttribute(
      'aria-label',
      'Open navigation'
    );

    nav.classList.remove('open');

    document.body.classList.remove(
      'menu-open'
    );
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen =
        menuToggle.getAttribute(
          'aria-expanded'
        ) === 'true';

      menuToggle.setAttribute(
        'aria-expanded',
        String(!isOpen)
      );

      menuToggle.setAttribute(
        'aria-label',
        isOpen
          ? 'Open navigation'
          : 'Close navigation'
      );

      nav.classList.toggle(
        'open',
        !isOpen
      );

      document.body.classList.toggle(
        'menu-open',
        !isOpen
      );
    });

    nav.querySelectorAll('a')
      .forEach(link => {
        link.addEventListener(
          'click',
          closeMenu
        );
      });

    document.addEventListener(
      'keydown',
      event => {
        if (event.key === 'Escape') {
          closeMenu();
        }
      }
    );
  }


  // ==========================================
  // 6. HEADER SCROLL EFFECT
  // ==========================================

  const header =
    document.querySelector('.site-header');

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle(
      'scrolled',
      window.scrollY > 20
    );
  };

  updateHeader();

  window.addEventListener(
    'scroll',
    updateHeader,
    { passive: true }
  );


  // ==========================================
  // 7. INSTAGRAM EMBEDS
  // ==========================================

  /*
    Instagram embeds are now placed directly
    in index.html using Instagram's official
    embed markup.

    The official Instagram embed script is
    included once in index.html.

    Do not add another Instagram loader here.
  */


  // ==========================================
  // 8. VXR INSTAGRAM EVIDENCE IMAGE
  // ==========================================

  const evidenceBox =
    document.querySelector(
      '.evidence-placeholder'
    );

  if (
    evidenceBox &&
    CONFIG.evidence.instagramScreenshot
  ) {
    const image = new Image();

    image.src =
      CONFIG.evidence.instagramScreenshot;

    image.alt =
      'VXR Studio September Instagram campaign reach evidence';

    image.loading = 'lazy';

    image.className =
      'evidence-image';

    image.onload = () => {
      const heading =
        evidenceBox.querySelector('strong');

      const small =
        evidenceBox.querySelector('small');

      if (heading) {
        heading.textContent =
          'Instagram campaign insights';
      }

      if (small) {
        small.remove();
      }

      evidenceBox.insertBefore(
        image,
        heading || evidenceBox.firstChild
      );

      evidenceBox.classList.add(
        'has-evidence'
      );
    };

    image.onerror = () => {
      // Keep the existing evidence placeholder
      // if the screenshot file is unavailable.
    };
  }


  // ==========================================
  // 9. GSAP ANIMATION SYSTEM
  // ==========================================

  const reduceMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  const gsapAvailable =
    window.gsap &&
    window.ScrollTrigger;

  // ------------------------------------------
  // FALLBACK: KEEP EVERYTHING VISIBLE
  // ------------------------------------------

  const showPageWithoutAnimations = () => {
    document.documentElement.classList.remove(
      'js-ready'
    );

    document.querySelectorAll(
      '.reveal, .hero-title span'
    ).forEach(element => {
      element.style.opacity = '1';
      element.style.visibility = 'visible';
      element.style.transform = 'none';
    });

    const visual =
      document.querySelector('.hero-visual');

    if (visual) {
      visual.style.clipPath = 'none';
      visual.style.opacity = '1';
      visual.style.visibility = 'visible';
    }

    const portraitImage =
      document.querySelector(
        '.portrait-frame img'
      );

    if (
      portraitImage &&
      portraitImage.naturalWidth > 0
    ) {
      portraitImage.style.opacity = '1';
      portraitImage.style.visibility = 'visible';
      portraitImage.style.transform = 'none';
    }

    document.querySelectorAll(
      '.experience-row, .service, .film-tile, .social-profile'
    ).forEach(element => {
      element.style.opacity = '1';
      element.style.visibility = 'visible';
      element.style.transform = 'none';
    });
  };


  // If GSAP is missing or the visitor prefers
  // reduced motion, do not hide content.
  if (
    !gsapAvailable ||
    reduceMotion
  ) {
    showPageWithoutAnimations();
    return;
  }


  // ==========================================
  // 10. GSAP INITIALIZATION
  // ==========================================

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  // Only add js-ready when GSAP is available.
  // CSS can now hide elements for animation.
  document.documentElement.classList.add(
    'js-ready'
  );


  // ==========================================
  // 11. HERO ANIMATION
  // ==========================================

  const heroTitleSpans =
    document.querySelectorAll(
      '.hero-title span'
    );

  const heroVisual =
    document.querySelector('.hero-visual');

  const heroRevealElements =
    document.querySelectorAll(
      '.hero .reveal'
    );

  // Set initial hero title state.
  gsap.set(
    heroTitleSpans,
    {
      y: 45,
      opacity: 0
    }
  );

  // Set initial hero image state.
  if (heroVisual) {
    gsap.set(
      heroVisual,
      {
        clipPath:
          'inset(0 0 100% 0)',
        opacity: 1,
        visibility: 'visible'
      }
    );
  }

  const intro =
    gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    });

  intro
    .to(
      heroTitleSpans,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12
      }
    )

    .to(
      heroVisual,
      {
        clipPath:
          'inset(0 0 0% 0)',
        duration: 1.1
      },
      '-=0.45'
    )

    // IMPORTANT:
    // Explicitly animate to opacity 1.
    .fromTo(
      heroRevealElements,

      {
        y: 24,
        opacity: 0
      },

      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out'
      },

      '-=0.55'
    );


  // ==========================================
  // 12. PROFILE PHOTO REVEAL
  // ==========================================

  const portraitImage =
    document.querySelector(
      '.portrait-frame img'
    );

  if (portraitImage) {
    gsap.fromTo(
      portraitImage,

      {
        scale: 1.08,
        opacity: 0
      },

      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.35
      }
    );
  }


  // ==========================================
  // 13. SECTION REVEALS
  // ==========================================

  gsap.utils.toArray(
    '.section-title, .case-number, .reveal:not(.hero .reveal)'
  ).forEach(element => {
    gsap.fromTo(
      element,

      {
        y: 28,
        opacity: 0
      },

      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power2.out',

        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true
        }
      }
    );
  });


  // ==========================================
  // 14. ACHIEVEMENT COUNTERS
  // ==========================================

  gsap.utils.toArray(
    '.metric strong'
  ).forEach(node => {
    const target =
      Number(node.dataset.count || 0);

    const suffix =
      node.dataset.suffix || '';

    const counter = {
      value: 0
    };

    ScrollTrigger.create({
      trigger: node,
      start: 'top 88%',
      once: true,

      onEnter: () => {
        gsap.to(
          counter,

          {
            value: target,
            duration: 1.35,
            ease: 'power2.out',

            onUpdate: () => {
              node.textContent =
                `${Math.round(counter.value)}${suffix}`;
            }
          }
        );
      }
    });
  });


  // ==========================================
  // 15. COLLABORATION CARD STACK
  // ==========================================

  // Desktop card depth.
  mm.add(
    '(min-width: 641px)',
    () => {
      const cards =
        gsap.utils.toArray(
          '.collab-card'
        );

      cards.forEach(
        (card, index) => {
          if (
            index === cards.length - 1
          ) {
            return;
          }

          gsap.to(
            card,

            {
              scale: 0.94,
              y: -35,
              opacity: 0.68,
              ease: 'none',

              scrollTrigger: {
                trigger:
                  cards[index + 1],

                start: 'top 82%',
                end: 'top 25%',
                scrub: 0.6
              }
            }
          );
        }
      );
    }
  );


  // Mobile card stack.
  mm.add(
    '(max-width: 640px)',
    () => {
      const cards =
        gsap.utils.toArray(
          '.collab-card'
        );

      cards.forEach(
        (card, index) => {
          if (
            index === cards.length - 1
          ) {
            return;
          }

          gsap.to(
            card,

            {
              scale: 0.975,
              y: -12,
              opacity: 0.82,
              ease: 'none',

              scrollTrigger: {
                trigger:
                  cards[index + 1],

                start: 'top 82%',
                end: 'top 38%',
                scrub: 0.5
              }
            }
          );
        }
      );
    }
  );


  // ==========================================
  // 16. EXPERIENCE, SERVICES AND FILMS
  // ==========================================

  gsap.utils.toArray(
    '.experience-row, .service, .film-tile, .social-profile'
  ).forEach((item, index) => {
    gsap.fromTo(
      item,

      {
        y: 24,
        opacity: 0
      },

      {
        y: 0,
        opacity: 1,
        duration: 0.6,

        delay:
          (index % 4) * 0.04,

        ease: 'power2.out',

        scrollTrigger: {
          trigger: item,
          start: 'top 92%',
          once: true
        }
      }
    );
  });


  // ==========================================
  // 17. SCROLLTRIGGER REFRESH
  // ==========================================

  // Refresh after page resources load.
  window.addEventListener(
    'load',
    () => {
      ScrollTrigger.refresh();
    },
    { once: true }
  );

  // Refresh when images load.
  document.querySelectorAll('img')
    .forEach(image => {
      image.addEventListener(
        'load',
        () => {
          ScrollTrigger.refresh();
        },
        { once: true }
      );
    });

})();
