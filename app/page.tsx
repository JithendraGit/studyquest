"use client";

import { useEffect, useState } from "react";

const journey = [
  {
    number: "01",
    title: "Start with a subject",
    description:
      "Begin with what you need to learn. StudyQuest is being designed around the idea that academic practice can feel more like making progress in a game.",
    symbol: "↗",
  },
  {
    number: "02",
    title: "Work through the challenge",
    description:
      "Answer questions, build understanding, and keep moving. The game mechanics are still in development, so this is the direction—not a claim that every feature is finished.",
    symbol: "＋",
  },
  {
    number: "03",
    title: "Reach the next level",
    description:
      "Turn a big, intimidating study task into smaller steps you can actually begin. Progress should feel visible, earned, and worth continuing.",
    symbol: "✳",
  },
];

export default function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <main className="site-shell">
      <div className="reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="StudyQuest home">
          <span className="wordmark-mark">s<span>q</span></span>
          <span>studyquest</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#problem">The problem</a>
          <a href="#research">The research</a>
          <a href="#how-it-works">The idea</a>
        </nav>
        <a className="header-cta" href="#the-project">Meet the project <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> A student-built learning game</p>
          <h1>Somewhere between <em>“I should study”</em> and actually starting.</h1>
          <p className="hero-description">
            StudyQuest is an educational game project exploring a simple question: what if getting started with studying felt a little more like starting a game?
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#how-it-works">Explore the idea <span>↓</span></a>
            <a className="text-link" href="#research">Why this matters <span>↗</span></a>
          </div>
          <p className="hero-disclaimer">In development · Built by students, for learners</p>
        </div>

        <div className="hero-visual" aria-label="A visual path through study levels">
          <div className="game-window">
            <div className="game-window-top">
              <span className="window-dots"><i /><i /><i /></span>
              <span>STUDYQUEST / YOUR NEXT STEP</span>
              <span className="window-menu">•••</span>
            </div>
            <div className="game-window-body">
              <div className="game-meta"><span>LEARNING PATH</span><span>01 — 03</span></div>
              <h2>One question<br />at a time.</h2>
              <p className="game-subtitle">Small steps. Real progress.</p>
              <div className="level-path" aria-label="Three planned learning checkpoints">
                <div className="level-line"><span /></div>
                <div className="level-node completed"><span>✓</span><small>START</small></div>
                <div className="level-node active"><span>?</span><small>PRACTICE</small></div>
                <div className="level-node locked"><span>✦</span><small>NEXT LEVEL</small></div>
              </div>
              <div className="game-window-bottom"><span><b /> CONCEPT PREVIEW</span><span>01 / 03</span></div>
            </div>
          </div>
          <div className="floating-note note-left"><span className="note-icon">↗</span><span>Make the first<br />step smaller.</span></div>
          <div className="floating-note note-right"><span className="note-icon">✳</span><span>Progress you<br />can see.</span></div>
        </div>
        <a className="scroll-cue" href="#problem"><span className="scroll-cue-line" /> Scroll to explore</a>
      </section>

      <section className="problem-section" id="problem">
        <div className="section-label reveal"><span>01 / THE PROBLEM</span><span>IT ISN’T ALWAYS ABOUT WILLPOWER</span></div>
        <div className="problem-grid">
          <div className="problem-heading reveal">
            <p className="eyebrow">THE FAMILIAR LOOP</p>
            <h2>“I’ll do it<br /> <em>in five minutes.</em>”</h2>
          </div>
          <div className="problem-copy reveal">
            <p className="large-copy">A task feels big. Starting feels hard. So we put it off—and the task gets heavier in our minds.</p>
            <p>Procrastination is not simply laziness. Research describes it as a complex behavior that can be tied to avoiding uncomfortable feelings around a task. StudyQuest starts from the idea that making the first step clearer and more engaging may help students begin.</p>
            <a className="underlined-link" href="#research">Look at the research <span>↘</span></a>
          </div>
        </div>
        <div className="loop-visual reveal" aria-label="The procrastination loop">
          <div className="loop-step"><span>01</span><b>The task feels big</b><small>“Where do I even start?”</small></div>
          <span className="loop-arrow">→</span>
          <div className="loop-step loop-step-highlight"><span>02</span><b>Starting gets delayed</b><small>“I’ll do it later.”</small></div>
          <span className="loop-arrow">→</span>
          <div className="loop-step"><span>03</span><b>Pressure builds</b><small>Now it feels even bigger.</small></div>
        </div>
        <p className="small-note reveal">A simplified illustration of a common pattern—not a diagnosis or a description of every student.</p>
      </section>

      <section className="research-section" id="research">
        <div className="section-label reveal"><span>02 / WHAT RESEARCH SAYS</span><span>THE EVIDENCE, NOT THE HYPE</span></div>
        <div className="research-intro reveal">
          <p className="eyebrow">CAN GAME DESIGN SUPPORT LEARNING?</p>
          <h2>There’s a reason to explore it.<br /><em>Not a guarantee.</em></h2>
          <p>Research on gamified learning has found promising results overall, while also showing that outcomes depend on how the experience is designed and used.</p>
        </div>
        <div className="research-panel reveal">
          <div className="research-number"><span className="number-label">A 2024 META-ANALYSIS</span><strong>22</strong><span className="number-caption">experimental studies reviewed</span></div>
          <div className="research-detail">
            <div className="research-bar-heading"><span>Gamified learning</span><span>Positive overall effect</span></div>
            <div className="research-bar"><span /></div>
            <div className="research-bar-heading research-muted"><span>What it means</span><span>Potential, not proof</span></div>
            <p>A 2024 meta-analysis by Zeng and colleagues combined 22 experimental studies and reported a moderately positive overall effect on academic performance. The studies varied, and this result does not prove that every game—or StudyQuest specifically—will improve learning.</p>
            <a className="source-link" href="https://doi.org/10.1111/bjet.13471" target="_blank" rel="noreferrer">Read the published research <span>↗</span></a>
          </div>
        </div>
        <div className="research-bottom reveal">
          <span className="research-star">✳</span>
          <p><strong>Our takeaway:</strong> make learning more engaging, but keep learning itself at the center. The game should support the work—not distract from it.</p>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-label reveal"><span>03 / THE STUDYQUEST IDEA</span><span>FROM TASK TO PROGRESSION</span></div>
        <div className="how-heading reveal">
          <h2>Make the next step<br /><em>feel possible.</em></h2>
          <p>StudyQuest is being developed around level-based learning progression. Here’s the concept we’re working toward.</p>
        </div>
        <div className="journey-list">
          {journey.map((step) => (
            <article className="journey-step reveal" key={step.number}>
              <span className="step-number">{step.number}</span>
              <span className="step-symbol" aria-hidden="true">{step.symbol}</span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
              <span className="step-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
        <div className="progress-demo reveal">
          <div className="progress-demo-copy"><span className="eyebrow">THE GOAL</span><h3>Progress you can see.</h3><p>A large assignment can feel impossible when it’s one enormous task. Breaking it into smaller, visible steps can make it easier to know what to do next.</p></div>
          <div className="progress-demo-visual">
            <div className="demo-top"><span>YOUR LEARNING PATH</span><span>CONCEPT</span></div>
            <div className="demo-track"><span className="demo-track-fill" /></div>
            <div className="demo-checkpoints"><span className="done-check">✓<small>Begin</small></span><span className="done-check">✓<small>Practice</small></span><span className="current-check">03<small>Challenge</small></span><span className="future-check">04<small>Next</small></span></div>
            <div className="demo-foot"><span>Keep going, one step at a time.</span><span>03 / 04</span></div>
          </div>
        </div>
      </section>

      <section className="project-section" id="the-project">
        <div className="project-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="project-content reveal">
          <p className="eyebrow">A WORK IN PROGRESS, WITH A PURPOSE</p>
          <h2>Studying is hard enough.<br /><em>Starting shouldn’t be.</em></h2>
          <p>We’re building StudyQuest as a student-led project for the Congressional App Challenge. Our goal is to explore how game-inspired progression might make academic practice feel more approachable. The experience is still being built, and we’ll let the work—not big promises—show what it can become.</p>
          <a className="button button-light" href="#top">Back to the beginning <span>↑</span></a>
        </div>
        <footer className="site-footer"><a className="wordmark wordmark-light" href="#top"><span className="wordmark-mark">s<span>q</span></span><span>studyquest</span></a><span>Student-built · In development</span><a href="https://www.congressionalappchallenge.us/" target="_blank" rel="noreferrer">Congressional App Challenge ↗</a><span>© 2026 StudyQuest</span></footer>
      </section>
    </main>
  );
}
