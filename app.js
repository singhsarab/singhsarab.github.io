// Main interactive behaviors: particles background, year, theme toggle, reveal-on-scroll, project modal

// 1) tsParticles (lightweight config)
if (typeof tsParticles !== 'undefined' && tsParticles.load) {
  tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: { color: "transparent" },
    particles: {
      number: { value: 60 },
      color: { value: ["#7a6bff", "#6dd3ff", "#ffffff"] },
      shape: { type: "circle" },
      opacity: { value: 0.12, random: true },
      size: { value: { min: 1, max: 4 } },
      links: { enable: true, color: "#4a6bff", opacity: 0.08, distance: 140 },
      move: { enable: true, speed: 1.2, outModes: "out" }
    },
    interactivity: {
      detectsOn: "canvas",
      events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
      modes: { repulse: { distance: 120 }, push: { quantity: 3 } }
    },
    detectRetina: true
  }).catch((e)=>{ console.warn('tsParticles init failed', e); });
}

// 2) set year and theme toggle
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) themeToggle.addEventListener('click', () => document.documentElement.classList.toggle('dark'));

// 3) reveal on scroll (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });

document.querySelectorAll('.hero-left, .timeline-node, .project-card, .card').forEach(el => {
  if (el) observer.observe(el);
});

// 4) Project modal handling (PROJECTS curated)
const PROJECTS = {
  mcp: {
    title: 'MCP Integrations — GenAI & Wearables',
    subtitle: 'Platform · API · Compliance',
    body: `<p>Designed onboarding tooling and MCP contracts to register third-party APIs as tools for Meta AI and Wearables. Coordinated across Partnerships, Legal and App Management to enable secure integrations with partners such as Spotify and OpenTable.</p>
           <ul><li>Automated registration of MCP contracts and tool registration</li><li>Privacy and FTC safeguards implemented via automated checks</li></ul>
           <p><strong>Impact:</strong> Reduced manual onboarding and enabled compliant product integrations.</p>`,
    footer: 'Tech: TypeScript · Go · Kubernetes · Observability'
  },
  governance: {
    title: 'API Governance & Continuous Oversight',
    subtitle: 'Governance · Observability',
    body: `<p>Built continuous governance tooling that validates indicators for ~1B entities per day and enforces safeguards at scale.</p>
           <p><strong>Impact:</strong> Accelerated launches and improved compliance.</p>`,
    footer: 'Tech: Python · Kafka · Monitoring'
  },
  actor: {
    title: 'Actor Misrepresentation Detection',
    subtitle: 'Safety · ML',
    body: `<p>Led end-to-end systems for detecting actor misrepresentation and enforcing policies across products, working closely with Legal and Privacy.</p>
           <p><strong>Impact:</strong> Improved proactive detection with high precision/recall.</p>`,
    footer: 'Tech: ML · Event-driven infra'
  },
  underage: {
    title: 'Underage Reporting & Enforcement',
    subtitle: 'Compliance',
    body: `<p>Designed services to enforce underage account policies and retention/deletion pipelines aligned to regulatory commitments.</p>`,
    footer: 'Tech: Secure data pipelines'
  },
  gpi: {
    title: 'GitHub Private Instances',
    subtitle: 'Enterprise · Infra',
    body: `<p>Architected topology, provisioning and monitoring for GitHub Private Instances on Azure, including automation and observability pipelines.</p>`,
    footer: 'Tech: Azure · Containers · Monitoring'
  },
  testplatform: {
    title: 'Test Platform V2 & MSTest V2',
    subtitle: 'Open source · Testing',
    body: `<p>Contributed to the design and delivery of the .NET Core test platform and MSTest V2 adapter, improving performance and tooling integration.</p>`,
    footer: 'Tech: .NET Core · Open Source'
  }
};

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

function openProjectModal(id){
  const p = PROJECTS[id];
  if (!p || !modal || !modalBody) return;
  modalBody.innerHTML = `<h2 id="modal-title">${p.title}</h2><p class="muted">${p.subtitle}</p>${p.body}<p class="muted" style="margin-top:10px">${p.footer}</p>`;
  modal.setAttribute('aria-hidden','false');
  const content = modal.querySelector('.modal-content');
  if (content && typeof content.focus === 'function') content.focus();
}

function closeProjectModal(){ if (!modal) return; modal.setAttribute('aria-hidden','true'); if (modalBody) modalBody.innerHTML = ''; }

document.querySelectorAll('.project-card').forEach(btn => {
  btn.addEventListener('click', (e)=>{ e.preventDefault(); openProjectModal(btn.dataset.project); });
  btn.addEventListener('keydown', (e)=>{ if (e.key==='Enter' || e.key===' ') { e.preventDefault(); openProjectModal(btn.dataset.project); } });
});

// close handlers
document.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closeProjectModal));
if (modal) {
  modal.addEventListener('click', (e)=>{ if (e.target === modal) closeProjectModal(); });
}
document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeProjectModal(); });

// safe no-op for future fetchReadme usage
async function fetchReadme(){ return null; }
