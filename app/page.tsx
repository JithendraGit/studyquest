"use client";

import { useEffect, useState } from "react";

const team = [
  {
    name: "Nathan Jithendra",
    role: "Co-creator",
    bio: "Working on the StudyQuest website and bringing the project experience together.",
    symbol: "NJ",
  },
  {
    name: "Leon Yuan",
    role: "Co-creator",
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
            <p className="boot-brand">StudyQuest<span>.</span></p>
            <p className="boot-label">STARTING UP...</p>
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
          <h1>StudyQuest<span>.</span></h1>
          <p className="tagline">LEARN. PLAY. PROGRESS.</p>
          <div className="accent-line" aria-hidden="true" />

          <section className="about" aria-labelledby="about-title">
            <h2 id="about-title">About</h2>
            <p>
              StudyQuest is a learning game designed to make studying more
              engaging. We’re building an experience where students can practice
              what they’re learning and make progress through gameplay.
            </p>
          </section>

          <section className="why" aria-labelledby="why-title">
            <h2 id="why-title">Why we’re doing this</h2>
            <p>
              Studying can feel repetitive, and it’s easy to lose motivation.
              We want to make practice feel more like playing a game: something
              students choose to come back to, while still helping them learn.
            </p>
          </section>

          <section className="team" aria-labelledby="team-title">
            <div className="section-heading">
              <h2 id="team-title">The team</h2>
            </div>
            <div className="team-grid">
              {team.map((member, index) => (
                <button
                  type="button"
                  className={activeMember === index ? "member-card selected" : "member-card"}
                  key={member.name}
                  onClick={() => setActiveMember(activeMember === index ? null : index)}
                  aria-expanded={activeMember === index}
                >
                  <span className="member-avatar" aria-hidden="true">{member.symbol}</span>
                  <span className="member-name">{member.name}</span>
                  <span className="member-role">{member.role}</span>
                  <span className="member-action">{activeMember === index ? "CLOSE" : "MORE"}</span>
                </button>
              ))}
            </div>
            {activeMember !== null && (
              <div className="profile-detail" role="region" aria-live="polite" aria-label={team[activeMember].name + " profile"}>
                <h3>{team[activeMember].name}</h3>
                <p>{team[activeMember].bio}</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
