"use client";

import { useEffect, useState } from "react";

const chapters = [
  {
    id: 0,
    label: "THE MOMENT BEFORE",
    title: "The task is still a wall.",
    copy: "A blank page. Ten tabs. A deadline somewhere in the back of your mind. The hardest part can be deciding where to begin.",
    note: "Everything feels like it needs to happen at once.",
  },
  {
    id: 1,
    label: "THE FIRST MOVE",
    title: "Make the first step tiny.",
    copy: "Not the whole chapter. One question. One worked example. One small move that turns “later” into “started.”",
    note: "You only need to decide what happens next.",
  },
  {
    id: 2,
    label: "THE QUEST TAKES SHAPE",
    title: "Let progress become visible.",
    copy: "A good game gives you a clear next move. Studying can start that way, too.",
    note: "The point is progress you can actually use.",
  },
];

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [chapter, setChapter] = useState(0);
  const [choice, setChoice] = useState<"later" | "start" | null>(null);
  const [questStarted, setQuestStarted] = useState(false);
  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY, max) * 100)) : 0);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const value = entry.target.getAttribute("data-chapter");
        if (value !== null) setChapter(Number(value));
        entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.45 });
    document.querySelectorAll("[data-chapter], .reveal").forEach((node) => observer.observe(node));
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <main className={`site-shell chapter-${chapter}`}>
      <div className="reading-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress, 100})` }} /></div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="StudyQuest home"><span className="wordmark-mark">s<span>q</span></span><span>studyquest</span></a>
        <nav aria-label="Main navigation"><a href="#friction">The feeling</a><a href="#research">The evidence</a><a href="#quest">The idea</a></nav>
        <a className="header-cta" href="#quest">Find your next step <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-atmosphere" aria-hidden="true"><span className="ambient-orb orb-one" /><span className="ambient-orb orb-two" /><span className="ambient-grid" /></div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> A different way to approach studying</p>
          <h1>The hardest level is often <em>getting started.</em></h1>
          <p className="hero-description">That moment when you know you should study, but somehow everything else feels easier. StudyQuest is exploring a different way into that moment.</p>
          <div className="hero-actions"><a className="button button-dark" href="#friction">Enter the story <span>↓</span></a><a className="text-link" href="#research">See what research says <span>↗</span></a></div>
          <p className="hero-disclaimer">Start small. Keep going.</p>
        </div>
        <div className="hero-visual" aria-label="Illustration of a study desk becoming a game path">
          <div className="hero-scene">
            <div className="scene-sun" />
            <div className="scene-window"><span /><span /><span /></div>
            <div className="scene-shelf" />
            <div className="scene-lamp"><i /><b /></div>
            <div className="scene-desk" />
            <div className="scene-paper paper-back" /><div className="scene-paper paper-front"><span className="paper-line long" /><span className="paper-line" /><span className="paper-line short" /><span className="paper-check">✓</span></div>
            <div className="scene-pencil" />
            <div className="scene-path"><span /><span /><span /></div>
            <div className="scene-label label-one">THE FIRST STEP</div><div className="scene-label label-two">YOUR NEXT MOVE ↗</div>
            <div className="scene-caption"><span>STUDYQUEST</span><span>BEGIN WHERE YOU ARE</span></div>
          </div>
          <div className="scene-stamp"><span>MAKE</span><strong>ONE</strong><span>MOVE</span></div>
        </div>
        <a className="scroll-cue" href="#friction"><span className="scroll-cue-line" /> Scroll to enter</a>
      </section>

      <section className="friction-section" id="friction">
        <div className="section-label reveal"><span>01, THE FAMILIAR FEELING</span><span>THE MOMENT BEFORE YOU BEGIN</span></div>
        <div className="friction-intro reveal"><p className="eyebrow">YOU KNOW THE LOOP</p><h2>“I’ll start in<br /><em>five minutes.”</em></h2><p>And then the evening disappears. The task may matter to you, but starting it still feels strangely difficult.</p></div>
        <div className="choice-stage reveal">
          <div className="choice-copy"><span className="stage-number">TRY IT FOR YOURSELF</span><h3>Your assignment is waiting.</h3><p>You have a chapter to review. You don’t need to finish it right now. You just need to choose what happens next.</p></div>
          <div className="choice-card">
            <div className="choice-card-top"><span>TONIGHT'S QUEST</span><span className="quest-status"><i /> NOT STARTED</span></div>
            <div className="quest-paper"><span className="paper-overline">TONIGHT’S TASK</span><strong>Review one chapter</strong><span className="quest-detail">Estimated time: your call</span><div className="task-scribble" aria-hidden="true">?</div></div>
            <p className="choice-question">What would you do?</p>
            <div className="choice-actions"><button className={choice === "later" ? "choice-button selected" : "choice-button"} onClick={() => { setChoice("later"); setQuestStarted(false); }}><span>↻</span><span><b>Maybe later</b><small>Leave it for later</small></span></button><button className={choice === "start" ? "choice-button selected" : "choice-button"} onClick={() => { setChoice("start"); setQuestStarted(true); }}><span>↗</span><span><b>Start with one question</b><small>Turn it into one action</small></span></button></div>
            {choice && <div className={`choice-feedback ${choice}`} aria-live="polite">{choice === "later" ? <><strong>The task is still waiting.</strong><span>No guilt. Try making the task smaller: open your notes, find one question, or work for just five minutes.</span></> : <><strong>{questStarted ? "Quest started: one question." : "Ready when you are."}</strong><span>You do not need to finish everything right now. Pick one question and give it five focused minutes.</span><span className="mini-progress"><i /></span></>}</div>}
          </div>
        </div>
        
      </section>

      <section className="scroll-story" aria-label="The StudyQuest concept">
        <div className="story-sticky">
          <div className="story-backdrop" aria-hidden="true"><div className="story-moon" /><div className="story-horizon" /><div className="story-terrain terrain-back" /><div className="story-terrain terrain-front" /><svg viewBox="0 0 600 480" className="story-route" role="presentation"><path d="M60 405 C90 340 150 375 190 300 S270 250 300 205 S380 170 410 115 S485 100 535 42" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" /><circle cx="60" cy="405" r="7" /><circle cx="190" cy="300" r="7" /><circle cx="300" cy="205" r="7" /><circle cx="410" cy="115" r="7" /><circle cx="535" cy="42" r="9" /></svg><div className="story-landmark landmark-one">BEGIN</div><div className="story-landmark landmark-two">PRACTICE</div><div className="story-landmark landmark-three">LEVEL UP</div></div>
          <div className="story-overlay"><span>STUDYQUEST, THE JOURNEY</span><span>FOLLOW THE PATH</span></div>
        </div>
        <div className="story-chapters">
          {chapters.map((item) => <article className="story-chapter" data-chapter={item.id} key={item.id}><span className="chapter-index">0{item.id + 1} ,  {item.label}</span><h2>{item.title}</h2><p>{item.copy}</p><div className="chapter-note"><span>✳</span>{item.note}</div></article>)}
        </div>
      </section>

      <section className="research-section" id="research">
        <div className="section-label reveal"><span>02, THE EVIDENCE</span><span>THE RESEARCH, NOT THE HYPE</span></div>
        <div className="research-intro reveal"><p className="eyebrow">CAN GAME DESIGN SUPPORT LEARNING?</p><h2>There’s a reason to explore it.<br /><em>Not a guarantee.</em></h2><p>A meta-analysis found a positive average effect on academic performance. The useful question is how game elements are designed, and whether they support learning instead of competing with it.</p></div>
        <div className="research-panel reveal">
          <div className="research-number"><span className="number-label">A 2024 META-ANALYSIS</span><strong>22</strong><span className="number-caption">experimental studies reviewed</span></div>
          <div className="research-detail"><div className="evidence-stamp"><span>OVERALL FINDING</span><strong>Positive effect</strong><i>Across the studies reviewed</i></div><p>A 2024 meta-analysis by Zeng and colleagues combined 22 experimental studies involving 3,144 participants. It reported a positive overall effect on academic performance (Hedges’ g = 0.782). Results varied across studies, so this is evidence worth exploring, not proof that every game will help every learner.</p><a className="source-link" href="https://doi.org/10.1111/bjet.13471" target="_blank" rel="noreferrer">Read the published research <span>↗</span></a></div>
        </div>
        <div className="research-bottom reveal"><span className="research-star">✳</span><p><strong>Our principle:</strong> the game should make learning easier to approach, not become another distraction from learning.</p></div>
      </section>

      <section className="quest-section" id="quest">
        <div className="section-label reveal"><span>03, THE IDEA</span><span>LEARNING AS PROGRESSION</span></div>
        <div className="quest-heading reveal"><div><p className="eyebrow">A CLEARER WAY TO BEGIN</p><h2>One step is still<br /><em>forward.</em></h2></div><p>Turn a vague “I need to study” into one concrete action. Then give yourself a chance to do it.</p></div>
        <div className="quest-map reveal"><div className="map-header"><span>YOUR LEARNING PATH</span><span>YOUR NEXT THREE MOVES</span></div><div className="map-canvas"><div className="map-line" /><div className="map-node node-start"><span>01</span><b>BEGIN</b><small>Choose one task</small></div><div className="map-node node-middle"><span>02</span><b>PRACTICE</b><small>Build understanding</small></div><div className="map-node node-end"><span>03</span><b>ADVANCE</b><small>Take the next step</small></div><div className="map-annotation">YOU DON'T NEED TO SEE THE WHOLE PATH TO BEGIN.</div></div><div className="map-footer"><span>DESIGNED AROUND SMALLER STEPS</span><span>ONE STEP AT A TIME</span></div></div>
        <div className="principle-row reveal"><span className="principle-symbol">↗</span><div><h3>Keep the learning at the center.</h3><p>Points, levels, and progress only matter if they help you learn. A game should reward the work, not replace it.</p></div></div>
      </section>

      <section className="project-section" id="project"><div className="project-orbit" aria-hidden="true"><span /><span /><span /></div><div className="project-content reveal"><p className="eyebrow">WHY THIS MATTERS</p><h2>Less stuck at the start.<br /><em>More room to learn.</em></h2><p>Studying can feel difficult before the learning even begins. StudyQuest asks a simple question: what if the next useful step felt easier to see, and easier to take?</p><a className="button button-light" href="#top">Return to the beginning <span>↑</span></a></div><footer className="site-footer"><a className="wordmark wordmark-light" href="#top"><span className="wordmark-mark">s<span>q</span></span><span>studyquest</span></a><span>Make a start. Find your rhythm.</span><a href="https://www.congressionalappchallenge.us/" target="_blank" rel="noreferrer">Congressional App Challenge ↗</a><span>© 2026 StudyQuest</span></footer></section>
    </main>
  );
}
