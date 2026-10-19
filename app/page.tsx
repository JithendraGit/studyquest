"use client";

import { useEffect, useState } from "react";

const team = [
  {
    name: "Nathan Jithendra",
    role: "Co-creator",
    code: "PLAYER_01",
    bio: "Working on the StudyQuest website and bringing the project experience together.",
    symbol: "NJ",
  },
  {
    name: "Leon Yuan",
    role: "Co-creator",
    code: "PLAYER_02",
    bio: "Working with the team to build the StudyQuest learning game.",
    symbol: "LY",
  },
];

const bootLines = [
  "INITIALIZING STUDYQUEST...",
  "LOADING LEARNING MODULES...",
  "PREPARING PLAYER ONE...",
  "SYSTEM READY.",
];

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeMember, setActiveMember] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const start = window.setTimeout(() => setBooting(false), 2100);
    const tick = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(tick);
          return 100;
        }
        return Math.min(100, current + 5);
      });
    }, 85);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(tick);
    };
  }, []);

  return (
    <>
      {booting && (
        <div className="boot-screen" role="status" aria-label="Loading StudyQuest">
          <div className="boot-panel">
            <p className="boot-brand">STUDYQUEST<span>.</span></p>
            <p className="boot-label">STARTING YOUR ADVENTURE</p>
            <div className="boot-track" aria-hidden="true">
              <div className="boot-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="boot-meta"><span>{bootLines[Math.min(Math.floor(progress / 30), 3)]}</span><span>{progress}%</span></div>
            <div className="boot-blocks" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      )}

      <main className="page">
        <div className="content">
          <p className="eyebrow"><span className="status-dot" /> A STUDENT-BUILT PROJECT</p>
          <h1>StudyQuest<span>.</span></h1>
          <p className="tagline">LEARN. PLAY. PROGRESS.</p>
          <div className="accent-line" aria-hidden="true" />

          <section className="about" aria-labelledby="about-title">
            <h2 id="about-title"><span className="section-index">01</span> ABOUT</h2>
            <p>
              StudyQuest is a learning game designed to make studying more
              engaging. We’re building an experience where students can practice
              what they’re learning and make progress through gameplay.
            </p>
          </section>

          <section className="why" aria-labelledby="why-title">
            <h2 id="why-title"><span className="section-index">02</span> WHY WE’RE DOING THIS</h2>
            <p>
              Studying can feel repetitive, and it’s easy to lose motivation.
              We want to make practice feel more like playing a game: something
              students choose to come back to, while still helping them learn.
            </p>
          </section>

          <section className="team" aria-labelledby="team-title">
            <div className="section-heading">
              <h2 id="team-title"><span className="section-index">03</span> THE TEAM</h2>
              <span className="section-meta">2 MEMBERS</span>
            </div>
            <p className="team-intro">Meet the people behind the project. Select a profile to see more.</p>
            <div className="team-grid">
              {team.map((member, index) => (
                <button
                  type="button"
                  className={activeMember === index ? "member-card selected" : "member-card"}
                  key={member.code}
                  onClick={() => setActiveMember(activeMember === index ? null : index)}
                  aria-expanded={activeMember === index}
                >
                  <span className="member-top"><span>{member.code}</span><span className="member-indicator">{activeMember === index ? "−" : "+"}</span></span>
                  <span className="member-avatar" aria-hidden="true">{member.symbol}</span>
                  <span className="member-name">{member.name}</span>
                  <span className="member-role">{member.role}</span>
                  <span className="member-action">{activeMember === index ? "CLOSE PROFILE" : "VIEW PROFILE ↗"}</span>
                </button>
              ))}
            </div>
            {activeMember !== null && (
              <div className="profile-detail" role="region" aria-live="polite" aria-label={team[activeMember].name + " profile"}>
                <span className="detail-label">PROFILE_LOADED</span>
                <h3>{team[activeMember].name}</h3>
                <p>{team[activeMember].bio}</p>
              </div>
            )}
          </section>

          <div className="more-wrap">
            <button className="details-toggle" type="button" onClick={() => setShowDetails(!showDetails)} aria-expanded={showDetails}>
              <span>{showDetails ? "− HIDE PROJECT STATUS" : "+ PROJECT STATUS"}</span>
              <span>{showDetails ? "CLOSE" : "OPEN"}</span>
            </button>
            {showDetails && (
              <div className="status-panel">
                <p><span className="status-dot" /> IN DEVELOPMENT</p>
                <p>StudyQuest is being built by our team. We’re working toward making practice feel more interactive through gameplay.</p>
              </div>
            )}
          </div>
          <footer className="footer-note"><span>STUDYQUEST / 001</span><span>MADE BY STUDENTS</span></footer>
        </div>
      </main>
    </>
  );
}
