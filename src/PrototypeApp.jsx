import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Lock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const tickerWords = [
  "AI-NATIVE",
  "USER-OBSESSED",
  "DESIGN SYSTEMS",
  "OPEN TO BIG IDEAS",
  "CAFFEINATED",
]

const heroAboutCopy = "Over the past three years, I've helped startups design and ship products in fast-moving environments where clarity, speed, and ownership matter. I enjoy simplifying complex workflows, building scalable systems, and making sense of unfamiliar domains to create products that have a meaningful impact on the people using them. The more ambitious the problem, the more excited I get."

const savedAboutNote = {
  heading: "A Little About Me",
  body: heroAboutCopy,
}

const givMeta = [
  ["Industry", "Healthcare"],
  ["Product", "B2B SaaS"],
  ["Platform", "Desktop web & Mobile"],
  ["Year", "2026"],
]

const givHoverMeta = [
  ["Industry", "Healthcare"],
  ["Product", "B2B SaaS"],
  ["Last worked on", "July, 2026"],
  ["Tools", "Figma (Design and Make), GPT, Claude, Confluence"],
]

const givProcessHeadings = new Set([
  "Treating feedback as a symptom, not a specification",
  "Starting from how caregivers think, not how the system stores it",
])

const excelMindMeta = [
  ["Industry", "EdTech"],
  ["Product", "B2B SaaS"],
  ["Last worked on", "Feb 2025"],
  ["Tools", "Figma"],
]

const excelMindHoverMeta = [
  ["Industry", "EdTech"],
  ["Product", "B2B SaaS"],
  ["Last worked on", "Feb 2025"],
  ["Tools", "Figma"],
]

const placeholderHoverMeta = [
  ["Industry", "Coming soon"],
  ["Product", "Coming soon"],
  ["Last worked on", "Coming soon"],
  ["Tools", "Coming soon"],
]

const givSections = [
  {
    title: "There is no Giv without shifts",
    label: "Overview",
    body: [
      "Giv helps US agencies supporting people with intellectual and developmental disabilities manage their day-to-day operations.",
      "Scheduling sits at the centre of it. A shift connects caregivers, clients, charting, geofencing, compliance, billing and payroll. There was no Giv without it.",
      "I was the designer responsible for improving that experience across the agency platform and caregiver app, working with a PM and a team of engineers.",
    ],
  },
  {
    title: "The cracks started to show.",
    label: "Problem",
    body: [
      "As Giv onboarded agencies, Scheduling became a recurring source of questions.",
      "The legacy experience was buggy and difficult to understand. Customer Support was doing a lot of the work the product should have been doing — recording walkthroughs and spending longer onboarding sessions explaining how to use it.",
      "And even that wasn't always enough.",
      "## ***If scheduling didn’t work, we didn’t get customers.***",
      "It needed an overhaul.",
      "{images}",
    ],
  },
  {
    title: "Four things made this harder than it looks",
    label: "How I worked",
    body: [
      "## **01 - Everything was connected**",
      "A shift wasn't just a calendar entry. It connected caregiver availability, client budgets, certifications, overtime, documentation and payroll. A change in one place could affect several other workflows.",
      "**So I thought in systems before screens.** Before changing anything, I mapped its dependencies and downstream effects — catching conflicts while they were still cheap to fix, rather than after implementation.",
      "## **02 - I couldn’t watch users use it**",
      "HIPAA restrictions limited my access to customer meetings and usability sessions. Feedback reached me through customer-facing teams, often already framed as a requested solution.",
      "**So I treated feedback as a symptom, not a specification.** I traced the workflow around each reported pain point to find the actual problem before deciding what to design.",
      "## **03 - The same product had to work for very different agencies**",
      "Agencies varied in size, staffing model and tech confidence. I couldn't design exclusively for power users or beginners.",
      "**So I kept the complexity underneath.** I kept the core flows clear and used conditional logic and timely feedback to surface information when it became relevant, instead of making users hold the entire system in their heads.",
      "## **04 - Competitor products were hidden behind paywalls**",
      "Most comparable products were paid or closed, so I couldn’t freely explore how other platforms handled similar scheduling problems.",
      "**So I got scrappy with what I could access.** I used product demos, and YouTube walkthroughs to understand unfamiliar workflows, then used AI to explore possible solutions quickly.",
      "Once I had a direction, I built it in Figma Make with Engineering so we could discuss behaviour and feasibility against something working.",
      "{images}",
    ],
  },
  {
    title: "First, I rebuilt the calendar interface.",
    label: "Solutions",
    body: [
      "I started by collapsing shift details to keep the calendar clean, then reversed course when feedback showed me the flaw: schedulers were managing both staff and clients across busy agencies, and hiding information made the calendar harder to scan.",
      "I brought the important information forward, added richer hover cards and filters, and designed parallel staff and client views schedulers could move between without losing their place. I also created a visual language for every shift across desktop and mobile: **colour showed status, border showed whether it was regular, open or staff-only.** The rule scaled across agency sizes and became a reusable design-system pattern.",
      "{images}",
    ],
  },
  {
    title: "Next, I tackled the hardest part: creating a shift",
    body: [
      "This was where the entire scheduling model collided. I brought recurrence, availability, work-hour limits, budget conflicts, overlaps and agency settings into one modal. It inferred shift type from who was added, supported drag-and-drop and manual assignment, blocked invalid shifts early, and surfaced conflicts while schedulers were adding people.",
      "**Where I traded precision for performance**",
      "I wanted the conflict type visible inside the people selector. It would have cost an API call for every person listed, so I worked with the engineers to move the explanation to the point of assignment instead.",
      "{images}",
    ],
  },
  {
    title: "Then I designed for the shift itself, not just the schedule",
    body: [
      "I designed the caregiver's mobile shift experience around shift types and statuses, giving each its own layout. Caregivers use the same screen to clock in, provide services, chart, take breaks and complete their shifts, so I let the interface change with the work — bringing forward what mattered at each stage and prioritising the caregiver's assigned hours over the wider shift window.",
      "**Noteworthy:** I went looking through App Store reviews and found caregivers couldn't tell how many hours they'd worked or when they were heading into overtime. I fixed the display and added a flag warning them when claiming an open shift would push them over.",
      "{images}",
    ],
  },
  {
    title: "And finally, for the moments when plans changed",
    body: [
      "Caregiving rarely follows the schedule perfectly. People take time off, drop shifts and record the wrong hours. I designed each request across the caregiver app and admin platform so the change didn't end at submission — it returned to Scheduling, where its effect could be resolved.",
      "## **When caregivers dropped shifts, I designed for coverage.**",
      "I required caregivers to explain why they were dropping a shift, giving admins the context to approve, reject or reassign it instead of treating it like a cancellation.",
      "Reassignment reused the conflict handling from Shift Creation, so closing one coverage gap didn't quietly open another.",
      "{images}",
      "## **Time corrections became reviewable**",
      "I let caregivers correct completed shifts, edit submitted requests and track their status. Admins could review, edit, approve or reject each correction before it affected Payroll and billing.",
      "I also explored an audit trail to keep accepted corrections traceable and avoid compliance risk, but it was later descoped following technical review.",
      "{images}",
      "## **Time off exposed a gap between Payroll and Scheduling**",
      "The payroll team had built time off around duration, which couldn't reliably tell a scheduler which shifts would be affected. I added a time input to the caregiver request, then showed admins either the affected or potentially affected shifts, depending on how the request was submitted.",
      "Admins could reassign the caregiver, open the shift or remove them directly from the request, using the familiar shift-editing workflow.",
      "**Catching that a neighbouring team's model was right for them and wrong for us — and designing the missing half rather than escalating it — is the part of this project I'm most pleased with.**",
      "{images}",
    ],
  },
  {
    title: "Where it landed",
    label: "Outcomes",
    body: [
      "## ***Scheduling-related support tickets dropped by 90%.***",
      "They had effectively disappeared by the time I left. Scheduling was no longer a support problem.",
      "User testing and sales conversations also showed strong demand before launch, with agencies already in the pipeline.",
      "The foundation held as Scheduling grew: new features fit without disrupting the experience or reinventing its patterns.",
      "My teammates also commended my proactiveness and ability to catch edge cases missing from the PRD — recognition that felt especially meaningful to me.",
    ],
  },
  {
    title: "I left with a different way of thinking about design.",
    label: "Reflections",
    body: [
      "Pushing back is part of the job, but only when you lead with a smaller and more coherent version — not simply reasons why the request is wrong.",
      "Working closely with Engineering reinforced that design decisions have a cost somewhere else in the system, and knowing where that cost lands makes work sharper, not smaller.",
      "The more interconnected the system, the greater the responsibility to make it feel simple. The complexity isn't the user's job to carry.",
    ],
  },
]

const apexHoverMeta = [
  ["Industry", "Motorsport"],
  ["Product", "B2C + Internal tools"],
  ["Last worked on", "August 2026 (ONGOING)"],
  ["Tools", "Figma · Claude · Codex · GitHub"],
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
    slug: "giv",
    title: "Giv Healthcare",
    siteUrl: "https://givhealthcare.com/",
    year: "[Add dates]",
    description: "Rebuilding scheduling for healthcare agencies that care for people with IDD",
    exactDoc: true,
    thumbnail: "/assets/giv-overview.mp4",
    thumbnailType: "video",
    thumbnailPosition: "50% 42%",
    thumbnailScale: 1.18,
    eyebrow: "PRODUCT DESIGN · HEALTHCARE · B2B SAAS",
    meta: givMeta,
    hoverMeta: givHoverMeta,
    sections: givSections,
  },
  {
    id: "02",
    slug: "excelmind",
    title: "ExcelMind",
    year: "2025-2026",
    description: "Designing a unified B2B platform for school administration and learning.",
    thumbnail: "/assets/excelmind-thumbnail.mp4",
    thumbnailType: "video",
    eyebrow: "PRODUCT DESIGN · EDTECH · B2B SAAS",
    meta: excelMindMeta,
    hoverMeta: excelMindHoverMeta,
    sections: excelMindSections,
  },
  {
    id: "03",
    slug: "apex-velociti",
    title: "Apex Velociti",
    year: "2026",
    description: "Designing the digital platform behind a professional karting circuit.",
    hoverMeta: apexHoverMeta,
    locked: true,
  },
  { id: "04", slug: "project-four", title: "heading", year: "2026", description: "coming soon", hoverMeta: placeholderHoverMeta },
]

const caseStudySections = [
  "Overview",
  "Product parts",
  "Internal tools",
  "Mobile app",
  "Website",
  "Outcome",
]

const designStack = [
  ["Research", ["ChatGPT", "Claude", "Gemini"]],
  ["Design", ["Figma", "Figma Make"]],
  ["Prototype", ["Claude", "Codex", "Antigravity"]],
  ["Deploy", ["GitHub", "Vercel"]],
  ["Collaborate", ["Notion", "Confluence", "Jira"]],
]

// Tools without an entry keep the diamond bullet instead of borrowing a
// parent brand's mark. Antigravity has no icon available.
const toolLogos = {
  ChatGPT: "chatgpt",
  Codex: "chatgpt",
  Claude: "claude",
  Gemini: "googlegemini",
  Figma: "figma",
  "Figma Make": "figma",
  GitHub: "github",
  Vercel: "vercel",
  Notion: "notion",
  Confluence: "confluence",
  Jira: "jira",
}

const resumePreviewUrl = "https://docs.google.com/document/d/1pVbIt1Cxmym9DcsxW6L6BseUvCa4z8zyPJtKUNf4ZuM/edit?usp=sharing"
const resumeDownloadUrl = "https://docs.google.com/document/d/1pVbIt1Cxmym9DcsxW6L6BseUvCa4z8zyPJtKUNf4ZuM/export?format=pdf"

const CASE_HASH_PREFIX = "#case-"

// The hash carries two different things: the case study route ("#case-giv") and
// in-page section anchors within a case study ("#giv-my-role"). Both have to
// resolve to the same project, otherwise following a section link reads as
// "no project" and drops the reader back on the home page.
function findProjectFromHash() {
  const hash = window.location.hash

  if (hash.startsWith(CASE_HASH_PREFIX)) {
    const slug = hash.slice(CASE_HASH_PREFIX.length)
    return projects.find(project => project.slug === slug) || null
  }

  return projects.find(project => hash.startsWith(`#${project.slug}-`)) || null
}

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
        <input name="name" value={form.name} onChange={updateField} placeholder="Your name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" value={form.email} onChange={updateField} placeholder="Your email" required />
      </label>
      <label className="full">
        <span>Message</span>
        <textarea name="message" value={form.message} onChange={updateField} placeholder="Tell me about your project" required />
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

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="2" rx="1" />
      <rect x="3" y="11" width="18" height="2" rx="1" />
      <rect x="3" y="16" width="18" height="2" rx="1" />
    </svg>
  )
}

function PortfolioNav({ onNavigateHome }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const toggleRef = useRef(null)

  const navigateHome = (target = "") => {
    setMenuOpen(false)

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

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnEscape = event => {
      if (event.key !== "Escape") return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }

    const closeOnOutsideClick = event => {
      if (navRef.current?.contains(event.target)) return
      setMenuOpen(false)
    }

    document.addEventListener("keydown", closeOnEscape)
    document.addEventListener("pointerdown", closeOnOutsideClick)
    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      document.removeEventListener("pointerdown", closeOnOutsideClick)
    }
  }, [menuOpen])

  return (
    <nav className={menuOpen ? "nav-menu-open" : ""} ref={navRef}>
      <div className="wrap">
        <div className="brand">
          Bodede Dolapo <span className="nick">(Appipiah)</span>
        </div>
        <ul id="nav-menu">
          <li><button className="nav-link" type="button" onClick={() => navigateHome()}>Home</button></li>
          <li><button className="nav-link" type="button" onClick={() => navigateHome("#work")}>Work</button></li>
          <li><a href="https://docs.google.com/document/d/1pVbIt1Cxmym9DcsxW6L6BseUvCa4z8zyPJtKUNf4ZuM/edit?usp=sharing" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Resume</a></li>
          <li><span className="nav-disabled" aria-disabled="true">Playground (coming soon)</span></li>
        </ul>
        <div className="nav-actions">
          <a className="icon-btn linkedin-btn" href="https://www.linkedin.com/in/bodededolapo/" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <button
            className="icon-btn nav-toggle"
            type="button"
            ref={toggleRef}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen(open => !open)}
          >
            <HamburgerIcon />
          </button>
        </div>
      </div>
    </nav>
  )
}

// Real media for the doc-exact case study, keyed by section title and ordered to
// match that section's {images} markers. A section with media but no marker gets
// it appended after the copy.
const givSectionMedia = {
  "There is no Giv without shifts": [
    { type: "image", src: "/assets/giv-overview-image.png", alt: "Giv mobile dashboard overview" },
  ],
  "The cracks started to show.": [
    { type: "image", src: "/assets/giv-role-image.png", alt: "Giv scheduling calendar on desktop and mobile" },
  ],
  "Four things made this harder than it looks": [
    {
      type: "horizontal-scroll",
      items: [
        {
          src: "/assets/giv-challenge-recurring-shifts-spec.png",
          alt: "Recurring shift specification document",
          caption: "Breaking down recurring shift logic for the devs. This got detailed very quickly.",
        },
        {
          src: "/assets/giv-challenge-youtube-demo.png",
          alt: "YouTube demo research reference",
          caption: "Learning a competitor feature from a YouTube demo because the actual product was behind a paywall. \u{1F642}",
        },
        {
          src: "/assets/giv-challenge-descoped-screens.png",
          alt: "Descoped audit log screens",
          caption: "Designed an audit log for tracking who managed a request. It got descoped.",
        },
      ],
    },
  ],
}

function renderInlineEmphasis(text, { inHeading = false } = {}) {
  return text.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*)/g).map((part, index) => {
    // Headings already carry weight from their own style, so one layer of the
    // doc's bold is dropped there: ***x*** becomes italic, **x** becomes plain.
    if (part.startsWith("***") && part.endsWith("***")) {
      const inner = part.slice(3, -3)
      return inHeading ? <em key={index}>{inner}</em> : <strong key={index}><em>{inner}</em></strong>
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2)
      return inHeading ? inner : <strong key={index}>{inner}</strong>
    }

    return part
  })
}

// Splits a section body into alternating copy and media blocks so an {images}
// marker breaks out of the narrow copy column at the position the doc puts it.
function splitSectionChunks(body = [], media = []) {
  const chunks = []
  let slot = 0

  body.forEach(item => {
    if (item === "{images}") {
      chunks.push({ type: "images", items: [], media: media[slot] })
      slot += 1
      return
    }

    const last = chunks[chunks.length - 1]

    if (last && last.type === "copy") {
      last.items.push(item)
    } else {
      chunks.push({ type: "copy", items: [item] })
    }
  })

  // media supplied for a section the doc gives no {images} marker for
  while (slot < media.length) {
    chunks.push({ type: "images", items: [], media: media[slot] })
    slot += 1
  }

  return chunks
}

function renderCaseMedia(media, keyBase) {
  if (!media) {
    return <div className="case-image">{"{images}"}</div>
  }

  if (media.type === "horizontal-scroll") {
    return (
      <div className="case-horizontal-scroll" aria-label="Research artifacts">
        <div className="case-horizontal-track">
          {[...media.items, ...media.items].map((item, itemIndex) => (
            <figure className="case-horizontal-item" key={`${keyBase}-${item.src}-${itemIndex}`}>
              <img src={item.src} alt={item.alt} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="case-image">
      <img src={media.src} alt={media.alt} />
    </div>
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
    // Opening a case study starts at the top, but a link straight to one of its
    // sections should land on that section instead of being scrolled away.
    const deepLinked = pageSections.find(section => window.location.hash === `#${sectionId(section)}`)

    if (deepLinked) {
      setActiveSection(deepLinked.title)
      document.getElementById(sectionId(deepLinked))?.scrollIntoView({ behavior: "auto", block: "start" })
      return
    }

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

  const activeGroup = (() => {
    let current = null

    for (const section of pageSections) {
      if (section.label) current = section.title
      if (section.title === activeSection) return current
    }

    return current
  })()

  return (
    <main className="case-page">
      <PortfolioNav onNavigateHome={onBack} />

      <header className="case-hero">
        <div className="wrap case-hero-inner">
          <span className="eyebrow">Case study</span>
          {project.exactDoc ? (
            <>
              <p className="case-hero-org">
                {project.title}
                {project.siteUrl && (
                  <a href={project.siteUrl} target="_blank" rel="noreferrer">Visit site ↗</a>
                )}
              </p>
              <h1>{project.description}</h1>
            </>
          ) : (
            <>
              <h1>{`${project.title}.`}</h1>
              <p>{project.description || "Placeholder case study intro. Add the company, role, scope, timeline, team, and product context here."}</p>
            </>
          )}
          {project.meta && (
            <section className="case-glance case-hero-glance" aria-label={`${project.title} metadata`}>
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
              {project.exactDoc ? (
                splitSectionChunks(section.body, givSectionMedia[section.title]).map((chunk, chunkIndex) => (
                  chunk.type === "images" ? (
                    <div className="case-image-stack" key={`${section.title}-media-${chunkIndex}`}>
                      {renderCaseMedia(chunk.media, `${section.title}-${chunkIndex}`)}
                    </div>
                  ) : (
                    <div className="case-section-copy" key={`${section.title}-copy-${chunkIndex}`}>
                      {chunkIndex === 0 && (
                        <div className="case-section-heading">
                          {section.label && <span className="case-section-label">{section.label}</span>}
                          <div className="case-section-title">
                            <h4>{section.title}</h4>
                          </div>
                        </div>
                      )}
                      {chunk.items.map(item => (
                        item.startsWith("## ") ? (
                          <h5 className="case-body-subheading" key={item}>{renderInlineEmphasis(item.slice(3), { inHeading: true })}</h5>
                        ) : (
                          <p key={item}>{renderInlineEmphasis(item)}</p>
                        )
                      ))}
                    </div>
                  )
                ))
              ) : (
              <div className="case-section-copy">
                <div className="case-section-title">
                  {/^\d/.test(section.title) ? null : <span>{String(index + 1).padStart(2, "0")}</span>}
                  <h4>{section.title}.</h4>
                </div>
                {section.body?.map(paragraph => (
                  givProcessHeadings.has(paragraph) ? (
                    <h5 className="case-body-subheading" key={paragraph}>{paragraph}</h5>
                  ) : paragraph.startsWith("Note:") ? (
                    <p className="case-note" key={paragraph}>{paragraph}</p>
                  ) : (
                    <p key={paragraph}>{paragraph}</p>
                  )
                ))}
              </div>
              )}
              {section.modules ? (
                <div className="platform-modules">
                  {section.modules.map(([title, copy, placeholder]) => (
                    copy ? (
                      <article className="platform-module" key={title}>
                        <h6>{title}</h6>
                        {copy.split("\n\n").map((paragraph, paragraphIndex) => {
                          const lead = paragraph.match(/^(The challenge\.|My approach\.)\s+([\s\S]+)$/)

                          if (lead) {
                            return (
                              <p key={paragraph}>
                                <strong className="module-lead">{lead[1]}</strong> {lead[2]}
                              </p>
                            )
                          }

                          return (
                            <p className={paragraphIndex === 0 ? "module-lede" : ""} key={paragraph}>{paragraph}</p>
                          )
                        })}
                        <div className={`case-image ${typeof placeholder === "object" && placeholder.className ? placeholder.className : ""}`}>
                          {typeof placeholder === "object" && placeholder.type === "video" ? (
                            <video
                              src={placeholder.src}
                              aria-label={placeholder.label}
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                          ) : (
                            placeholder
                          )}
                        </div>
                      </article>
                    ) : (
                      <h5 className="platform-group" key={title}>{title}</h5>
                    )
                  ))}
                </div>
              ) : project.exactDoc ? null : (
                <div className="case-image-stack">
                  {(section.images || ["image placeholder"]).map((media, imageIndex) => (
                    typeof media === "object" && media.type === "horizontal-scroll" ? (
                      <div className="case-horizontal-scroll" aria-label="Challenge research artifacts" key={`${section.title}-${imageIndex}`}>
                        <div className="case-horizontal-track">
                          {[...media.items, ...media.items].map((item, itemIndex) => (
                            <figure className="case-horizontal-item" key={`${item.src}-${itemIndex}`}>
                              <img
                                src={item.src}
                                alt={item.alt}
                              />
                              <figcaption>{item.caption}</figcaption>
                            </figure>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={`case-image ${typeof media === "object" && media.className ? media.className : ""}`} key={`${section.title}-${imageIndex}`}>
                        {typeof media === "object" && media.type === "image" ? (
                          <img src={media.src} alt={media.alt} />
                        ) : typeof media === "object" && media.type === "video" ? (
                          <video
                            src={media.src}
                            aria-label={media.label}
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          media
                        )}
                      </div>
                    )
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
                  <div className="more-work-thumb">
                    {item.thumbnail && item.thumbnailType === "video" ? (
                      <video
                        src={item.thumbnail}
                        aria-label={`${item.title} thumbnail`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          objectPosition: item.thumbnailPosition || "50% 50%",
                          "--thumb-scale": item.thumbnailScale || 1,
                        }}
                      />
                    ) : item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={`${item.title} thumbnail`}
                        style={{ objectPosition: item.thumbnailPosition || "50% 50%" }}
                      />
                    ) : (
                      <span>{item.id}</span>
                    )}
                  </div>
                  <div className="more-work-meta">
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </div>
                </button>
              ))}
            </div>
            <button className="case-view-all" type="button" onClick={onBack}>View all works</button>
          </section>
        </div>
      </div>

      <aside className="case-floating-nav" aria-label="Case study sections">
        {pageSections.filter(section => section.label).map(section => (
          <a className={activeGroup === section.title ? "active" : ""} href={`#${sectionId(section)}`} key={section.title}>{section.label || section.title}</a>
        ))}
      </aside>
    </main>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const [activeProject, setActiveProject] = useState(() => findProjectFromHash())
  const ticker = useMemo(() => [...tickerWords, ...tickerWords], [])

  // Leaving a case study remounts the whole home page, so these have to re-run
  // against the new nodes. Keyed on `loaded` alone they would keep observing the
  // discarded elements and the returning home page would stay blank.
  const showingHome = loaded && !activeProject

  useScrollReveal(showingHome)
  useGsapScrollTransitions(showingHome)
  useCursorInteractions(showingHome)

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
            <h3 className="display hero-title">
              <span className="line"><span>I don't just design products. I help teams figure them out.</span></span>
            </h3>
            <p className="hero-body">{heroAboutCopy}</p>
          </div>
          <div className="hero-portrait-wrap" data-cursor-depth="10" aria-label={savedAboutNote.heading}>
            <span className="eyebrow hero-eyebrow">
              DESIGNING WHAT'S NEXT
            </span>
            <figure className="portrait-polaroid hero-polaroid" data-cursor-depth="5">
              <img src="/assets/appipiah-portrait.jpg" alt="Portrait of Appipiah" />
            </figure>
          </div>
        </div>
      </header>

      <section className="section paper-section" id="work" data-section>
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div>
              <span className="eyebrow">The not so boring parts</span>
              <h2 className="display">Selected works.</h2>
            </div>
          </div>
          <div className="work-list">
            {projects.map(project => (
              <button
                className={`work-item ${project.locked ? "is-locked" : ""}`}
                data-reveal
                key={project.id}
                type="button"
                onClick={() => {
                  if (!project.locked) openProject(project)
                }}
                aria-disabled={project.locked ? "true" : "false"}
                aria-label={`${project.title} project preview`}
              >
                <div className="work-visual">
                  <div className="work-card-inner">
                    <div className="work-card-face work-front">
                      {project.thumbnail && project.thumbnailType === "video" ? (
                        <video
                          className="work-thumbnail work-thumbnail-video"
                          src={project.thumbnail}
                          aria-label={`${project.title} thumbnail`}
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{
                            objectPosition: project.thumbnailPosition || "50% 50%",
                            "--thumb-scale": project.thumbnailScale || 1,
                          }}
                        />
                      ) : project.thumbnail ? (
                        <img
                          className="work-thumbnail"
                          src={project.thumbnail}
                          alt={`${project.title} thumbnail`}
                          style={{ objectPosition: project.thumbnailPosition || "50% 50%" }}
                        />
                      ) : (
                        <span className="visual-label">image preview</span>
                      )}
                    </div>
                    <div className="work-card-face work-back">
                      {project.hoverMeta ? (
                        <div className="work-glance">
                          <span>AT A GLANCE</span>
                          <dl>
                            {project.hoverMeta.map(([label, value]) => (
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
                  <span className="work-cta">
                    {project.locked && <Lock aria-hidden="true" />}
                    {project.locked ? "Coming soon" : "View case study"}
                  </span>
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
              <span className="eyebrow">My co-pilots</span>
              <h2 className="display">Design Stack.</h2>
            </div>
          </div>
          <div className="toolkit-cloud" id="tools" data-reveal>
            {designStack.map(([category, stack]) => (
              <article className="chip stack-card" key={category}>
                <h3>{category}</h3>
                <ul>
                  {stack.map(tool => (
                    <li className={toolLogos[tool] ? "has-logo" : ""} key={tool}>
                      {toolLogos[tool] ? (
                        <img className="tool-logo" src={`/assets/logos/${toolLogos[tool]}.svg`} alt="" aria-hidden="true" width="18" height="18" loading="lazy" />
                      ) : null}
                      {tool}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="contact" data-section>
        <div className="wrap contact-shell" data-reveal>
          <div className="contact-head">
            <span className="eyebrow">Get In Touch</span>
            <h2 className="display">Got a cool project? Tell me about it.</h2>
          </div>
          <div className="contact-story">
            <ContactForm />
            <div className="resume-bridge" aria-hidden="true">
              <span>Need to know more first?</span>
              <svg viewBox="0 0 180 92">
                <path d="M12 48c32-30 72-42 112-18 20 12 28 29 22 42" />
                <path d="m132 62 15 12 5-19" />
              </svg>
            </div>
            <aside className="resume-preview" aria-label="Resume preview">
              <a className="resume-page-preview" href={resumePreviewUrl} target="_blank" rel="noreferrer" aria-label="Open full resume">
                <img src="/assets/resume-preview-page-1.png" alt="First page preview of Bodede Dolapo's resume" />
              </a>
              <div className="resume-actions">
                <a className="resume-open" href={resumePreviewUrl} target="_blank" rel="noreferrer">Open Resume →</a>
                <a className="resume-download" href={resumeDownloadUrl} target="_blank" rel="noreferrer">Download PDF</a>
              </div>
            </aside>
          </div>
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
