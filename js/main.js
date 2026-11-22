
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

  // Available globally for future content editing.
  window.PORTFOLIO_CONTENT = CONFIG;


  // ==========================================
  // 2. INITIAL PAGE SETUP
  // ==========================================

  document.documentElement.classList.add('js-ready');

  // Dynamic copyright year.
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

    const showPortraitFallback = () => {
      portrait.style.display = 'none';

      const placeholder =
        portrait.parentElement.querySelector(
          '.portrait-placeholder'
        );

      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    };

    portrait.addEventListener(
      'error',
      showPortraitFallback,
      { once: true }
    );

    if (
      portrait.complete &&
      portrait.naturalWidth === 0
    ) {
      showPortraitFallback();
    }

    portrait.addEventListener('load', () => {
      const placeholder =
        portrait.parentElement.querySelector(
          '.portrait-placeholder'
        );

      if (placeholder) {
        placeholder.style.display = 'none';
      }
    });
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

      if (output && role) {
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
  // 7. LAZY INSTAGRAM EMBEDS
  // ==========================================

  let instagramScriptPromise;

  function loadInstagramScript() {

    if (
      window.instgrm &&
      window.instgrm.Embeds
    ) {
      return Promise.resolve();
    }

    if (instagramScriptPromise) {
      return instagramScriptPromise;
    }

    instagramScriptPromise =
      new Promise(resolve => {

        const existingScript =
          document.querySelector(
            'script[data-instagram-embed]'
          );

        if (existingScript) {

          existingScript.addEventListener(
            'load',
            resolve,
            { once: true }
          );

          existingScript.addEventListener(
            'error',
            resolve,
            { once: true }
          );

          return;
        }

        const script =
          document.createElement('script');

        script.async = true;

        script.src =
          'https://www.instagram.com/embed.js';

        script.dataset.instagramEmbed =
          'true';

        script.onload = resolve;

        // If Instagram is blocked,
        // the external link still works.
        script.onerror = resolve;

        document.body.appendChild(script);
      });

    return instagramScriptPromise;
  }


  // Find all collaboration Reel placeholders.
  document.querySelectorAll(
    '.reel-frame[data-reel]'
  ).forEach(frame => {

    const placeholder =
      frame.querySelector(
        '.reel-placeholder'
      );

    if (!placeholder) return;

    const loadEmbed = async () => {

      if (
        frame.dataset.loaded === 'true'
      ) {
        return;
      }

      frame.dataset.loaded = 'true';

      const permalink =
        frame.dataset.reel;

      const blockquote =
        document.createElement(
          'blockquote'
        );

      blockquote.className =
        'instagram-media';

      blockquote.setAttribute(
        'data-instgrm-permalink',
        permalink
      );

      blockquote.setAttribute(
        'data-instgrm-version',
        '14'
      );

      blockquote.style.cssText =
        'background:#fff;' +
        'border:0;' +
        'margin:0;' +
        'max-width:100%;' +
        'width:100%;';

      const fallback =
        frame.querySelector(
          '.reel-fallback'
        );

      frame.insertBefore(
        blockquote,
        fallback
      );

      placeholder.remove();

      await loadInstagramScript();

      if (
        window.instgrm &&
        window.instgrm.Embeds
      ) {
        window.instgrm.Embeds.process();
      }
    };

    // Keyboard and touch accessibility.
    placeholder.setAttribute(
      'role',
      'button'
    );

    placeholder.setAttribute(
      'tabindex',
      '0'
    );

    placeholder.setAttribute(
      'aria-label',
      'Load Instagram Reel embed'
    );

    placeholder.addEventListener(
      'click',
      loadEmbed,
      { once: true }
    );

    placeholder.addEventListener(
      'keydown',
      event => {

        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {
          event.preventDefault();
          loadEmbed();
        }
      }
    );
  });


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
        evidenceBox.querySelector(
          'strong'
        );

      const small =
        evidenceBox.querySelector(
          'small'
        );

      if (heading) {
        heading.textContent =
          'Instagram campaign insights';
      }

      if (small) {
        small.remove();
      }

      evidenceBox.insertBefore(
        image,
        heading
      );

      evidenceBox.classList.add(
        'has-evidence'
      );
    };
  }


  // ==========================================
  // 9. GSAP ANIMATION SYSTEM
  // ==========================================

  const reduceMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

  if (
    !reduceMotion &&
    window.gsap &&
    window.ScrollTrigger
  ) {

    gsap.registerPlugin(
      ScrollTrigger
    );

    const mm = gsap.matchMedia();


    // ----------------------------------------
    // HERO ANIMATION
    // ----------------------------------------

    gsap.set(
      '.hero-title span',
      {
        y: 45,
        opacity: 0
      }
    );

    gsap.set(
      '.hero-visual',
      {
        clipPath:
          'inset(0 0 100% 0)'
      }
    );

    const intro =
      gsap.timeline({
        defaults: {
          ease: 'power3.out'
        }
      });

    intro
      .to(
        '.hero-title span',
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12
        }
      )

      .to(
        '.hero-visual',
        {
          clipPath:
            'inset(0 0 0% 0)',
          duration: 1.1
        },
        '-=0.45'
      )

      .from(
        '.hero .reveal',
        {
          y: 24,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08
        },
        '-=0.55'
      );


    // Profile photo reveal.
    gsap.to(
      '.portrait-frame img',
      {
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.4
      }
    );


    // ----------------------------------------
    // SECTION REVEALS
    // ----------------------------------------

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


    // ----------------------------------------
    // ANIMATED ACHIEVEMENT NUMBERS
    // ----------------------------------------

    gsap.utils.toArray(
      '.metric strong'
    ).forEach(node => {

      const target =
        Number(
          node.dataset.count || 0
        );

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


    // ----------------------------------------
    // COLLABORATION CARD STACK
    // ----------------------------------------

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


    // ----------------------------------------
    // EXPERIENCE, SERVICES AND FILMS
    // ----------------------------------------

    gsap.utils.toArray(
      '.experience-row, .service, .film-tile, .social-profile'
    ).forEach((item, index) => {

      gsap.from(
        item,

        {
          y: 24,
          opacity: 0,
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


    // ----------------------------------------
    // REFRESH SCROLLTRIGGER
    // ----------------------------------------

    // Refresh after page resources load.
    window.addEventListener(
      'load',
      () => {
        ScrollTrigger.refresh();
      },
      { once: true }
    );

    // Refresh after images load.
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

  } else {

    // ----------------------------------------
    // FALLBACK WITHOUT GSAP
    // ----------------------------------------

    // Keep content visible if animations
    // are disabled or CDN scripts fail.

    document.querySelectorAll(
      '.js-ready .reveal'
    ).forEach(element => {

      element.style.opacity = '1';

      element.style.transform = 'none';
    });

    document.querySelectorAll(
      '.hero-title span'
    ).forEach(element => {

      element.style.opacity = '1';

      element.style.transform = 'none';
    });

    const visual =
      document.querySelector(
        '.hero-visual'
      );

    if (visual) {
      visual.style.clipPath = 'none';
    }
  }

})();

