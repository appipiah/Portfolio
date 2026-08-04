import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const tickerWords = [
  "AI-NATIVE",
  "USER-OBSESSED",
  "DESIGN SYSTEMS",
  "OPEN TO BIG IDEAS",
  "CAFFEINATED",
]

const excelMindMeta = [
  ["Role", "Product Designer"],
  ["Market", "EdTech"],
  ["Product", "B2B SaaS"],
  ["Timeline", "2025-2026"],
  ["Tools", "Figma"],
]

const excelMindSections = [
  {
    title: "Vision",
    body: [
      "ExcelMind began as an AI-powered exam preparation platform that helped secondary school students prepare for WAEC, UTME, GCE, and NECO through past questions and AI-generated practice materials.",
      "As the business evolved, the company expanded beyond student subscriptions to build a complete digital platform for schools, bringing together school administration, teaching, examinations, and learning into one connected experience.",
    ],
    images: ["{image}"],
  },
  {
    title: "The Challenge",
    body: [
      "The original consumer subscription model proved difficult to scale financially, prompting the business to pivot toward a B2B strategy centered on schools. This meant designing an entirely new suite of products within a short period, while the direction of the product continued to evolve.",
      "Schools are complex environments. Admissions, academics, examinations, finance, communication, and learning all depend on one another, so every new feature had to fit naturally into the bigger picture instead of solving a single problem in isolation.",
      "At the same time, engineering had already begun building parts of the platform, leaving little room for major redesigns. Every decision had to be practical, well thought out, and ready for implementation.",
    ],
  },
  {
    title: "My Role",
    body: [
      "I was responsible for designing several of the platform's core products, including the Administrative Dashboard, Learning Management System (LMS), and the internal examination upload portal that powers ExcelMind's AI-assisted exam preparation platform. Together, these products formed the foundation of the experience schools use to set up, manage, and run their daily operations.",
      "Across these products, I designed features that enabled schools to configure class structures, grading systems, assessments, fee schedules, promotion requirements, domains, and user management for students, staff, and parents. Since many of these features depended on one another, I carefully considered their relationships, constraints, and edge cases to ensure the platform remained flexible enough to support different school structures without creating conflicts elsewhere.",
      "Alongside product design, I established and maintained shared design foundations—including reusable styles and design assets—to keep the experience consistent and support faster design as the platform evolved.",
    ],
  },
  {
    title: "Process",
    body: [
      "Designing ExcelMind meant thinking beyond individual screens. Every feature had to fit into a much larger system where decisions in one area could directly affect another.",
      "Before opening Figma, I spent time understanding the problem. I broke every feature into smaller workflows and asked a lot of questions: Why does this exist? How do schools handle this today? What outcome are we trying to achieve? What other parts of the platform will this affect? Those conversations helped me understand the problem before I started designing solutions.",
      "As I worked through the platform, I realized very few features stood on their own. Attendance didn't just record who was present, it influenced report cards and promotion decisions. Timetables weren't simply schedules; they determined what teachers and students saw in the LMS each day. School configurations, such as grading systems and class structures, shaped how almost every other module behaved",
      "That changed how I approached the project. Instead of solving one feature at a time, I focused on how information flowed across the platform and how decisions in one area would ripple through another. My goal wasn't just to design good screens, but to make sure the entire system behaved consistently.",
      "Since development was moving quickly, there was very little room for iteration. I couldn't rely on implementation to expose gaps in the design-I had to uncover them beforehand. That meant thinking through every workflow, state, permission level, empty state, error state, and alternate path before handing designs to engineering. It was more work upfront, but it reduced ambiguity, surfaced edge cases early, and allowed development to move with confidence.",
      "Flexibility was another principle that guided my work. No two schools operate exactly the same way, so I avoided building rigid workflows wherever possible. Instead, I designed configurable frameworks that could adapt to different class structures, grading methods, assessment models, fee systems, and naming conventions. Open fields and customizable settings allowed schools to shape the platform around their existing processes rather than forcing them into a predefined way of working.",
      "My understanding of relational data also influenced many design decisions. Linking teachers to subjects and assigned classes meant timetable creation only surfaced relevant options. Parent profiles could support multiple children across different classes or departments without introducing unnecessary complexity. Rather than treating data relationships as an engineering concern, I used them to simplify the experience for users.",
      "Because ExcelMind was built primarily for Nigerian schools, validating workflows and terminology was relatively straightforward. I studied products like Gradely and Google Classroom for established interaction patterns, then adapted those ideas to fit local school operations and the platform's requirements.",
      "Finally, I wanted the platform to feel lighter than the work it supported. School administration involves long hours of repetitive tasks, so I intentionally used colour, spacing, and visual hierarchy to create an experience that felt approachable and engaging without sacrificing clarity.",
      "Throughout the project, I followed a simple framework: use what is proven, improve what can be better, and create something new only when the problem genuinely requires it.",
    ],
    images: ["{image}"],
  },
  {
    title: "Inside the Platform",
    modules: [
      ["School Onboarding & Setup", "Designed the onboarding experience that allows schools to configure their academic structure, grading systems, assessments, fees, domains, and other operational settings before using the platform.", "{images}"],
      ["Administrative Dashboard", "The central workspace that gives school administrators a complete overview of operations, key metrics, and quick access to the platform's core modules.", "{images}"],
      ["User Management", "Built administrative workflows for managing students, staff, parents, and the relationships between them across the platform.", "{images}"],
      ["Attendance Management", "Designed attendance tracking for students and staff, providing a clear record of presence, lateness, and absences across the school.", "{images}"],
      ["Timetable Management", "Built flexible scheduling tools for classes, teachers, and subjects that integrate seamlessly with the learning platform.", "{images}"],
      ["Learning Management System (LMS)", "Designed teacher-facing tools for assessments, grading, coursework, and managing day-to-day classroom activities.", "{images}"],
      ["Results Management", "Designed workflows for grading, report cards, promotion requirements, and student performance across different school structures.", "{images}"],
      ["Payment Management", "A centralized view of school finances, allowing administrators to monitor revenue, payment activity, outstanding balances, and students with unpaid fees.", "{images}"],
      ["School Communication", "Designed announcement, event, and calendar experiences that keep administrators, teachers, students, and parents informed.", "{images}"],
      ["Examination Upload Portal", "Designed an internal tool used by the content team to upload, organize, and manage examination questions for ExcelMind's AI-assisted exam preparation platform.", "{images}"],
    ],
  },
  {
    title: "Reflection",
    body: [
      "ExcelMind pushed me further than any project I had worked on at the time.",
      "It was the project that sparked my love for designing complex systems. I discovered that I'm happiest working on robust platforms with lots of moving parts-products where every decision has consequences somewhere else. Even today, I get excited by the thought of staying up at 2 a.m., sketching different flows, refining logic, and figuring out the cleanest way to solve a complicated problem. That's where I do some of my best thinking.",
      "It also made me realize that I do my best work when I'm trusted with ownership. Being responsible for large parts of the platform meant making difficult decisions, defending them, and thinking beyond the immediate task in front of me. That level of ownership shaped my confidence as a designer and continues to influence how I approach products today.",
      "The project stretched me in ways I hadn't experienced before. The deadlines were relentless, the platform kept expanding, and there was very little room for iteration. Looking back, I honestly don't know what I was running on during those months-I don't think that version of my brain still exists anymore. 😄 But I'm incredibly grateful for the experience. It pushed me beyond what I thought I was capable of and raised my own standard for the quality of work I expect from myself.",
      "One of the most rewarding moments came after I had left the company. My manager reached out to personally thank me again for my contribution to ExcelMind, and the designer I had onboarded remarked on the breadth of the platform and the amount of work that had gone into it. Knowing that the work continued to support the team-and could be confidently maintained and built upon long after I had moved on-was incredibly fulfilling.",
      "ExcelMind reinforced a belief I still carry into every project: the more complex the system, the greater my responsibility to make it feel simple. My job isn't to expose complexity-it's to absorb it, organize it, and turn it into something people can use with confidence.",
    ],
  },
]

const projects = [
  {
    id: "01",
    slug: "excelmind",
    title: "ExcelMind",
    year: "2025-2026",
    description: "Designing a unified B2B platform for school administration and learning.",
    eyebrow: "PRODUCT DESIGN · EDTECH · B2B SAAS",
    meta: excelMindMeta,
    sections: excelMindSections,
  },
  { id: "02", slug: "project-two", title: "heading", year: "2026", description: "coming soon" },
  { id: "03", slug: "project-three", title: "heading", year: "2026", description: "coming soon" },
  { id: "04", slug: "project-four", title: "heading", year: "2026", description: "coming soon" },
]

const caseStudySections = [
  "Overview",
  "Product parts",
  "Internal tools",
  "Mobile app",
  "Website",
  "Outcome",
]

const tools = [
  { name: "Figma", logo: "figma" },
  { name: "Claude", logo: "spark" },
  { name: "Framer", logo: "framer" },
  { name: "GPT", logo: "gpt" },
  { name: "Lovable", logo: "heart" },
  { name: "Antigravity", logo: "orbit" },
]

function jumpToPortfolioTarget(target = "") {
  const root = document.documentElement
  root.style.scrollBehavior = "auto"

  const targetElement = target ? document.querySelector(target) : null
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "auto", block: "start" })
  } else {
    window.scrollTo(0, 0)
    root.scrollTop = 0
    document.body.scrollTop = 0
  }

  window.setTimeout(() => {
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "auto", block: "start" })
    } else {
      window.scrollTo(0, 0)
      root.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, 450)
}

function useScrollReveal(active) {
  useEffect(() => {
    if (!active) return undefined

    const items = [...document.querySelectorAll("[data-reveal]")]
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { threshold: 0.16 },
    )

    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [active])
}

function useGsapScrollTransitions(active) {
  useEffect(() => {
    if (!active) return undefined

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-section]").forEach(section => {
        gsap.fromTo(
          section,
          { clipPath: "inset(8% 0% 8% 0%)", y: 70 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              end: "top 35%",
              scrub: 0.65,
            },
          },
        )
      })

      gsap.utils.toArray(".paper-layer").forEach((layer, index) => {
        gsap.to(layer, {
          yPercent: index % 2 === 0 ? -8 : 6,
          rotate: index % 2 === 0 ? -2 : 2,
          ease: "none",
          scrollTrigger: {
            trigger: layer,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        })
      })

    })

    return () => ctx.revert()
  }, [active])
}

function useCursorInteractions(active) {
  useEffect(() => {
    if (!active) return undefined

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return undefined

    const cursor = document.querySelector(".cursor-aura")
    if (!cursor) return undefined

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" })

    const onMove = event => {
      xTo(event.clientX)
      yTo(event.clientY)

      document.querySelectorAll("[data-cursor-depth]").forEach((item, index) => {
        const depth = Number(item.dataset.cursorDepth) || 8
        const rect = item.getBoundingClientRect()
        const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width
        const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height

        gsap.to(item, {
          x: dx * depth,
          y: dy * depth,
          rotate: dx * (index % 2 === 0 ? 4 : -4),
          duration: 0.5,
          ease: "power3.out",
        })
      })
    }

    const onLeave = () => {
      gsap.to("[data-cursor-depth]", { x: 0, y: 0, rotate: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" })
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
    }
  }, [active])
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const updateField = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitForm = event => {
    event.preventDefault()
    const subject = `Portfolio message from ${form.name}`
    const body = `${form.message}\n\nReply to: ${form.email}`

    window.location.href = `mailto:bodededolapo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="contact-form paper-card" onSubmit={submitForm}>
      <label>
        <span>Name</span>
        <input name="name" value={form.name} onChange={updateField} placeholder="your name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" value={form.email} onChange={updateField} placeholder="your email" required />
      </label>
      <label className="full">
        <span>Message</span>
        <textarea name="message" value={form.message} onChange={updateField} placeholder="lets hear it." required />
      </label>
      <button className="btn btn-dark full" type="submit">Send message</button>
    </form>
  )
}

function ToolLogo({ type }) {
  if (type === "figma") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="6" r="4" />
        <circle cx="15" cy="6" r="4" />
        <circle cx="9" cy="12" r="4" />
        <circle cx="15" cy="12" r="4" />
        <circle cx="9" cy="18" r="4" />
      </svg>
    )
  }

  if (type === "framer") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h12v6h-6l6 6H6V3Zm0 12h6l6 6H6v-6Z" />
      </svg>
    )
  }

  if (type === "gpt") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3c2.4 0 3.8 1.2 4.3 3.1 2 .4 3.4 1.9 3.4 4 0 1.3-.5 2.4-1.4 3.2.2 2.2-1.2 4-3.3 4.6-1.1 1.8-3.1 2.8-5.1 2.1-1.5-.5-2.5-1.6-3-3.1-1.8-.7-2.9-2.2-2.9-4.1 0-1.5.7-2.7 1.8-3.5-.1-2.2 1.3-4 3.3-4.5C9.8 3.7 10.8 3 12 3Zm-3 7.1 3-1.8 3 1.8v3.6l-3 1.8-3-1.8v-3.6Z" />
      </svg>
    )
  }

  if (type === "heart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20s-7.2-4.3-8.8-9.1C2.1 7.6 4.2 5 7.2 5c1.8 0 3.3 1 4.1 2.4C12.1 6 13.6 5 15.4 5c3 0 5.1 2.6 4 5.9C17.8 15.7 12 20 12 20Z" />
      </svg>
    )
  }

  if (type === "orbit") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M3.5 12c0-3 3.8-5.4 8.5-5.4s8.5 2.4 8.5 5.4-3.8 5.4-8.5 5.4S3.5 15 3.5 12Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7.2 4.9c2.6-1.5 6.6.8 9 4.9 2.3 4.1 2.1 8.6-.5 10-2.6 1.5-6.6-.8-9-4.9-2.3-4.1-2.1-8.6.5-10Z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 14.2 9.8 22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.34 8.84H2.45v12.1h2.89V8.84ZM5.63 5.09c0-.92-.73-1.62-1.71-1.62s-1.72.7-1.72 1.62.73 1.64 1.68 1.64h.02c1 0 1.73-.71 1.73-1.64Zm16.17 8.91c0-3.7-1.98-5.42-4.62-5.42-2.13 0-3.08 1.17-3.62 1.99V8.84h-2.88c.04 1.13 0 12.1 0 12.1h2.88v-6.76c0-.36.03-.72.13-.98.29-.72.94-1.47 2.04-1.47 1.44 0 2.02 1.1 2.02 2.71v6.5h2.89L21.8 14Z" />
    </svg>
  )
}

function PortfolioNav({ onNavigateHome }) {
  const navigateHome = (target = "") => {
    if (onNavigateHome) {
      onNavigateHome(target)
      return
    }

    if (target) {
      window.history.replaceState(null, "", target)
      jumpToPortfolioTarget(target)
      return
    }

    window.history.replaceState(null, "", "/")
    jumpToPortfolioTarget()
  }

  return (
    <nav>
      <div className="wrap">
        <div className="brand">
          Bodede Dolapo <span className="nick">(Appipiah)</span>
        </div>
        <ul>
          <li><button className="nav-link" type="button" onClick={() => navigateHome()}>Home</button></li>
          <li><button className="nav-link" type="button" onClick={() => navigateHome("#work")}>Work</button></li>
          <li><a href="https://docs.google.com/document/d/1pVbIt1Cxmym9DcsxW6L6BseUvCa4z8zyPJtKUNf4ZuM/edit?usp=sharing" target="_blank" rel="noreferrer">Resume</a></li>
          <li><span className="nav-disabled" aria-disabled="true">Playground (coming soon)</span></li>
        </ul>
        <a className="icon-btn linkedin-btn" href="https://www.linkedin.com/in/bodededolapo/" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      </div>
    </nav>
  )
}

function CaseStudyPage({ project, onBack, onSelectProject }) {
  const pageSections = project.sections || caseStudySections.map(section => ({
    title: section,
    body: [`Placeholder copy for ${section.toLowerCase()}. Use this area to describe the decisions, product surfaces, constraints, tradeoffs, and results.`],
    images: ["image placeholder"],
  }))
  const [activeSection, setActiveSection] = useState(pageSections[0].title)
  const sectionId = section => `${project.slug}-${section.title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and").replaceAll("(", "").replaceAll(")", "")}`

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setActiveSection(pageSections[0].title)
  }, [project])

  useEffect(() => {
    const observers = pageSections.map(section => {
      const id = sectionId(section)
      const element = document.getElementById(id)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.title)
        },
        { rootMargin: "-34% 0px -52% 0px", threshold: 0.01 },
      )

      observer.observe(element)
      return observer
    })

    return () => observers.forEach(observer => observer?.disconnect())
  }, [project])

  return (
    <main className="case-page">
      <PortfolioNav onNavigateHome={onBack} />

      <header className="case-hero">
        <div className="wrap case-hero-inner">
          <span className="eyebrow">Case study</span>
          <h1>{project.title}.</h1>
          <p>{project.description || "Placeholder case study intro. Add the company, role, scope, timeline, team, and product context here."}</p>
          {project.meta && (
            <section className="case-glance case-hero-glance" aria-labelledby={`${project.slug}-at-a-glance`}>
              <h2 id={`${project.slug}-at-a-glance`}>At a Glance</h2>
              <dl>
                {project.meta.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </header>

      <div className="case-body">
        <div className="case-layout wrap">
          {pageSections.map((section, index) => (
            <section className="case-section" id={sectionId(section)} key={section.title}>
              <div className="case-section-copy">
                <div className="case-section-title">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{section.title}.</h2>
                </div>
                {section.body?.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.modules ? (
                <div className="platform-modules">
                  {section.modules.map(([title, copy, placeholder]) => (
                    <article className="platform-module" key={title}>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                      <div className="case-image">{placeholder}</div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="case-image-stack">
                  {(section.images || ["image placeholder"]).map((placeholder, imageIndex) => (
                    <div className="case-image" key={`${section.title}-${imageIndex}`}>{placeholder}</div>
                  ))}
                </div>
              )}
            </section>
          ))}

          <section className="more-works" aria-labelledby="more-works-heading">
            <div className="more-works-head">
              <span className="eyebrow">More works</span>
              <h2 className="display" id="more-works-heading">More works.</h2>
              <span className="more-count">{String(projects.length - 1).padStart(2, "0")}</span>
            </div>
            <div className="more-work-list">
              {projects.filter(item => item.id !== project.id).map(item => (
                <button className="more-work-card" key={item.id} type="button" onClick={() => onSelectProject(item)}>
                  <span>{item.id}</span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </button>
              ))}
            </div>
            <button className="case-view-all" type="button" onClick={onBack}>View all works</button>
          </section>
        </div>
      </div>

      <aside className="case-floating-nav" aria-label="Case study sections">
        {pageSections.map(section => (
          <a className={activeSection === section.title ? "active" : ""} href={`#${sectionId(section)}`} key={section.title}>{section.title}</a>
        ))}
      </aside>
    </main>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const findProjectFromHash = () => {
    const slug = window.location.hash.replace("#case-", "")
    return slug ? projects.find(project => project.slug === slug) || null : null
  }
  const [activeProject, setActiveProject] = useState(() => findProjectFromHash())
  const ticker = useMemo(() => [...tickerWords, ...tickerWords], [])

  useScrollReveal(loaded)
  useGsapScrollTransitions(loaded)
  useCursorInteractions(loaded && !activeProject)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1900)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return undefined

    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle("is-loading", !loaded)
    return () => document.body.classList.remove("is-loading")
  }, [loaded])

  useEffect(() => {
    const syncProjectFromUrl = () => setActiveProject(findProjectFromHash())

    window.addEventListener("hashchange", syncProjectFromUrl)
    window.addEventListener("popstate", syncProjectFromUrl)
    return () => {
      window.removeEventListener("hashchange", syncProjectFromUrl)
      window.removeEventListener("popstate", syncProjectFromUrl)
    }
  }, [])

  const openProject = project => {
    setLoaded(true)
    setActiveProject(project)
    window.history.pushState(null, "", `#case-${project.slug}`)
  }

  const goHome = (target = "") => {
    setLoaded(true)
    jumpToPortfolioTarget()
    setActiveProject(null)
    window.history.pushState(null, "", target || "/")
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        jumpToPortfolioTarget(target)
        window.setTimeout(() => jumpToPortfolioTarget(target), 120)
        window.setTimeout(() => jumpToPortfolioTarget(target), 900)
        ScrollTrigger.refresh()
      })
    })
  }

  if (activeProject) {
    return <CaseStudyPage project={activeProject} onBack={goHome} onSelectProject={openProject} />
  }

  return (
    <>
      <div className="cursor-aura" aria-hidden="true" />
      <div id="loader" className={loaded ? "loader-exit" : ""} onClick={() => setLoaded(true)}>
        <div className="sig-wrap">
          <span className="sig">Bodede Dolapo</span>
        </div>
        <div className="sign">Product Designer</div>
      </div>

      <PortfolioNav />

      <div className="ticker">
        <div className="ticker-track">
          {ticker.map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </div>
      </div>

      <header className={`hero ${loaded ? "hero-ready" : ""}`} id="heroSection" data-section>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              Designing what’s next.
            </span>
            <h1 className="display">
              <span className="line"><span>Designing products for humans, building with AI.</span></span>
            </h1>
          </div>
          <div className="hero-scroll-art" data-cursor-depth="10">
            <div className="scroll-paper">
              <h6>About me</h6>
              <p>I’m Appipiah, a product designer who turns complex systems into clear, human experiences. I’m endlessly curious about how things work—and I love using design, systems thinking, and AI to build products people genuinely enjoy using.</p>
            </div>
            <svg className="portrait-arrow" viewBox="0 0 180 120" aria-hidden="true">
              <path d="M18 18c40 30 72 34 102 20 27-13 44 2 36 29-7 25-32 33-55 28" />
              <path d="m107 80-8 16 18 1" />
            </svg>
            <figure className="portrait-polaroid" data-cursor-depth="5">
              <img src="/assets/appipiah-portrait.jpg" alt="Portrait of Appipiah" />
            </figure>
          </div>
        </div>
      </header>

      <section className="section paper-section" id="work" data-section>
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow">Not so boring parts</span>
              <h2 className="display">Selected works.</h2>
            </div>
          </div>
          <div className="work-list">
            {projects.map(project => (
              <button className="work-item" data-reveal key={project.id} type="button" onClick={() => openProject(project)} aria-label={`${project.title} project preview`}>
                <div className="work-visual">
                  <div className="work-card-inner">
                    <div className="work-card-face work-front"><span className="visual-label">image preview</span></div>
                    <div className="work-card-face work-back">
                      {project.meta ? (
                        <div className="work-glance">
                          <span>AT A GLANCE</span>
                          <dl>
                            {project.meta.map(([label, value]) => (
                              <div key={label}>
                                <dt>{label}</dt>
                                <dd>{value}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      ) : (
                        <>
                          <span>metadata</span>
                          <b>Role / timeline / tools</b>
                          <small>Format coming later.</small>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="work-meta">
                  <h3>{project.title}</h3>
                  <div className="work-desc">
                    <p>{project.description}</p>
                  </div>
                  <span className="work-cta">View case study</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper-section" id="about" data-section>
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow">Stack</span>
              <h2 className="display">Tools I actually use.</h2>
            </div>
          </div>
          <div className="toolkit-cloud" id="tools" data-reveal>
            {tools.map(tool => (
              <span className="chip" key={tool.name}>
                <ToolLogo type={tool.logo} />
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="contact" data-section>
        <div className="wrap contact-grid" data-reveal>
          <div>
            <span className="eyebrow">Get In Touch</span>
            <h2 className="display">Got a cool project, reach out.</h2>
            <div className="cta-ctas">
              <a className="about-link resume-link" href="https://docs.google.com/document/d/1pVbIt1Cxmym9DcsxW6L6BseUvCa4z8zyPJtKUNf4ZuM/edit?usp=sharing" target="_blank" rel="noreferrer">Download resume</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer data-reveal>
        <div className="wrap">
          <span className="fine">© 2026 Bodede Dolapo.</span>
        </div>
      </footer>
    </>
  )
}

export default App
