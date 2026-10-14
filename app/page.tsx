"use client";

import { useEffect, useState } from "react";

const steps = [
  { title: "Set the scene", detail: "Put your notes where you can reach them.", icon: "01" },
  { title: "Find one question", detail: "Choose a single problem or idea to work on.", icon: "02" },
  { title: "Try before you check", detail: "Give it a real attempt, then review what you missed.", icon: "03" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [task, setTask] = useState("");
  const [subject, setSubject] = useState("Any subject");
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState<number[]>([]);
  const [showPlan, setShowPlan] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    const startedAt = Date.now();
    const id = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setLoadProgress(Math.min(100, Math.round((elapsed / 2100) * 100)));
      if (elapsed >= 2400) setIsLoading(false);
    }, 50);
    return () => window.clearInterval(id);
  }, [isLoading]);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const id = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(id);
  }, [running, seconds]);

  const clock = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const completed = done.length;
  const beginQuest = () => {
    setTask(task.trim() || "Review one topic");
    setShowPlan(true);
    setStarted(true);
    document.getElementById("quest-console")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="sq-app">
      {isLoading && <div className="game-loader" role="dialog" aria-label="StudyQuest loading screen"><div className="loader-top"><span className="loader-mark">sq<span>✳</span></span><span>STUDYQUEST</span><span className="loader-version">YOUR NEXT MOVE AWAITS</span></div><div className="loader-scene" aria-hidden="true"><div className="loader-window"><i /><i /><i /><i /></div><div className="loader-shelf" /><div className="loader-book book-one" /><div className="loader-book book-two" /><div className="loader-book book-three" /><div className="loader-pencil" /><div className="loader-paper"><span>TONIGHT'S PLAN</span><i /><i /><i /><b>ONE STEP AT A TIME</b></div><div className="loader-path"><span /><span /><span /><span /></div><div className="loader-spark spark-one">✳</div><div className="loader-spark spark-two">✦</div></div><div className="loader-bottom"><div><p className="loader-kicker">EVERY QUEST BEGINS SOMEWHERE</p><h2>Make room<br />for <em>one small win.</em></h2><p className="loader-copy">Take a breath. Pick a starting point. The rest can wait a moment.</p></div><div className="loader-progress-area"><div className="loader-progress-label"><span>{loadProgress < 100 ? "PREPARING YOUR STUDY SPACE" : "READY WHEN YOU ARE"}</span><span>{loadProgress}%</span></div><div className="loader-track"><span style={{width: `${loadProgress}%`}} /></div><button className="loader-enter" onClick={() => setIsLoading(false)}>Enter StudyQuest <span>↗</span></button><p className="loader-tip">TIP · You only need to know your next step.</p></div></div><div className="loader-footer"><span>STUDYQUEST</span><span>START SMALL. KEEP GOING.</span><span>✳</span></div></div>}

      <header className="sq-nav">
        <a className="sq-brand" href="#home" aria-label="StudyQuest home"><span className="sq-brand-icon">s<span>q</span></span><span>studyquest</span></a>
        <div className="sq-nav-center"><span className="nav-spark">✳</span> YOUR STUDY, ONE MOVE AT A TIME</div>
        <a className="sq-nav-link" href="#why">Why it works <span>↗</span></a>
      </header>

      <section className="sq-hero" id="home">
        <div className="sq-hero-copy">
          <div className="sq-kicker"><span className="live-dot" /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h1>You don't need<br />the whole plan.<br /><em>Just the next move.</em></h1>
          <p className="sq-lede">That assignment you've been putting off? It doesn't have to be finished right now. It just has to become something you can start.</p>
          <a className="sq-primary" href="#start">Choose your first move <span>↘</span></a>
          <div className="sq-hero-foot"><span>01 / BEGIN</span><span>SMALL STEPS COUNT</span></div>
        </div>
        <div className="sq-world" aria-label="A quiet study desk with an open notebook, pencil, and a cup">
          <div className="desk-wall">
            <span className="desk-note">MONDAY<br />finish the<br />last 3 questions</span>
            <div className="desk-shelf"><i /><i /><i /><i /></div>
            <div className="desk-window"><span /></div>
            <span className="desk-pin">✳</span>
          </div>
          <div className="desk-surface">
            <div className="desk-book book-under" />
            <div className="desk-book book-top"><span>NOTES</span><i /><i /><i /><i /><b>keep going</b></div>
            <div className="desk-pencil" />
            <div className="desk-cup"><span /></div>
            <div className="desk-caption"><span>TONIGHT'S PLAN</span><span>JUST START WITH ONE</span></div>
          </div>
        </div>
      </section>

      <section className="sq-start" id="start">
        <div className="section-rail"><span>01</span><span>THE STARTING POINT</span><i /></div>
        <div className="start-grid">
          <div className="start-copy"><p className="sq-kicker">LET'S MAKE IT SMALLER</p><h2>What's the thing<br />you keep <em>putting off?</em></h2><p>Don't plan your whole evening. Name one thing you want to make a little progress on. We'll turn it into a short quest.</p><div className="hand-note">One thing. That's enough. <span>↗</span></div></div>
          <div className="task-board">
            <div className="board-top"><span><i /> QUEST BOARD</span><span>YOUR SPACE</span></div>
            <label className="field-label" htmlFor="task">THE TASK ON YOUR MIND</label>
            <textarea id="task" value={task} onChange={(e) => setTask(e.target.value)} placeholder="e.g. understand quadratic equations…" rows={2} maxLength={180} />
            <label className="field-label" htmlFor="subject">WHAT ARE YOU WORKING ON?</label>
            <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}><option>Any subject</option><option>Math</option><option>Science</option><option>Reading</option><option>Writing</option><option>Computer science</option><option>History</option><option>Other</option></select>
            <button className="sq-primary board-button" onClick={beginQuest}>Build my first quest <span>↗</span></button>
            <div className="board-bottom"><span>NO PERFECT PLAN NEEDED</span><span>JUST A BEGINNING</span></div>
          </div>
        </div>
      </section>

      <section className="sq-console" id="quest-console">
        <div className="section-rail section-rail-light"><span>02</span><span>YOUR QUEST</span><i /></div>
        <div className="console-heading"><div><p className="sq-kicker">A SIMPLE WAY TO GET STARTED</p><h2>Make a move.<br /><em>Change the map.</em></h2></div><p>Progress isn't finishing everything. It's doing the next useful thing.</p></div>
        <div className="quest-console-grid">
          <div className="quest-panel">
            <div className="panel-top"><span>ACTIVE QUEST</span><span className={started ? "quest-chip active" : "quest-chip"}>{started ? "IN PLAY" : "READY WHEN YOU ARE"}</span></div>
            <div className="quest-title-row"><div className="quest-emblem">✳</div><div><span className="task-subject">{subject.toUpperCase()}</span><h3>{started ? task : "Your first small step"}</h3></div></div>
            <p className="quest-prompt">{started ? "Here's a way into it. Check off each move as you go. You can adapt the plan to fit your actual assignment." : "Build your quest above, then come back here. Or use this starter plan to get moving now."}</p>
            <div className="step-list">{steps.map((step, index) => <button key={step.icon} className={done.includes(index) ? "quest-step step-done" : "quest-step"} onClick={() => setDone((old) => old.includes(index) ? old.filter((n) => n !== index) : [...old, index])}><span className="step-check">{done.includes(index) ? "✓" : step.icon}</span><span className="step-words"><b>{step.title}</b><small>{step.detail}</small></span><span className="step-arrow">{done.includes(index) ? "DONE" : "＋"}</span></button>)}</div>
            <div className="quest-progress-label"><span>YOUR MOMENTUM</span><span>{completed} OF 3 MOVES</span></div><div className="quest-progress-track"><span style={{ width: `${completed / 3 * 100}%` }} /></div>
            {completed === 3 && <div className="completion-note" role="status"><span>✦</span><div><b>Quest checkpoint reached.</b><p>You made space for the work. Choose your next question when you're ready.</p></div></div>}
          </div>
          <div className="timer-panel">
            <div className="timer-top"><span>THE FIVE-MINUTE START</span><span>FOCUS MODE</span></div>
            <p className="timer-intro">No pressure to finish.<br />Just give it five minutes.</p>
            <div className={seconds === 0 ? "timer-dial timer-finished" : "timer-dial"}><div className="timer-ring" /><span className="timer-time">{clock}</span><span className="timer-caption">{seconds === 0 ? "TIME WELL SPENT" : running ? "ONE THING AT A TIME" : "WHEN YOU'RE READY"}</span></div>
            <div className="timer-actions"><button className="timer-main" onClick={() => { if (seconds === 0) setSeconds(300); setRunning((v) => seconds === 0 ? true : !v); }}>{seconds === 0 ? "Start another round ↗" : running ? "Pause the clock Ⅱ" : seconds === 300 ? "Start five minutes ↗" : "Keep going ↗"}</button><button className="timer-reset" onClick={() => { setRunning(false); setSeconds(300); }}>Reset</button></div>
            <p className="timer-footnote">{seconds === 0 ? "You showed up. That counts." : "Put one problem in front of you. Let the rest wait."}</p>
          </div>
        </div>
      </section>

      <section className="sq-research" id="why">
        <div className="section-rail"><span>03</span><span>THE THINKING BEHIND IT</span><i /></div>
        <div className="research-grid"><div><p className="sq-kicker">GAME DESIGN, WITH A PURPOSE</p><h2>Make the next step<br /><em>easier to see.</em></h2><p className="research-lede">Game elements can help make goals and progress visible. But they only matter when they support the learning itself.</p><a className="research-citation" href="https://doi.org/10.1111/bjet.13471" target="_blank" rel="noreferrer"><span>READ THE RESEARCH</span><b>Zeng et al. · 2024 meta-analysis ↗</b></a></div><div className="research-card"><div className="research-card-top"><span>RESEARCH NOTE 001</span><span>EDUCATIONAL GAMIFICATION</span></div><strong className="research-number">22</strong><h3>experimental studies reviewed</h3><div className="research-rule" /><p>A 2024 meta-analysis of 22 experimental studies found a positive average effect of gamification on academic performance. The studies varied, and that result does not prove every game helps every learner.</p><div className="research-card-foot"><span>LEARNING FIRST</span><span>PROGRESS WITH PURPOSE ✳</span></div></div></div>
      </section>

      <footer className="sq-footer"><a className="sq-brand footer-brand" href="#home"><span className="sq-brand-icon">s<span>q</span></span><span>studyquest</span></a><p>Start where you are. The next step is enough.</p><a href="#home">BACK TO THE BEGINNING ↑</a></footer>
    </main>
  );
}
