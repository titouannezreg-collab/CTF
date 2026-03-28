(() => {
  // --- Clock ---
  function updateClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    el.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // --- Link count in status ---
  const links = document.querySelectorAll('#t li a');
  const countEl = document.getElementById('link-count');
  if (countEl) countEl.textContent = links.length;

  // --- Assign data-tags to links ---
  const tags = {
    'cyberini.com': 'CTF',
    'cryptohack.org': 'CRYPTO',
    'vecteezy.com': 'ASSET',
    'slayzbs.github.io': 'CTF',
    'root-me.org': 'HACKING',
    'cyber-learning.fr': 'LEARN',
  };

  links.forEach(a => {
    try {
      const host = new URL(a.href).hostname.replace('www.', '');
      const tag = Object.entries(tags).find(([k]) => host.includes(k));
      a.setAttribute('data-tag', tag ? tag[1] : 'LINK');
    } catch {
      a.setAttribute('data-tag', 'LINK');
    }
  });

  // --- Click ripple effect ---
  links.forEach(a => {
    a.addEventListener('click', e => {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; left:0; top:0; width:100%; height:100%;
        background: rgba(0,255,65,0.08);
        animation: ripple-out 0.3s ease forwards;
        pointer-events: none;
      `;
      a.appendChild(ripple);
      setTimeout(() => ripple.remove(), 350);
    });
  });

  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-out {
      from { opacity: 1; transform: scaleX(1); }
      to   { opacity: 0; transform: scaleX(1.02); }
    }
  `;
  document.head.appendChild(style);

  // --- Typing effect for a decorative line ---
  const typingTarget = document.getElementById('typing-line');
  if (typingTarget) {
    const text = 'ls -la ./resources/';
    let i = 0;
    const cursor = typingTarget.nextElementSibling;
    const type = () => {
      if (i < text.length) {
        typingTarget.textContent += text[i++];
        setTimeout(type, 60 + Math.random() * 40);
      }
    };
    setTimeout(type, 900);
  }

  // --- Random glitch on terminal title ---
  const title = document.getElementById('terminal-title');
  if (title) {
    setInterval(() => {
      if (Math.random() < 0.15) {
        title.style.opacity = '0.3';
        setTimeout(() => { title.style.opacity = '1'; }, 80);
      }
    }, 3000);
  }
})();
