export default function Home() {
  return (
    <main className="page">
      <div className="content">
        <p className="eyebrow">A STUDENT-BUILT PROJECT</p>
        <h1>StudyQuest<span>.</span></h1>
        <div className="accent-line" aria-hidden="true" />
        <section className="about" aria-labelledby="about-title">
          <h2 id="about-title">ABOUT</h2>
          <p>
            StudyQuest is a learning game designed to make studying feel more
            engaging. We’re building an experience where students can practice
            what they’re learning and make progress through gameplay.
          </p>
        </section>
        <p className="footer-note">LEARN · PLAY · PROGRESS</p>
      </div>
    </main>
  );
}
