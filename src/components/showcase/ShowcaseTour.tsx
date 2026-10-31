"use client";

import { useEffect, useRef, useState } from "react";
import type { Showcase } from "@/data/showcase";
import { CommandFrame, ShowcaseStage, WebsiteFrame } from "./ShowcaseStage";

/**
 * The /showcase/<slug> portal (ADR-0020).
 *
 * 1024px and up: their website sits in a sticky frame on the left; the
 * narration scrolls on the right. Whichever chapter is in the middle of the
 * screen moves the frame to the part of the site it is talking about and rings
 * it. After the last website chapter the frame slides over to the command
 * center. The move is TIME-based (760ms) and fires when a chapter changes; the
 * page scroll never scrubs it, so a fast scroll cannot leave it half-way.
 *
 * Under 1024px: no sticky frame. Each chapter carries its own small frame,
 * already showing its part of the site. That layout is pure CSS and is also
 * what a visitor with JavaScript off reads, chapter by chapter.
 */
export function ShowcaseTour({ show }: { show: Showcase }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = [...list.querySelectorAll<HTMLElement>("[data-chapter]")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.chapter));
        }
      },
      // A band across the middle of the screen: the chapter you are reading.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const ch = show.chapters[active];
  const firstCommand = show.chapters.findIndex((c) => c.kind === "command");
  const lastWeb = [...show.chapters].reverse().find((c) => c.kind === "website");
  const web = ch.kind === "website" ? ch : lastWeb;
  const deskWeb = web && web.kind === "website" ? web.desk : { y: 0, focus: null };

  return (
    <section className="sc-tour" aria-label={`${show.name}, section by section`}>
      <div className="sc-tour__sticky">
        <ShowcaseStage
          show={show}
          variant="desk"
          slide={ch.kind === "command" ? 1 : 0}
          web={{ y: deskWeb.y, focus: ch.kind === "website" ? deskWeb.focus : null, panMs: 760, lazy: false }}
          commandFocus={ch.kind === "command" ? ch.focus : null}
          live={ch.kind === "command"}
          slideMs={760}
        />
        <div className="sc-progress" aria-hidden="true">
          {show.chapters.map((c, i) => (
            <i key={c.title} data-on={i <= active ? "" : undefined} />
          ))}
        </div>
      </div>

      <ol className="sc-tour__chapters" ref={listRef}>
        {show.chapters.map((c, i) => (
          <ChapterItem key={c.title} show={show} index={i} active={i === active} breakBefore={i === firstCommand} />
        ))}
      </ol>
    </section>
  );
}

function ChapterItem({ show, index, active, breakBefore }: { show: Showcase; index: number; active: boolean; breakBefore: boolean }) {
  const c = show.chapters[index];
  const firstCommandIndex = show.chapters.findIndex((x) => x.kind === "command");
  return (
    <>
      {breakBefore ? (
        <li className="sc-tour__break-row" aria-hidden="false">
          <p className="sc-tour__break">Then the {show.commandName} we built behind it.</p>
        </li>
      ) : null}
      <li className="sc-tour__chapter" data-chapter={index} data-active={active ? "" : undefined}>
        <div className="sc-tour__frame">
          {c.kind === "website" ? (
            <WebsiteFrame show={show} variant="phone" y={c.phone.y} focus={c.phone.focus} panMs={0} />
          ) : (
            <CommandFrame show={show} variant="phone" focus={c.focus} quiet={index !== firstCommandIndex} />
          )}
        </div>
        <div>
          <p className="sc-tour__tag">{c.tag}</p>
          <h3 className="sc-tour__title">{c.title}</h3>
          <p className="sc-tour__body">{c.body}</p>
        </div>
      </li>
    </>
  );
}
