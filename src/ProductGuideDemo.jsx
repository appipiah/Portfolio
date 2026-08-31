import { useCallback, useEffect, useRef, useState } from "react"

// Animated recreation of the Giv AI Product Guide, replayed at speed.
//
// The phone keeps Giv's own product palette (blue #2B52CC on #EDF2F9) because it
// depicts the real app — the surrounding chrome uses the portfolio's tokens so the
// module sits inside a case study rather than on top of it.
//
// Content is verbatim from the pilot build: the answer copy, the six steps and the
// video card all come from the feature registry in payroll-prototype/src/App.tsx.

const Q1 = "How do I request time off?"
const A1 =
  "Easy! Head over to the Shifts screen and tap the + button — you'll find the time off option right there. Pick your leave type, choose your dates, and you're done. Your manager will get notified automatically."
const S1 = [
  "Tap '+' on the Shifts screen",
  "Choose 'Time off'",
  "Pick your leave type (PTO, Sick, etc.)",
  "Set your start & end dates",
  "Add a note if you'd like (optional)",
  "Hit 'Submit request' — that's it!",
]
const VIDEO = { title: "How to Request Time Off", duration: "1:24", tag: "Time Off", icon: "🏖️" }

const Q2 = "show me my requests"
const A2 =
  "Opening your Requests screen — all your submitted time off requests are listed there with their current status."

const SCENES = [
  ["Asked in their own words", "No menu to hunt through. The guide is one tap from wherever they are stuck."],
  ["Answered as steps, not prose", "The reply renders as numbered tasks a caregiver can follow one-handed, mid-shift."],
  ["The existing video, attached", "The same walkthrough support used to record by hand — surfaced automatically."],
  ["Or it just takes them there", "Navigation requests skip the explanation and move the user to the right screen."],
]

const LOOP_MS = 18600

const Compass = ({ size = 27 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" stroke="rgba(255,255,255,.25)" strokeWidth=".8" />
    <circle cx="12" cy="12" r="7" stroke="rgba(255,255,255,.14)" strokeWidth=".5" />
    <path d="M12 4 L13.2 11 L12 12.2 L10.8 11 Z" fill="#fff" />
    <path d="M12 20 L10.8 13 L12 11.8 L13.2 13 Z" fill="rgba(255,255,255,.2)" />
    <path d="M20 12 L13 13.2 L11.8 12 L13 10.8 Z" fill="rgba(255,255,255,.2)" />
    <path d="M4 12 L11 10.8 L12.2 12 L11 13.2 Z" fill="rgba(255,255,255,.2)" />
    <circle cx="12" cy="12" r="1.3" fill="#fff" />
  </svg>
)

export default function ProductGuideDemo() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [screen, setScreen] = useState("shifts")
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState("")
  const [caret, setCaret] = useState(false)
  const [fab, setFab] = useState("")
  const [scene, setScene] = useState(-1)

  const timers = useRef([])
  const intervals = useRef([])
  const msgsRef = useRef(null)
  const stageRef = useRef(null)

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout)
    intervals.current.forEach(clearInterval)
    timers.current = []
    intervals.current = []
  }, [])

  const at = useCallback((ms, fn) => {
    timers.current.push(setTimeout(fn, ms))
  }, [])

  const reset = useCallback(() => {
    clearAll()
    setSheetOpen(false)
    setScreen("shifts")
    setMessages([])
    setTyping(false)
    setInput("")
    setCaret(false)
    setFab("")
    setScene(-1)
  }, [clearAll])

  const typeInto = useCallback((text, speed) => {
    let i = 0
    setCaret(true)
    const id = setInterval(() => {
      i += 1
      setInput(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    intervals.current.push(id)
  }, [])

  const play = useCallback(() => {
    reset()

    // Reduced motion: show the resolved conversation, no timeline.
    if (reduced) {
      setSheetOpen(true)
      setScene(1)
      setMessages([
        { role: "me", text: Q1 },
        { role: "ai", text: A1, steps: S1, video: VIDEO },
      ])
      return
    }

    at(500, () => {
      setFab("ping")
      setScene(0)
    })
    at(1500, () => setFab("ping tap"))
    at(1660, () => {
      setFab("ping")
      setSheetOpen(true)
    })
    at(2500, () => typeInto(Q1, 46))
    at(4000, () => {
      setInput("")
      setCaret(false)
      setMessages((m) => [...m, { role: "me", text: Q1 }])
    })
    at(4320, () => setTyping(true))
    at(5700, () => {
      setTyping(false)
      setScene(1)
      setMessages((m) => [...m, { role: "ai", text: A1 }])
    })
    at(6300, () => {
      setMessages((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, steps: S1 } : x)))
    })
    at(7450, () => {
      setScene(2)
      setMessages((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, video: VIDEO } : x)))
    })
    at(10200, () => {
      setScene(3)
      typeInto(Q2, 46)
    })
    at(11300, () => {
      setInput("")
      setCaret(false)
      setMessages((m) => [...m, { role: "me", text: Q2 }])
    })
    at(11620, () => setTyping(true))
    at(12800, () => {
      setTyping(false)
      setMessages((m) => [...m, { role: "ai", text: A2 }])
    })
    at(14000, () => setSheetOpen(false))
    at(14450, () => setScreen("requests"))
    at(LOOP_MS, () => play())
  }, [at, reduced, reset, typeInto])

  // Keep the transcript pinned to the newest message.
  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [messages, typing])

  // Only run while the device is actually on screen.
  useEffect(() => {
    const node = stageRef.current
    if (!node || typeof IntersectionObserver === "undefined") {
      play()
      return () => clearAll()
    }
    let running = false
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !running) {
            running = true
            play()
          } else if (!entry.isIntersecting && running) {
            running = false
            reset()
          }
        })
      },
      { threshold: 0.35 },
    )
    obs.observe(node)
    return () => {
      obs.disconnect()
      clearAll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="pgd">
      <style>{CSS}</style>

      <div className="pgd-stage">
        <div
          className="pgd-device"
          ref={stageRef}
          role="img"
          aria-label="Animated recreation of the Giv Product Guide: a caregiver asks how to request time off, the guide replies with six steps and a video walkthrough, then navigates them to their requests screen."
        >
          <div className="pgd-screen">
            <div className={`pgd-app${screen === "shifts" ? " on" : ""}`}>
              <div className="pgd-status">
                <span>9:41</span>
                <span className="pgd-batt">
                  <i />
                </span>
              </div>
              <div className="pgd-apphead">
                <h5>Shifts</h5>
                <span className="pgd-dots">•••</span>
              </div>
              <div className="pgd-week">
                {[
                  ["Sun", 8],
                  ["Mon", 9],
                  ["Tue", 10],
                  ["Wed", 11],
                  ["Thu", 12],
                  ["Fri", 13],
                  ["Sat", 14],
                ].map(([d, n]) => (
                  <div key={d} className={n === 10 ? "sel" : ""}>
                    {d}
                    <b>{n}</b>
                  </div>
                ))}
              </div>
              <div className="pgd-cards">
                {[
                  ["10:00 am – 12:00 pm", "Kimberly Ramirez", "miss", "Missed"],
                  ["2:00 pm – 5:00 pm", "Patricia Rivera", "done", "Completed"],
                  ["6:00 pm – 9:00 pm", "Paul Green", "sched", "Scheduled"],
                ].map(([time, who, tone, label]) => (
                  <div className="pgd-card" key={who}>
                    <div>
                      <div className="t">{time}</div>
                      <div className="s">
                        {who}
                        <br />
                        1234 Maple, Columbia
                      </div>
                    </div>
                    <span className={`pgd-pill ${tone}`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="pgd-tabs">
                <i className="act" />
                <i />
                <span className="plus">+</span>
                <i />
                <i />
              </div>
            </div>

            <div className={`pgd-app${screen === "requests" ? " on" : ""}`}>
              <div className="pgd-status">
                <span>9:41</span>
                <span className="pgd-batt">
                  <i />
                </span>
              </div>
              <div className="pgd-apphead">
                <h5>‹&nbsp; Requests</h5>
              </div>
              <div className="pgd-cards">
                {[
                  ["PTO · 24 hrs", "Apr 14 – Apr 16, 2026", "pend", "Pending approval"],
                  ["PTO · 32 hrs", "Jan 14 – Jan 17, 2026", "appr", "Approved"],
                  ["Unpaid · 8 hrs", "Jan 14, 2026", "rej", "Rejected"],
                ].map(([t, d, tone, label]) => (
                  <div className="pgd-card" key={t}>
                    <div>
                      <div className="t">{t}</div>
                      <div className="s">{d}</div>
                    </div>
                    <span className={`pgd-pill ${tone}`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="pgd-tabs">
                <i />
                <i className="act" />
                <span className="plus">+</span>
                <i />
                <i />
              </div>
            </div>

            <span className={`pgd-fab ${fab}`} aria-hidden="true">
              <Compass />
            </span>

            <div className={`pgd-scrim${sheetOpen ? " on" : ""}`} />

            <div className={`pgd-sheet${sheetOpen ? " on" : ""}`}>
              <div className="pgd-handle">
                <i />
              </div>
              <div className="pgd-sheethead">
                <span className="pgd-logo">Giv.</span>
                <b>Giv Product Guide</b>
                <span className="pgd-x">✕</span>
              </div>
              <div className="pgd-notice">
                I explain features and walk you through tasks, but I can't take actions for you.
              </div>

              <div className="pgd-msgs" ref={msgsRef}>
                <div className="pgd-msg">
                  <div>
                    <div className="pgd-bub">
                      <span role="img" aria-label="wave">👋</span> Hi there! I'm the Giv Product Guide — here to help
                      you understand features and complete tasks in the app. What do you need help with?
                      <div className="pgd-hint">
                        Try something like:
                        <br />• "How do I request time off?"
                        <br />• "Where can I see my shifts?"
                      </div>
                    </div>
                  </div>
                </div>

                {messages.map((m, i) => (
                  <div className={`pgd-msg${m.role === "me" ? " me" : ""}`} key={`${m.role}-${i}`}>
                    <div>
                      <div className={`pgd-bub${m.role === "me" ? " me" : ""}`}>{m.text}</div>
                      {m.steps && (
                        <div className="pgd-steps">
                          {m.steps.map((s, si) => (
                            <div key={s} style={{ animationDelay: `${si * 95}ms` }}>
                              <b>{si + 1}</b>
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {m.video && (
                        <div className="pgd-vid">
                          <div className="pgd-thumb">
                            <em>{m.video.icon}</em>
                            <u>Walkthrough</u>
                            <span className="pgd-dur">{m.video.duration}</span>
                          </div>
                          <div className="pgd-vcap">
                            <i>{m.video.tag} · Video Guide</i>
                            <b>{m.video.title}</b>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="pgd-msg">
                    <div>
                      <span className="pgd-typing">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {messages.length === 0 && (
                <div className="pgd-chips">
                  <button type="button" tabIndex={-1}>How do I request time off?</button>
                  <button type="button" tabIndex={-1}>Where are my requests?</button>
                </div>
              )}

              <div className={`pgd-input${caret ? " caret" : ""}`}>
                <div className="pgd-box">
                  <span className="pgd-txt">{input}</span>
                  <span className={`pgd-send${input.trim() ? " hot" : ""}`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pgd-side">
          <div className="pgd-scenes">
            {SCENES.map(([head, note], i) => (
              <div className={`pgd-scene${scene === i ? " on" : ""}`} key={head}>
                <span className="pgd-tick">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{head}</h4>
                  <p>{note}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="pgd-replay" type="button" onClick={play}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.5 15a9 9 0 1 0 2.1-9.4L1 10" />
            </svg>
            Replay
          </button>
        </div>
      </div>
    </div>
  )
}

const CSS = `
.pgd{
  /* Device palette — Giv's own product colours */
  --d-primary:#2B52CC; --d-primary-lt:#EEF4FF; --d-bg:#EDF2F9;
  --d-t1:#111827; --d-t2:#6B7280; --d-t3:#9CA3AF; --d-line:#E5E7EB; --d-input:#F9FAFB;
  /* Chrome palette — the blue-navy set from the case study page */
  --pgd-stage:#E9EDF5; --pgd-surface:#FFFFFF;
  --pgd-ink:#131829; --pgd-ink-2:#565F76; --pgd-ink-3:#8A93A8;
  --pgd-accent:#2B52CC; --pgd-line:#D7DDE9;
  width:100%;
}
.pgd-stage{
  display:grid; gap:36px; justify-items:center; align-items:center;
  padding:40px 26px 44px;
  background:var(--pgd-stage);
}
@media(min-width:900px){
  .pgd-stage{
    grid-template-columns:300px minmax(0,380px);
    justify-content:center;
    justify-items:center;
    align-items:center;
    gap:52px;
    padding:44px 40px 48px;
  }
}

/* ── Device: keeps Giv's own product palette ── */
.pgd-device{
  width:300px; height:624px; flex-shrink:0; padding:11px;
  border-radius:46px; background:linear-gradient(160deg,#2c3242,#12151d 60%);
  box-shadow:0 2px 4px rgba(0,0,0,.3), 0 30px 60px -20px rgba(0,0,0,.45);
}
.pgd-screen{
  position:relative; width:100%; height:100%; overflow:hidden; border-radius:36px;
  background:var(--d-bg); color:var(--d-t1);
  font-family:var(--font-sans, Inter, system-ui, sans-serif);
}
.pgd-status{display:flex; justify-content:space-between; align-items:center; padding:14px 22px 6px; font-size:13px; font-weight:700}
.pgd-batt{width:22px; height:11px; border:1px solid rgba(17,24,39,.35); border-radius:3px; padding:1px; display:block}
.pgd-batt i{display:block; height:100%; width:72%; background:var(--d-t1); border-radius:1px}

.pgd-app{position:absolute; inset:0; display:flex; flex-direction:column; opacity:0; pointer-events:none; transition:opacity .3s ease}
.pgd-app.on{opacity:1}
.pgd-apphead{display:flex; align-items:center; justify-content:space-between; padding:6px 20px 12px}
.pgd-apphead h5{margin:0; font-size:19px; font-weight:700; letter-spacing:-.02em}
.pgd-dots{font-size:17px; color:var(--d-t2); letter-spacing:1px}

.pgd-week{display:flex; gap:3px; padding:0 14px 12px}
.pgd-week div{flex:1; text-align:center; padding:7px 0 8px; border-radius:11px; font-size:10px; color:var(--d-t3); line-height:1.5}
.pgd-week div b{display:block; font-size:13px; color:var(--d-t1); font-weight:600}
.pgd-week div.sel{background:var(--d-primary)}
.pgd-week div.sel, .pgd-week div.sel b{color:#fff}

.pgd-cards{padding:0 14px; display:flex; flex-direction:column; gap:9px; overflow:hidden}
.pgd-card{background:#fff; border-radius:13px; padding:12px 13px; display:flex; justify-content:space-between; align-items:flex-start; gap:8px; box-shadow:0 1px 2px rgba(17,24,39,.05)}
.pgd-card .t{font-size:12.5px; font-weight:700; letter-spacing:-.01em}
.pgd-card .s{font-size:11px; color:var(--d-t2); margin-top:3px; line-height:1.45}
.pgd-pill{font-size:9px; font-weight:700; padding:3px 8px; border-radius:20px; white-space:nowrap; flex-shrink:0}
.pgd-pill.miss{background:#FEF2F2; color:#DC2626}
.pgd-pill.done{background:#F0FDF4; color:#16A34A}
.pgd-pill.sched{background:#EFF6FF; color:#2563EB}
.pgd-pill.pend{background:#FEF3C7; color:#D97706}
.pgd-pill.appr{background:#D1FAE5; color:#059669}
.pgd-pill.rej{background:#FFE4E6; color:#E11D48}

.pgd-tabs{margin-top:auto; display:flex; align-items:center; justify-content:space-around; padding:11px 12px 24px; background:#fff; border-top:1px solid var(--d-line)}
.pgd-tabs i{display:block; width:20px; height:20px; border-radius:5px; background:#c9ced8}
.pgd-tabs i.act{background:var(--d-primary)}
.pgd-tabs .plus{width:36px; height:36px; border-radius:50%; background:var(--d-primary-lt); display:grid; place-items:center; color:var(--d-primary); font-size:20px; line-height:1}

.pgd-fab{
  position:absolute; right:16px; bottom:96px; z-index:5;
  width:52px; height:52px; border-radius:17px; display:grid; place-items:center;
  background:linear-gradient(135deg,#326DD0,#1a4fa8); box-shadow:0 6px 18px rgba(43,82,204,.4);
  transition:transform .14s ease;
}
.pgd-fab::after{content:""; position:absolute; inset:0; border-radius:17px; opacity:0}
.pgd-fab.ping::after{animation:pgdPing 1.1s ease-out 2}
.pgd-fab.tap{transform:scale(.9)}
@keyframes pgdPing{0%{box-shadow:0 0 0 0 rgba(43,82,204,.5); opacity:1} 100%{box-shadow:0 0 0 20px rgba(43,82,204,0); opacity:0}}

.pgd-scrim{position:absolute; inset:0; z-index:10; background:rgba(0,0,0,.35); opacity:0; transition:opacity .28s ease; pointer-events:none}
.pgd-scrim.on{opacity:1}

.pgd-sheet{
  position:absolute; left:0; right:0; bottom:0; height:88%; z-index:11;
  background:#fff; border-radius:20px 20px 36px 36px; overflow:hidden;
  display:flex; flex-direction:column;
  transform:translateY(101%); transition:transform .34s cubic-bezier(.32,.72,0,1);
}
.pgd-sheet.on{transform:translateY(0)}
.pgd-handle{padding:9px 0 0; display:flex; justify-content:center}
.pgd-handle i{width:36px; height:4px; border-radius:2px; background:var(--d-line)}
.pgd-sheethead{display:flex; align-items:center; gap:10px; padding:9px 16px 11px; border-bottom:1px solid var(--d-line)}
.pgd-logo{width:32px; height:32px; border-radius:9px; background:#0d0d0d; display:grid; place-items:center; color:#fff; font-size:10.5px; font-weight:800; letter-spacing:-.04em}
.pgd-sheethead b{font-size:14px; font-weight:700; letter-spacing:-.01em}
.pgd-x{margin-left:auto; color:var(--d-t2); font-size:14px}
.pgd-notice{margin:9px 13px 0; padding:8px 11px; background:var(--d-primary-lt); border-radius:8px; font-size:10.5px; line-height:1.5; color:var(--d-primary)}

.pgd-msgs{flex:1; overflow:hidden; padding:12px 13px 6px; display:flex; flex-direction:column; gap:12px}
.pgd-msg{display:flex; animation:pgdUp .34s ease both}
.pgd-msg.me{justify-content:flex-end}
.pgd-msg > div{max-width:84%}
.pgd-bub{padding:9px 12px; font-size:12.5px; line-height:1.55; border-radius:4px 14px 14px 14px; background:#F3F4F6; color:var(--d-t2)}
.pgd-bub.me{border-radius:14px 4px 14px 14px; background:var(--d-primary); color:#fff}
.pgd-hint{margin-top:7px; font-size:11.5px; color:var(--d-t3); line-height:1.6}
.pgd-typing{display:inline-flex; gap:5px; align-items:center; padding:11px 14px; background:#F3F4F6; border-radius:4px 14px 14px 14px}
.pgd-typing i{width:6px; height:6px; border-radius:50%; background:var(--d-t3); animation:pgdBlink 1.2s ease infinite}
.pgd-typing i:nth-child(2){animation-delay:.2s}
.pgd-typing i:nth-child(3){animation-delay:.4s}

.pgd-steps{margin-top:6px; border-radius:4px 14px 14px 14px; overflow:hidden}
.pgd-steps div{display:flex; align-items:center; gap:9px; padding:8px 12px; background:var(--d-primary); animation:pgdSlide .3s ease both}
.pgd-steps div:nth-child(even){background:#3a63d4}
.pgd-steps div + div{border-top:1px solid rgba(255,255,255,.12)}
.pgd-steps b{width:17px; height:17px; border-radius:50%; background:rgba(255,255,255,.2); display:grid; place-items:center; font-size:8.5px; font-weight:700; color:#fff; flex-shrink:0}
.pgd-steps span{font-size:11.5px; font-weight:600; color:#fff; line-height:1.4}

.pgd-vid{margin-top:8px; border:1px solid var(--d-line); border-radius:12px; overflow:hidden; background:#fff; animation:pgdUp .4s ease both}
.pgd-thumb{position:relative; height:88px; background:linear-gradient(135deg,#1a4fa8,#326DD0 60%,#3a63d4); display:grid; place-items:center; gap:3px}
.pgd-thumb em{font-style:normal; font-size:26px; line-height:1}
.pgd-thumb u{text-decoration:none; font-size:8.5px; letter-spacing:1px; text-transform:uppercase; color:rgba(255,255,255,.7); font-weight:600}
.pgd-dur{position:absolute; left:8px; bottom:8px; background:rgba(0,0,0,.45); border-radius:4px; padding:2px 6px; font-size:9.5px; color:#fff; font-weight:700}
.pgd-vcap{padding:8px 10px 10px}
.pgd-vcap i{font-style:normal; display:block; font-size:9.5px; color:var(--d-primary); font-weight:600; margin-bottom:2px}
.pgd-vcap b{font-size:11.5px; font-weight:600; letter-spacing:-.01em}

.pgd-chips{display:flex; gap:6px; padding:0 13px 8px; overflow:hidden}
.pgd-chips button{flex-shrink:0; padding:6px 11px; background:#fff; border:1.5px solid var(--d-line); border-radius:20px; color:var(--d-t2); font-size:10.5px; white-space:nowrap; font-family:inherit}
.pgd-input{padding:9px 13px 24px; border-top:1px solid var(--d-line)}
.pgd-box{display:flex; gap:8px; align-items:center; background:var(--d-input); border:1.5px solid var(--d-line); border-radius:22px; padding:7px 7px 7px 14px}
.pgd-txt{flex:1; font-size:12.5px; color:var(--d-t1); min-height:19px; line-height:19px; overflow:hidden; white-space:nowrap}
.pgd-txt:empty::before{content:"What can I help you with?"; color:var(--d-t3)}
.pgd-txt::after{content:""; display:inline-block; width:1.5px; height:14px; background:var(--d-primary); vertical-align:-2px; margin-left:1px; opacity:0}
.pgd-input.caret .pgd-txt::after{opacity:1; animation:pgdCaret .9s step-end infinite}
.pgd-send{width:32px; height:32px; border-radius:50%; background:var(--d-line); color:var(--d-t3); display:grid; place-items:center; flex-shrink:0; transition:background .16s}
.pgd-send.hot{background:var(--d-primary); color:#fff}

/* ── Side rail: portfolio tokens ── */
.pgd-side{display:flex; flex-direction:column; gap:20px; max-width:380px; width:100%; align-items:flex-start}
.pgd-scenes{display:flex; flex-direction:column; gap:2px}
.pgd-scene{
  display:grid; grid-template-columns:auto 1fr; gap:13px; padding:12px 13px;
  align-items:start; transition:background .35s ease, border-color .35s ease;
  border:1.5px solid transparent;
}
.pgd-scene.on{background:var(--pgd-surface); border-color:var(--pgd-line)}
.pgd-tick{
  font-family:var(--font-mono, "Geist Mono", monospace); font-size:.68rem; font-weight:700;
  color:var(--pgd-ink-3); padding-top:2px; transition:color .35s ease;
}
.pgd-scene.on .pgd-tick{color:var(--pgd-accent)}
.pgd-scene h4{
  margin:0 0 3px; font-family:var(--font-sans, Inter, sans-serif); font-size:.93rem; font-weight:700;
  letter-spacing:-.01em; color:var(--pgd-ink-3); transition:color .35s ease;
}
.pgd-scene.on h4{color:var(--pgd-ink)}
.pgd-scene p{margin:0; font-family:var(--font-sans, Inter, sans-serif); font-size:.82rem; line-height:1.5; color:var(--pgd-ink-2)}

.pgd-replay{
  align-self:flex-start; display:inline-flex; align-items:center; gap:9px; cursor:pointer;
  font-family:var(--font-mono, "Geist Mono", monospace); font-size:.68rem;
  letter-spacing:.11em; text-transform:uppercase; font-weight:600;
  background:transparent; color:var(--pgd-ink-2);
  border:1px solid var(--pgd-line); padding:10px 18px; border-radius:999px;
  transition:border-color .18s ease, color .18s ease;
}
.pgd-replay:hover{border-color:var(--pgd-accent); color:var(--pgd-accent)}
.pgd-replay:focus-visible{outline:2px solid var(--pgd-accent); outline-offset:3px}

@keyframes pgdUp{from{opacity:0; transform:translateY(9px)} to{opacity:1; transform:translateY(0)}}
@keyframes pgdSlide{from{opacity:0; transform:translateX(-10px)} to{opacity:1; transform:translateX(0)}}
@keyframes pgdBlink{0%,100%{opacity:1} 50%{opacity:.2}}
@keyframes pgdCaret{50%{opacity:0}}

@media(prefers-reduced-motion:reduce){
  .pgd *, .pgd *::before, .pgd *::after{
    animation-duration:.001ms !important; animation-iteration-count:1 !important; transition-duration:.001ms !important;
  }
}

@media(max-width:899px){
  .pgd-stage{
    justify-content:center;
    text-align:left;
  }
  .pgd-side{
    max-width:420px;
  }
}
`
