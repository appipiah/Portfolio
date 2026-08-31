import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Lock } from "lucide-react"
import ProductGuideDemo from "./ProductGuideDemo"

gsap.registerPlugin(ScrollTrigger)

const tickerWords = [
  "AI-NATIVE",
  "USER-OBSESSED",
  "DESIGN SYSTEMS",
  "OPEN TO BIG IDEAS",
  "CAFFEINATED",
]

const heroAboutCopy = [
  "Three years of B2B and consumer product design, rooted in deep experience in healthcare operations alongside edtech and fintech.",
  "I thrive where the rules are the hard part—tackling dense workflows, compliance, and complex edge cases. I think in systems before screens, leveraging AI to build a shared language with engineering.",
  "The more ambitious the problem, the more excited I get.",
]

const savedAboutNote = {
  heading: "A Little About Me",
  body: heroAboutCopy.join(" "),
}

const givMeta = [
  ["Industry", "Healthcare"],
  ["Product", "B2B SaaS"],
  ["Platform", "Web (desktop) & Mobile"],
  ["Year", "2026"],
]

const givHoverMeta = [
  ["Industry", "Healthtech"],
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
    title: "Four things that shaped how I worked",
    label: "Approach",
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
      "I brought the important information forward, added richer hover cards and filters, and designed parallel staff and client views schedulers could move between without losing their place. I also created a visual language for every shift across desktop and mobile. **Colour carried status, border carried type — regular, open or staff-only; markers said what needed attention — recurrence, conflicts, pending requests.** The rule scaled across agency sizes and became a reusable design-system pattern.",
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
    title: "ExcelMind stopped selling to students and started selling to schools.",
    label: "Overview",
    body: [
      "ExcelMind began as an AI-powered exam preparation platform — past questions and AI-generated practice for WAEC, UTME, GCE and NECO.",
      "The consumer subscription model was hard to scale financially, so the business pivoted to B2B. That meant building a complete digital platform for schools: administration, teaching, learning and examinations in one system.",
      "I designed the Administrative Dashboard, the Learning Management System, and the internal examination upload portal — and set up the shared design foundations the team built on.",
    ],
    images: ["{image}"],
  },
  {
    title: "A school isn't a set of features. It's one system.",
    label: "Challenges",
    body: [
      "**Almost nothing stood on its own.** Attendance didn't just record who showed up — it fed report cards and promotion decisions. Timetables determined what teachers and students saw in the LMS each day. Grading systems and class structures shaped how almost every other module behaved.",
      "**Engineering was already building.** Parts of the platform were in development before design caught up, so there was little room for major redesigns.",
      "**No room for iteration.** I couldn't rely on implementation to expose gaps, so I worked through every workflow, state, permission level, empty state, error state and alternate path before handing over. More work upfront — but it reduced ambiguity, surfaced edge cases early, and let engineering move with confidence.",
    ],
  },
  {
    title: "Three rules I designed by.",
    label: "Approach",
    body: [
      "**01 — Follow the data, not the screen.** Before opening Figma I broke each feature into workflows and traced what it touched. Linking teachers to their subjects and assigned classes meant timetable creation could surface only valid options instead of asking someone to remember the rules.",
      "**02 — Configure, don't prescribe.** Wherever schools differed, I designed for setup rather than assumption — academic structures, grading systems, fee schedules and promotion requirements are things a school defines, not things the product decides.",
      "**03 — Make it lighter than the work.** School administration is long hours of repetitive tasks. I used colour and spacing deliberately so the platform felt lighter than the job it supported.",
      "Underneath all three: use what's proven, improve what can be better, and create something new only when the problem genuinely requires it. I studied Gradely and Google Classroom rather than inventing patterns schools would have to learn.",
    ],
  },
  {
    title: "The Administrative Dashboard",
    label: "Solutions",
    body: [
      "*I designed the Learning Management System and the internal examination upload portal as well. This section covers the Administrative Dashboard only.*",
      "## **01 — A school defines itself before anything else works.**",
      "Onboarding walks a school through its own structure: classes, grading systems, fee schedules, promotion requirements. User management holds the people and the links between them — a teacher to the subjects and classes they take, a parent to several children across different years.",
      "## **02 — The term runs on what was set up.**",
      "Timetabling turns those assignments into the schedule, offering only teachers eligible for the slot. Attendance records against it. Results read the grading system defined at setup and feed report cards and promotion. Each one depends on the last.",
      "## **03 — The parts that keep a school running.**",
      "Fees tracked against the schedule each school set for itself — revenue, payment activity, outstanding balances in one view. Announcements, events and calendars reaching administrators, teachers, students and parents.",
    ],
    images: ["{image}"],
  },
  {
    title: "The foundations outlived me.",
    label: "Outcome",
    body: [
      "I established and maintained the shared design foundations — reusable styles and assets — that kept the experience consistent as the platform grew.",
      "**After I left, my manager reached out to thank me again for the contribution, and the designers who came after were still working from what I'd set up.**",
    ],
  },
  {
    title: "ExcelMind is where I found what I actually like doing.",
    label: "Reflection",
    body: [
      "Robust platforms, lots of moving parts, decisions that resolve somewhere else entirely.",
      "It also showed me I do my best work when I'm trusted with ownership — making the calls, defending them, living with them.",
    ],
  },
]


const guideMeta = [
  ["Industry", "Healthtech"],
  ["Product", "AI Product Guide"],
  ["Platform", "Mobile"],
  ["Year", "2026"],
]

const guideHoverMeta = [
  ["Industry", "Healthtech"],
  ["Product", "AI Product Guide"],
  ["Last worked on", "July, 2026"],
  ["Tools", "Claude"],
]

const guideSections = [
  {
    title: "Every question about the product routed through a person.",
    label: "The challenge",
    body: [
      "Onboarding new agencies was a company-wide priority, and one of the biggest friction points was simply figuring out how the platform worked. The existing solution was customers contacting the support team, who would record and send videos explaining the relevant flow.",
      "It worked, but it did not scale, and it put a human in the loop for questions the product should have been able to answer itself.",
    ],
  },
  {
    title: "Rather than pitch a concept, I built a working version.",
    label: "My approach",
    visuals: ["supportLoops"],
    body: [
      "I proposed and piloted an in-product chat guide. I took a feature prototype I had already produced and used the prototype code as context for the assistant, so it could answer questions about that feature accurately and return the correct steps — including the video walkthroughs for flows that already had them.",
      "Scoping it to one feature let me validate the idea end to end before asking anyone to commit engineering time to the full version.",
    ],
  },
  {
    title: "",
    label: "Building the solution",
    body: [
      "## Why I fed it code instead of product docs.",
      "The obvious route was to assemble PRDs, specs and help-centre articles and use those as the assistant's context. We had plenty of them. I went the other way and used the prototype's source.",
      "Documents describe what a feature is *meant* to do. Code contains the rules actually in place — the screens that exist, the order the steps run in, the conditions that gate them, the exact words on the buttons. Grounding the assistant there meant it could not confidently describe a flow that had been cut, renamed or reordered, because the thing it was reading was the thing that ran.",
      "{visual:solutionComparison}",
      "## The first version matched keywords. It only answered questions I had already imagined.",
      "V1 had no model in it. Each feature carried a hand-written list of *intents* — phrasings I predicted a caregiver might type — and a scoring function compared the message against them.",
      "It demoed well, because I was writing both the questions and the answer keys. The moment someone phrased a question in a way I had not anticipated, it returned nothing. *\"I need to take a few days off next month\"* shares no scoring words with *\"request time off\"*. The guide was only as good as my ability to guess vocabulary in advance, which does not scale past a demo.",
      "So I connected the Claude API and moved the matching job to the model. Understanding language became the model's job. Deciding what the product is allowed to say stayed mine.",
      "{visual:keywordCode}",
      "## Only the matching layer changed. The registry stayed exactly as it was.",
      "The guide does not free-associate about the platform. Every capability it can talk about is a typed entry describing what the feature is, the exact steps to complete it, and the walkthrough video that already exists for it. That registry is compiled into the assistant's context, and the reply comes back as structured data the interface renders itself.",
      "The model handles the part it is genuinely good at — reading a messy, real-world question and matching it to intent. Everything it is asked to say is content the product already vouches for.",
      "{visual:registryPipeline}",
      "{visual:registryCode}",
    ],
  },
  {
    title: "See it work.",
    label: "The result",
    body: [],
    visuals: ["interactiveDemo"],
  },
  {
    title: "Adding a model meant deciding what it was not allowed to be.",
    label: "The guardrails",
    body: [
      "V1 could not go off-script, because it could not do anything it had not been told to do. Once Claude was in the loop, the constraints had to become explicit design decisions rather than a side effect of the implementation.",
    ],
    visuals: ["guardrails"],
  },
  {
    title: "It won the room, and joined the queue.",
    label: "Where it landed",
    body: [
      "I presented the working pilot rather than a proposal — reviewers could type their own questions into it instead of reading about what it might do. The response was strong, and the guide was added to the company's considerations for AI integration, to be picked up when engineering capacity allows.",
      "That is a real outcome for a piece of self-directed work: an idea that arrived as a demo, was validated on one feature, and left the room as something the organisation intends to build rather than something it is still debating. It has not shipped, and the honest measure of it is a decision changed, not a metric moved.",
    ],
    visuals: ["whereLanded"],
  },
]

const projects = [
  {
    id: "01",
    slug: "giv",
    title: "Giv Healthcare",
    siteUrl: "https://givhealthcare.com/",
    year: "[Add dates]",
    description: "Rebuilding scheduling workflow for Giv Healthcare",
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
    siteUrl: "https://excelmind.org/",
    year: "2025-2026",
    description: "Designing a unified B2B platform for school administration and learning",
    exactDoc: true,
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
    description: "Building the digital infrastructure for a professional karting circuit",
    thumbnail: "/assets/apex-reveal.mp4",
    thumbnailType: "video",
    hoverMeta: apexHoverMeta,
    locked: true,
  },
  {
    id: "04",
    slug: "giv-product-guide",
    title: "Giv Healthcare",
    year: "2026",
    description: "Deploying an AI product guide to resolve onboarding bottlenecks",
    exactDoc: true,
    siteUrl: "https://givhealthcare.com/",
    thumbnail: "/assets/giv-ai-product-guide.mov",
    thumbnailType: "video",
    thumbnailMockup: "/assets/ai-product-guide-mockup-overlay.png",
    eyebrow: "PRODUCT DESIGN · AI · B2B SAAS",
    meta: guideMeta,
    hoverMeta: guideHoverMeta,
    sections: guideSections,
  },
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
    return projects.find(project => project.slug === slug && !project.locked) || null
  }

  return projects.find(project => !project.locked && hash.startsWith(`#${project.slug}-`)) || null
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
  "Four things that shaped how I worked": [
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
  "First, I rebuilt the calendar interface.": [
    { type: "video", src: "/assets/giv-calendar-walkthrough.mp4", label: "Giv calendar walkthrough", className: "rocky-media" },
  ],
  "Next, I tackled the hardest part: creating a shift": [
    { type: "video", src: "/assets/giv-shift-creation-walkthrough.mp4", label: "Giv shift creation walkthrough", className: "rocky-media" },
  ],
  "Then I designed for the shift itself, not just the schedule": [
    { type: "video", src: "/assets/giv-mobile-shift-lifecycle.mp4", label: "Giv mobile shift lifecycle walkthrough", className: "rocky-media" },
  ],
  "And finally, for the moments when plans changed": [
    { type: "video", src: "/assets/giv-drop-shift-walkthrough.mp4", label: "Giv drop shift walkthrough", className: "rocky-media" },
    { type: "video", src: "/assets/giv-time-change-requests-walkthrough.mp4", label: "Giv time change requests walkthrough", className: "rocky-media" },
    { type: "video", src: "/assets/giv-time-off-requests-walkthrough.mp4", label: "Giv time off requests walkthrough", className: "rocky-media" },
  ],
}

function renderInlineEmphasis(text, { inHeading = false } = {}) {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      return <a href={link[2]} target="_blank" rel="noreferrer" key={index}>{link[1]}</a>
    }

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

    if (part.startsWith("*") && part.endsWith("*")) {
      const inner = part.slice(1, -1)
      return <em key={index}>{inner}</em>
    }

    return part
  })
}

// Splits a section body into alternating copy and media blocks so an {images}
// marker breaks out of the narrow copy column at the position the doc puts it.
function splitSectionChunks(body = [], media = []) {
  if (!body.length) return [{ type: "copy", items: [] }]

  const chunks = []
  let slot = 0

  body.forEach(item => {
    const visualMatch = item.match(/^\{visual:([^}]+)\}$/)

    if (visualMatch) {
      chunks.push({ type: "visual", visual: visualMatch[1] })
      return
    }

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

  const image = (
    <div className={`case-image ${media.className || ""}`}>
      {media.type === "video" ? (
        <video
          src={media.src}
          aria-label={media.label}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img src={media.src} alt={media.alt} />
      )}
    </div>
  )

  return media.caption ? (
    <figure className="case-media-figure">
      {image}
      <figcaption>{media.caption}</figcaption>
    </figure>
  ) : image
}

function WorkThumbnail({ project }) {
  if (project.thumbnailMockup && project.thumbnail && project.thumbnailType === "video") {
    return (
      <div className="work-thumbnail-mockup">
        <video
          className="work-thumbnail-mockup-video"
          src={project.thumbnail}
          aria-label={`${project.title} thumbnail`}
          autoPlay
          loop
          muted
          playsInline
          style={{ objectPosition: project.thumbnailPosition || "50% 50%" }}
        />
        <img
          className="work-thumbnail-mockup-frame"
          src={project.thumbnailMockup}
          alt=""
          aria-hidden="true"
        />
      </div>
    )
  }

  if (project.thumbnail && project.thumbnailType === "video") {
    return (
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
    )
  }

  if (project.thumbnail) {
    return (
      <img
        className="work-thumbnail"
        src={project.thumbnail}
        alt={`${project.title} thumbnail`}
        style={{ objectPosition: project.thumbnailPosition || "50% 50%" }}
      />
    )
  }

  return <span className="visual-label">image preview</span>
}

const aiGuideLoopCards = [
  {
    title: "The support loop",
    tag: "Before",
    old: true,
    steps: [
      "A caregiver gets stuck mid-task",
      "They message support and wait",
      "Someone records a screen walkthrough",
      "The video lands, out of context, later",
    ],
    cost: "Cost scales with every new agency.\nThe answer exists — just not where the question is asked.",
  },
  {
    title: "The in-product loop",
    tag: "After",
    steps: [
      "A caregiver gets stuck mid-task",
      "They ask the guide, in the app, in their words",
      "Steps come back — plus the existing video",
      "Support is only involved by exception",
    ],
    cost: "Cost is flat.\nThe same walkthroughs, delivered at the moment of the question.",
  },
]

const aiGuideLayers = [
  ["Layer 1", "Feature registry", "Typed entries derived from the prototype: intents, answer text, ordered steps, matching video, target screen.", "Unchanged", "keep"],
  ["Layer 2", "Matching", "Was: string scoring against predicted phrasings. Now: Claude reads the question with the registry as context.", "Replaced", "swap"],
  ["Layer 3", "Rendering", "Structured JSON — answer, steps, navigate, featureId, noMatch — drawn as native components, never raw markdown.", "Unchanged", "keep"],
]

const aiGuideCode = `// Each feature describes a product capability. The guide matches user
// intent against \`intents\`, then serves the answer and steps from metadata.
{
  id:      "request_time_off",
  intents: ["request time off", "apply for leave", "pto request",
            "sick leave", "need time off", "vacation request", …],
  answer:  "Easy! Head over to the Shifts screen and tap the + button…",
  steps:   ["Tap '+' on the Shifts screen",
            "Choose 'Time off'",
            "Pick your leave type (PTO, Sick, etc.)", …],
  video:   { title: "How to Request Time Off", duration: "1:24" },
}`

const aiGuideScenes = [
  ["01", "Asked in their own words", "No menu to hunt through. The guide is one tap from wherever they are stuck."],
  ["02", "Answered as steps, not prose", "The reply renders as numbered tasks a caregiver can follow one-handed, mid-shift."],
  ["03", "The existing video, attached", "The same walkthrough support used to record by hand — surfaced automatically."],
  ["04", "Or it just takes them there", "Navigation requests skip the explanation and move the user to the right screen."],
]

const aiGuideSteps = [
  "Tap '+' on the Shifts screen",
  "Choose 'Time off'",
  "Pick your leave type (PTO, Sick, etc.)",
  "Set your start & end dates",
  "Add a note if you'd like (optional)",
  "Hit 'Submit request' — that's it!",
]

const aiGuideDecisions = [
  [
    "It says what it can't do, before you ask",
    "A persistent line at the top of the panel: \"I explain features and walk you through tasks, but I can't take actions for you.\" Dismissible, but present by default on every session.",
    "Setting the ceiling early is cheaper than disappointing someone who assumed the assistant would file their request for them.",
  ],
  [
    "Answers render as tasks, not paragraphs",
    "The reply is split: a short conversational line in a neutral bubble, then the steps as numbered rows in product blue. Each step is under ten words.",
    "The reader is standing in a client's kitchen holding a phone in one hand. Prose is unusable there; a checklist is not.",
  ],
  [
    "The video library gets reused, not replaced",
    "Where support had already recorded a walkthrough, the guide attaches it to the answer as a card — tagged, timed, and tied to the feature.",
    "The team's existing work becomes an asset the product serves automatically, instead of something a person has to remember to send.",
  ],
  [
    "Two modes, one input",
    "\"How do I request time off?\" returns steps. \"Take me to my requests\" closes the panel and moves the user to that screen. The model decides which, and returns either steps or a destination — never both.",
    "People ask for a destination as often as an explanation. Forcing both into a how-to answer would make the guide feel deaf.",
  ],
  [
    "Not knowing is a designed state",
    "An out-of-scope question gets a short redirect plus tappable picks from the registry, so the conversation has somewhere to go instead of dead-ending.",
    "A confident wrong answer about payroll would do more damage to trust than admitting the guide only covers the app.",
  ],
  [
    "One feature, taken all the way",
    "The pilot covers time off — requesting it, finding requests, understanding approval, and navigating the shifts screen. Nothing else.",
    "A narrow build that genuinely works is a stronger argument for funding than a broad one that half-works everywhere.",
  ],
]

const aiGuideFindings = [
  ["Accuracy is a content problem, not a model problem", "Grounding the assistant in the prototype's own code meant it returned the real steps in the real order. The debate stopped being \"will it hallucinate\" and became \"who owns the registry\" — a question the team already knew how to answer."],
  ["The support videos were already the product's documentation", "They just had no distribution. Attaching them to the matching answer turned a manual, per-customer send into something the platform does at the moment of the question."],
  ["A working pilot changed the conversation", "Reviewers could ask it their own questions instead of reading a proposal. Scoping to one feature made that possible without engineering commitment."],
]

const aiGuideMetrics = [
  ["01", "Self-serve rate", "Share of onboarding questions resolved in the panel without a support contact."],
  ["02", "Time to first successful task", "Registration → first completed time-off request, with and without the guide."],
  ["03", "Video requests per new agency", "The manual recording load, measured before and after rollout."],
  ["04", "The no-match log", "Every question the registry couldn't answer, ranked. The highest-signal roadmap the team could get for free."],
]

const aiGuideComparisonCards = [
  {
    title: "PRDs and product docs",
    badge: "Considered",
    copy: "Assemble the written record — specs, requirements, help-centre articles — and use it as the knowledge base.",
    points: [
      "Describes intent, including intent that never shipped",
      "Goes stale silently; nothing fails when a doc is wrong",
      "Written for internal readers, not for a caregiver mid-shift",
      "Prose has to be re-derived into steps before it's usable",
    ],
  },
  {
    title: "The prototype's code",
    badge: "Chosen",
    picked: true,
    copy: "Point the assistant at the source of the feature I had already built, and let the logic rules be the knowledge base.",
    points: [
      "Encodes rules that actually run, not rules that were proposed",
      "Carries real screen names, step order and button labels",
      "Already structured — the interface can render it directly",
      "Made the answers correct by construction, not by review",
    ],
  },
]

const aiGuideKeywordCode = `// Resolve user message to a feature by intent matching
for (const intent of feature.intents) {
  if (normalized.includes(intent)) {
    // Exact contiguous match — highest confidence
    score += intentWords.length * 2
  } else {
    // All significant words (>3 chars) of the intent appear anywhere.
    // Require at least 2 to avoid single-word false positives.
    const significant = intentWords.filter(w => w.length > 3)
    if (significant.length >= 2 && significant.every(w => inputWords.has(w)))
      score += significant.length
  }
}`

const aiGuideGuardrails = [
  [
    "It states its ceiling before you ask",
    "A line sits at the top of the panel on every session: \"I explain features and walk you through tasks, but I can't take actions for you.\"",
    "Cheaper than disappointing someone who assumed it would file their request for them.",
  ],
  [
    "It answers in tasks, not paragraphs",
    "A short conversational line, then numbered step rows in product blue. Each step under ten words.",
    "The reader is standing in a client's kitchen holding a phone one-handed. Prose is unusable there.",
  ],
  [
    "It reuses the support videos",
    "Where a walkthrough already existed, the guide attaches it to the matching answer — tagged, timed, tied to the feature.",
    "The support team's existing work becomes something the product serves automatically.",
  ],
  [
    "Two modes, one input",
    "\"How do I request time off?\" returns steps. \"Take me to my requests\" closes the panel and moves the user to that screen. The model decides which, and returns either steps or a destination — never both.",
    "People ask for a destination as often as an explanation. Forcing both into a how-to answer would make the guide feel deaf.",
  ],
]

const aiGuideOutcomeSummary = [
  ["Presented", "Working pilot, one feature"],
  ["Response", "Approved in review"],
  ["Status", "Queued for AI integration"],
  ["Blocker", "Engineering capacity, not conviction"],
]

function AIGuideDemo() {
  const [demoKey, setDemoKey] = useState(0)

  return (
    <div className="ai-guide-demo" key={demoKey}>
      <div className="ai-guide-device" role="img" aria-label="Animated recreation of the Giv Product Guide answering a time-off question">
        <div className="ai-guide-screen">
          <div className="ai-guide-app">
            <div className="ai-status"><span>9:41</span><span>◒</span></div>
            <div className="ai-app-head"><h5>Shifts</h5><span>•••</span></div>
            <div className="ai-weekstrip">
              {["Sun 8", "Mon 9", "Tue 10", "Wed 11", "Thu 12", "Fri 13", "Sat 14"].map(day => (
                <span className={day.startsWith("Tue") ? "active" : ""} key={day}>{day}</span>
              ))}
            </div>
            <div className="ai-shift-cards">
              {["10:00 am – 12:00 pm", "2:00 pm – 5:00 pm", "6:00 pm – 9:00 pm"].map((time, index) => (
                <div className="ai-shift-card" key={time}>
                  <b>{time}</b>
                  <small>{["Kimberly Ramirez", "Patricia Rivera", "Paul Green"][index]}<br />1234 Maple, Columbia</small>
                </div>
              ))}
            </div>
          </div>

          <button className="ai-guide-fab" type="button" aria-label="Open Giv Product Guide">✦</button>
          <div className="ai-guide-scrim" />
          <div className="ai-guide-sheet">
            <i className="ai-guide-handle" />
            <div className="ai-guide-sheet-head"><span>Giv.</span><b>Giv Product Guide</b><em>×</em></div>
            <p className="ai-guide-notice">I explain features and walk you through tasks, but I can't take actions for you.</p>
            <div className="ai-guide-messages">
              <div className="ai-bubble intro">Hi there! I'm the Giv Product Guide — here to help you understand features and complete tasks in the app.</div>
              <div className="ai-bubble user">How do I request time off?</div>
              <div className="ai-bubble answer">Easy! Head over to the Shifts screen and tap the + button.</div>
              <div className="ai-guide-steps">
                {aiGuideSteps.map((step, index) => (
                  <div key={step} style={{ "--step-index": index }}>
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
              <div className="ai-guide-video-card">
                <span>1:24</span>
                <b>Walkthrough</b>
                <small>Time Off · Video Guide<br />How to Request Time Off</small>
              </div>
            </div>
            <div className="ai-guide-input">What can I help you with?<span>↗</span></div>
          </div>
        </div>
      </div>
      <div className="ai-guide-scene-list">
        {aiGuideScenes.map(([number, title, copy], index) => (
          <article className={`ai-guide-scene ai-guide-scene-${index + 1}`} key={title}>
            <span>{number}</span>
            <div>
              <h5>{title}</h5>
              <p>{copy}</p>
            </div>
          </article>
        ))}
        <button className="ai-guide-replay" type="button" onClick={() => setDemoKey(key => key + 1)}>Replay</button>
      </div>
    </div>
  )
}

function AIGuideVisual({ type }) {
  if (type === "supportLoops") {
    return (
      <div className="ai-guide-loops">
        {aiGuideLoopCards.map(card => (
          <article className={`ai-guide-loop ${card.old ? "is-old" : ""}`} key={card.title}>
            <div className="ai-guide-loop-head">
              <h5>{card.title}</h5>
              <span>{card.tag}</span>
            </div>
            <ul>
              {card.steps.map((step, index) => (
                <li key={step}><span className={index === card.steps.length - 1 && !card.old ? "hollow" : ""} />{step}</li>
              ))}
            </ul>
            <p>{card.cost.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</p>
          </article>
        ))}
      </div>
    )
  }

  if (type === "prototypeCallout") {
    return (
      <aside className="ai-guide-callout">
        <span>Why the prototype was the context</span>
        <p>The prototype already encoded the truth about the feature — the screens, the order of the steps, the copy on the buttons. Pointing the assistant at that instead of writing documentation for it meant the answers were correct by construction, and it made the demo arguable: this is not what the guide <em>could</em> say, it is what it <em>does</em> say.</p>
      </aside>
    )
  }

  if (type === "solutionComparison") {
    return (
      <div className="ai-guide-comparison">
        {aiGuideComparisonCards.map(card => (
          <article className={`ai-guide-option ${card.picked ? "picked" : ""}`} key={card.title}>
            <div className="ai-guide-option-top">
              <h5>{card.title}</h5>
              <span>{card.badge}</span>
            </div>
            <p>{card.copy}</p>
            <ul>
              {card.points.map(point => <li key={point}>{point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    )
  }

  if (type === "keywordCode") {
    return (
      <div className="ai-guide-code">
        <span>V1 — the scoring function that decided every answer</span>
        <pre><code>{aiGuideKeywordCode}</code></pre>
      </div>
    )
  }

  if (type === "interactiveDemo") return <ProductGuideDemo />

  if (type === "registryPipeline") {
    return (
      <div className="ai-guide-layers">
        {aiGuideLayers.map(([tag, title, copy, badge, tone]) => (
          <article className="ai-guide-layer" key={tag}>
            <span className="ai-guide-layer-tag">{tag}</span>
            <b>{title}</b>
            <p>{copy}</p>
            <span className={`ai-guide-layer-badge is-${tone}`}>{badge}</span>
          </article>
        ))}
      </div>
    )
  }

  if (type === "registryCode") {
    return (
      <div className="ai-guide-code">
        <span>One entry from the feature registry</span>
        <pre><code>{aiGuideCode}</code></pre>
      </div>
    )
  }

  if (type === "designDecisions" || type === "guardrails") {
    const decisions = type === "guardrails" ? aiGuideGuardrails : aiGuideDecisions

    return (
      <div className="ai-guide-decisions">
        {decisions.map(([title, copy, why]) => (
          <article className="ai-guide-decision" key={title}>
            <h5>{title}</h5>
            <p>{copy}</p>
            <p className="ai-guide-why">{why}</p>
          </article>
        ))}
      </div>
    )
  }

  if (type === "whereLanded") {
    return (
      <dl className="ai-guide-outcomes" aria-label="Outcome summary">
        {aiGuideOutcomeSummary.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    )
  }

  if (type === "pilotFindings") {
    return (
      <div className="ai-guide-findings">
        {aiGuideFindings.map(([title, copy]) => (
          <article className="ai-guide-finding" key={title}>
            <h5>{title}</h5>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    )
  }

  if (type === "pilotMetrics") {
    return (
      <div className="ai-guide-metrics">
        <h5>What I'd instrument next</h5>
        {aiGuideMetrics.map(([number, title, copy]) => (
          <article className="ai-guide-metric" key={title}>
            <span>{number}</span>
            <div>
              <b>{title}</b>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
    )
  }

  if (type === "pilotLimits") {
    return (
      <aside className="ai-guide-callout">
        <span>Known limits</span>
        <p>Grounding in prototype code works for one feature and will not survive a whole platform. Production needs the registry generated from a real source of truth with a named owner. And the guide explains rather than acts — a deliberate boundary for the pilot, and the first thing worth revisiting once trust is established.</p>
      </aside>
    )
  }

  return null
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
                <>
                  {splitSectionChunks(section.body, givSectionMedia[section.title]).map((chunk, chunkIndex) => (
                    chunk.type === "images" ? (
                      <div className="case-image-stack" key={`${section.title}-media-${chunkIndex}`}>
                        {renderCaseMedia(chunk.media, `${section.title}-${chunkIndex}`)}
                      </div>
                    ) : chunk.type === "visual" ? (
                      <div className={`case-image-stack ai-guide-visual-wrap ${chunk.visual === "interactiveDemo" ? "ai-guide-wide" : "ai-guide-narrow"}`} key={`${section.title}-visual-${chunkIndex}`}>
                        <AIGuideVisual type={chunk.visual} />
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
                          ) : item ? (
                            <p key={item}>{renderInlineEmphasis(item)}</p>
                          ) : null
                        ))}
                      </div>
                    )
                  ))}
                  {section.visuals?.map(visual => (
                    <div className={`case-image-stack ai-guide-visual-wrap ${visual === "interactiveDemo" ? "ai-guide-wide" : "ai-guide-narrow"}`} key={`${section.title}-${visual}`}>
                      <AIGuideVisual type={visual} />
                    </div>
                  ))}
                </>
              ) : (
              <div className="case-section-copy">
                <div className="case-section-title">
                  {/^\d/.test(section.title) ? null : <span>{String(index + 1).padStart(2, "0")}</span>}
                  <h4>{/[.!?]$/.test(section.title) ? section.title : `${section.title}.`}</h4>
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
              <span className="eyebrow">Keep reading</span>
              <h2 className="display" id="more-works-heading">Other case studies.</h2>
            </div>
            <div className="more-work-list">
              {projects.filter(item => item.id !== project.id).map(item => (
                <button
                  className={`more-work-card work-item ${item.locked ? "is-locked" : ""}`}
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (!item.locked) onSelectProject(item)
                  }}
                  aria-disabled={item.locked ? "true" : "false"}
                  aria-label={`${item.title} project preview`}
                >
                  <div className="work-visual">
                    <div className="work-card-inner">
                      <div className="work-card-face work-front">
                        <WorkThumbnail project={item} />
                      </div>
                      <div className="work-card-face work-back">
                        {item.hoverMeta ? (
                          <div className="work-glance">
                            <span>AT A GLANCE</span>
                            <dl>
                              {item.hoverMeta.map(([label, value]) => (
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
                    <h5>{item.description}</h5>
                    <div className="work-desc">
                      <p>{item.title}</p>
                    </div>
                    <span className="work-cta">
                      {item.locked && <Lock aria-hidden="true" />}
                      {item.locked ? "Coming soon" : "View case study"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
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
    if (project.locked) return
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
              <span className="hero-quote-sticker" aria-hidden="true">&ldquo;</span>
              <span className="line"><span>Behind every seamless product is a complex, messy system. That’s exactly what I design for.</span></span>
            </h3>
            {heroAboutCopy.map(paragraph => (
              <p className="hero-body" key={paragraph}>{paragraph}</p>
            ))}
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
                      <WorkThumbnail project={project} />
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
                  <h5>{project.description}</h5>
                  <div className="work-desc">
                    <p>{project.title}</p>
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
