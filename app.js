// Enhanced interactive behaviors: particles, animations, modals, mobile menu

// 1) tsParticles configuration
if (typeof tsParticles !== 'undefined' && tsParticles.load) {
  tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: { color: "transparent" },
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: ["#8b5cf6", "#06b6d4", "#3b82f6", "#ffffff"] },
      shape: { type: "circle" },
      opacity: { 
        value: 0.15, 
        random: true,
        animation: { enable: true, speed: 0.5, minimumValue: 0.05 }
      },
      size: { 
        value: { min: 1, max: 5 },
        animation: { enable: true, speed: 2, minimumValue: 1 }
      },
      links: { 
        enable: true, 
        color: "#8b5cf6", 
        opacity: 0.1, 
        distance: 150,
        width: 1
      },
      move: { 
        enable: true, 
        speed: 1, 
        direction: "none",
        random: true,
        straight: false,
        outModes: "out",
        attract: { enable: true, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: { 
        onHover: { enable: true, mode: "grab" }, 
        onClick: { enable: true, mode: "push" },
        resize: true
      },
      modes: { 
        grab: { distance: 140, links: { opacity: 0.3 } },
        push: { quantity: 4 }
      }
    },
    detectRetina: true
  }).catch((e) => { console.warn('tsParticles init failed', e); });
}

// 2) Set current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 3) Header scroll effect
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// 4) Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
const headerNav = document.querySelector('.header-nav');

if (mobileMenuBtn && headerNav) {
  mobileMenuBtn.addEventListener('click', () => {
    headerNav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });

  // Close menu when clicking nav links
  document.querySelectorAll('.header-nav a').forEach(link => {
    link.addEventListener('click', () => {
      headerNav.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}

// 5) Reveal on scroll with IntersectionObserver
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
  '.hero-content, .section-header, .about-content, .timeline-node, ' +
  '.skill-category, .edu-item, .achievement-item, .highlight-card, .contact-method'
);

animatedElements.forEach(el => {
  if (el) observer.observe(el);
});

// 6) Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// 7) Project modal data
const PROJECTS = {
  mcp: {
    title: 'MCP Integrations — GenAI & Wearables',
    subtitle: 'Platform · API · Compliance',
    body: `
      <p>As Technical Lead for this ambitious project, I designed and implemented comprehensive tooling to enable Model Context Protocol (MCP) integration for GenAI and Wearables with third-party partners including Spotify and OpenTable.</p>
      
      <h3>Key Responsibilities</h3>
      <ul>
        <li>Designed a fully compliant framework to onboard third-party APIs with automated MCP contract creation</li>
        <li>Built automated registration system for tools enabling Meta AI and Wearables integration</li>
        <li>Collaborated closely with multiple cross-functional organizations including Partnership XFN, Legal, and App Management teams</li>
        <li>Ensured all integrations meet FTC safeguards and privacy commitments</li>
      </ul>
      
      <h3>Impact</h3>
      <p>This system dramatically reduced manual onboarding time and enabled compliant, scalable product integrations with major third-party services, opening new capabilities for Meta's AI and wearable products.</p>
      
      <p><strong>Technologies:</strong> TypeScript, Go, Kubernetes, Observability tools, API Gateway</p>
    `,
    footer: 'Tech: TypeScript · Go · Kubernetes · Observability'
  },
  governance: {
    title: 'API Governance & Continuous Oversight',
    subtitle: 'Governance · Observability',
    body: `
      <p>Built enterprise-scale tooling for API oversight and governance to ensure data sharing with third parties happens in accordance with FTC safeguards and regulatory commitments.</p>
      
      <h3>Key Achievements</h3>
      <ul>
        <li>Developed continuous governance tool validating key indicators for <strong>1 billion entities per day</strong></li>
        <li>Collaborated with 5 teams to leverage and adopt the governance tooling</li>
        <li>Introduced automated compliance checks that made launching new APIs <strong>10x faster</strong></li>
        <li>Saved the organization <strong>$15+ million annually</strong> through automation</li>
        <li>Led org-wide engineering excellence initiative to improve service observability</li>
      </ul>
      
      <h3>Technical Approach</h3>
      <p>Built a scalable, event-driven architecture using Kafka for real-time data streaming, Python for data processing, and comprehensive monitoring dashboards to track compliance metrics across all API endpoints.</p>
      
      <p><strong>Technologies:</strong> Python, Kafka, Monitoring & Alerting, Data Pipelines</p>
    `,
    footer: 'Tech: Python · Kafka · Monitoring'
  },
  actor: {
    title: 'Actor Misrepresentation Detection System',
    subtitle: 'Safety · ML',
    body: `
      <p>Led the team responsible for building services to enforce policies against bad actors across Meta's family of apps, with a focus on proactive detection and privacy-compliant enforcement.</p>
      
      <h3>System Design</h3>
      <ul>
        <li>Designed and developed the end-to-end system for Instagram from ground up</li>
        <li>Created and iterated over machine learning models for proactively detecting bad actors with high precision and recall</li>
        <li>Built scalable enforcement pipelines capable of handling billions of accounts</li>
        <li>Implemented privacy-preserving detection mechanisms aligned with legal requirements</li>
      </ul>
      
      <h3>Cross-functional Collaboration</h3>
      <ul>
        <li>Worked closely with Legal team on privacy and compliance requirements</li>
        <li>Collaborated with cross-functional partners for implementation and monitoring</li>
        <li>Reduced prevalence of bad actors through effective detection and enforcement</li>
      </ul>
      
      <p><strong>Technologies:</strong> Machine Learning, Event-driven Infrastructure, Python, Data Analytics</p>
    `,
    footer: 'Tech: ML · Event-driven infra'
  },
  underage: {
    title: 'Underage Reporting & Enforcement',
    subtitle: 'Compliance',
    body: `
      <p>Led and built the service for enforcing policies on minors (under the age of 13) who are not allowed on the platform, ensuring compliance with regulatory requirements and FTC commitments.</p>
      
      <h3>System Architecture</h3>
      <ul>
        <li>Designed end-to-end service to support Facebook, Instagram, and Meta accounts</li>
        <li>Built automated detection and enforcement pipelines</li>
        <li>Implemented secure data retention and deletion mechanisms with committed SLAs</li>
        <li>Created reporting systems for regulatory compliance</li>
      </ul>
      
      <h3>Regulatory Compliance</h3>
      <ul>
        <li>Worked closely with Legal on various case studies, responses, and reports to FTC</li>
        <li>Collaborated with Retention teams to ensure data deletion meets committed SLAs</li>
        <li>Maintained comprehensive audit trails for regulatory oversight</li>
      </ul>
      
      <p><strong>Technologies:</strong> Secure Data Pipelines, Compliance Frameworks, Automated Enforcement</p>
    `,
    footer: 'Tech: Secure data pipelines'
  },
  gpi: {
    title: 'GitHub Private Instances',
    subtitle: 'Enterprise · Infrastructure',
    body: `
      <p>Led the virtual team architecting GitHub's new enterprise offering: GitHub Private Instances. This solution provides dedicated, isolated GitHub environments backed by Azure's cloud services stack.</p>
      
      <h3>Architecture & Design</h3>
      <ul>
        <li>Led topology investigations and architecture design of the control plane</li>
        <li>Designed provisioning mechanisms and automation for enterprise deployments</li>
        <li>Built container-based monitoring pipeline to pump syslog and statsd data to logging platform</li>
        <li>Created comprehensive dashboard charts for various metric data</li>
        <li>Set up alerting for system anomalies integrated with incident management</li>
      </ul>
      
      <h3>Reliability & Operations</h3>
      <ul>
        <li>Designed observability solution to monitor pipelines for reliability</li>
        <li>Implemented backup solution for primary nodes with reliability monitors</li>
        <li>Automated configuration management and deployment processes</li>
      </ul>
      
      <p><strong>Technologies:</strong> Azure, Containers, Kubernetes, Monitoring, Logging, Infrastructure as Code</p>
    `,
    footer: 'Tech: Azure · Containers · Monitoring'
  },
  testplatform: {
    title: 'Test Platform V2 & MSTest V2',
    subtitle: 'Open Source · Testing',
    body: `
      <p>Drove the design and implementation of the new open source, cross-platform .NET Core based Test Platform which powers all unit and integration testing via Visual Studio, VS Code, and Azure DevOps.</p>
      
      <h3>Key Contributions</h3>
      <ul>
        <li>Led design and implementation partnering with stakeholders: Test Explorer for Visual Studio, Live Unit Testing, .NET Core CLI, and third-party tooling like Rider</li>
        <li>Implemented parallel discovery and execution support for .NET Core</li>
        <li>Added protocol versioning in communication layer, reducing payload verbosity by <strong>~50%</strong></li>
        <li>Worked on performance improvements targeting key Live Unit Testing scenarios</li>
        <li>Achieved <strong>~40% performance improvement</strong> by removing redundancies</li>
      </ul>
      
      <h3>MSTest V2 Adapter</h3>
      <p>Led design and implementation of the MSTest V2 adapter, navigating ambiguities to make it open source and widely adopted across the .NET ecosystem.</p>
      
      <p><strong>References:</strong></p>
      <ul>
        <li><a href="https://github.com/microsoft/vstest" target="_blank" rel="noopener">github.com/microsoft/vstest</a></li>
        <li><a href="https://github.com/microsoft/testfx" target="_blank" rel="noopener">github.com/microsoft/testfx</a></li>
      </ul>
      
      <p><strong>Technologies:</strong> .NET Core, C#, Open Source, Testing Frameworks</p>
    `,
    footer: 'Tech: .NET Core · Open Source'
  },
  intellitest: {
    title: 'IntelliTest for Visual Studio',
    subtitle: 'Testing · Automation',
    body: `
      <p>Added a new tool for automatically generating unit tests called IntelliTest for Visual Studio 2015, helping developers write guardrails with ease and find issues with their code.</p>
      
      <h3>Achievement</h3>
      <ul>
        <li>Wrote the entire UI for the feature in less than <strong>3 weeks</strong></li>
        <li>Implemented automated test generation algorithms</li>
        <li>Integrated seamlessly with Visual Studio IDE</li>
        <li>Enabled developers to quickly create comprehensive test suites</li>
      </ul>
      
      <h3>Impact</h3>
      <p>IntelliTest significantly reduced the time developers spent writing unit tests while improving code coverage and quality. The tool became a popular feature in Visual Studio for .NET developers.</p>
      
      <p><strong>Technologies:</strong> C#, Visual Studio SDK, WPF, Test Generation Algorithms</p>
    `,
    footer: 'Tech: C# · Visual Studio · WPF'
  },
  codedui: {
    title: 'Coded UI Test',
    subtitle: 'Testing · Windows',
    body: `
      <p>Responsibly drove adding support for Windows Store apps in Coded UI Test, enabling automated UI testing for the new Windows platform.</p>
      
      <h3>Key Contributions</h3>
      <ul>
        <li>Created specialized controls to represent new controls in the Windows OS</li>
        <li>Built comprehensive test suite for the platform layer preventing regressions</li>
        <li>Enabled automated UI testing for Windows Store applications</li>
        <li>Ensured backward compatibility with existing test frameworks</li>
      </ul>
      
      <p><strong>Technologies:</strong> C#, Windows Store APIs, UI Automation, Testing Frameworks</p>
    `,
    footer: 'Tech: C# · Windows Store · UI Automation'
  }
};

// 8) Modal handling
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;

function openProjectModal(id) {
  const project = PROJECTS[id];
  if (!project || !modal || !modalBody) return;
  
  modalBody.innerHTML = `
    <h2 id="modal-title">${project.title}</h2>
    <p class="muted" style="margin-bottom: 24px; font-size: 1.1rem;">${project.subtitle}</p>
    ${project.body}
  `;
  
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  const content = modal.querySelector('.modal-content');
  if (content && typeof content.focus === 'function') {
    setTimeout(() => content.focus(), 100);
  }
}

function closeProjectModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (modalBody) modalBody.innerHTML = '';
}

// Attach click handlers to project cards
document.querySelectorAll('.project-card').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openProjectModal(btn.dataset.project);
  });
  
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProjectModal(btn.dataset.project);
    }
  });
});

// Close modal handlers
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', closeProjectModal);
});

if (modal && modalOverlay) {
  modalOverlay.addEventListener('click', closeProjectModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

// 9) Add typing effect to hero name (optional enhancement)
const heroName = document.querySelector('.hero-name');
if (heroName) {
  const text = heroName.textContent;
  heroName.style.opacity = '1';
}

// 10) Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
  }
});

console.log('🚀 Portfolio loaded successfully!');
