import { useEffect, useRef, type ReactNode } from "react";

interface SceneFrameProps {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  art: ReactNode;
  tone?: "night" | "journal" | "map";
}

export function SceneFrame({ title, eyebrow, children, art, tone = "night" }: SceneFrameProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = `${title} · Kai's Adventure`;
    headingRef.current?.focus({ preventScroll: true });
  }, [title]);

  return (
    <main className={`kai-scene kai-scene--${tone}`}>
      <div className="kai-scene__art">{art}</div>
      <section className="kai-story-shelf" aria-labelledby="scene-heading">
        <div className="kai-story-shelf__copy">
          {eyebrow ? <p className="kai-eyebrow">{eyebrow}</p> : null}
          <h1 id="scene-heading" ref={headingRef} tabIndex={-1}>{title}</h1>
          {children}
        </div>
      </section>
    </main>
  );
}
