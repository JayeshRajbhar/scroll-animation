"use client";
import "../app/globals.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const car = useRef<HTMLImageElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const textValueAdd = useRef<HTMLDivElement>(null);

  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const box4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const letters = self.selector?.(".value-letter") as HTMLElement[];
      const carEl = car.current;
      const trailEl = trail.current;
      const trackEl = track.current;
      const valueAddEl = textValueAdd.current;

      if (!carEl || !trailEl || !trackEl || !valueAddEl) return;

      const valueRect = valueAddEl.getBoundingClientRect();
      const letterOffsets = letters.map((letter) => letter.offsetLeft);

      const roadWidth = window.innerWidth;
      const carWidth = carEl.clientWidth || 150;
      const endX = roadWidth - carWidth / 3;

      gsap.to(carEl, {
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: trackEl,
        },
        x: endX,
        ease: "none",
        onUpdate: function () {
          const carX = (gsap.getProperty(carEl, "x") as number) + carWidth / 5;
          letters.forEach((letter, i) => {
            const letterX = valueRect.left + letterOffsets[i];
            if (carX >= letterX) {
              letter.style.opacity = "1";
            } else {
              letter.style.opacity = "0";
            }
          });
          gsap.set(trailEl, { width: carX });
        },
      });

      gsap.to(box1.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top+=400 top",
          end: "top+=600 top",
          scrub: true,
        },
        opacity: 1,
      });

      gsap.to(box2.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top+=600 top",
          end: "top+=800 top",
          scrub: true,
        },
        opacity: 1,
      });

      gsap.to(box3.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top+=800 top",
          end: "top+=1000 top",
          scrub: true,
        },
        opacity: 1,
      });

      gsap.to(box4.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top+=1000 top",
          end: "top+=1200 top",
          scrub: true,
        },
        opacity: 1,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="section">
      <div ref={track} className="track">
        <div className="road" id="road">
          <img
            ref={car}
            src="/McLaren 720S 2022 top view.png"
            alt="car"
            className="car"
          />
          <div ref={trail} className="trail"></div>
          <div ref={textValueAdd} className="value-add">
            <span className="value-letter">W</span>
            <span className="value-letter">E</span>
            <span className="value-letter">L</span>
            <span className="value-letter">C</span>
            <span className="value-letter">O</span>
            <span className="value-letter">M</span>
            <span className="value-letter">E</span>
            <span className="value-letter">&nbsp;</span>
            <span className="value-letter">I</span>
            <span className="value-letter">T</span>
            <span className="value-letter">Z</span>
            <span className="value-letter">F</span>
            <span className="value-letter">I</span>
            <span className="value-letter">Z</span>
            <span className="value-letter">Z</span>
          </div>
        </div>
        <div ref={box1} className="text-box" id="box1" style={{ top: "5%", right: "30%" }}>
          <span className="num-box">58%</span> Increase in pick up point use
        </div>
        <div ref={box2} className="text-box" id="box2" style={{ bottom: "5%", right: "35%" }}>
          <span className="num-box">23%</span> Decreased in customer phone calls
        </div>
        <div ref={box3} className="text-box" id="box3" style={{ top: "5%", right: "10%" }}>
          <span className="num-box">27%</span> Increase in pick up point use
        </div>
        <div ref={box4} className="text-box" id="box4" style={{ bottom: "5%", right: "12.5%" }}>
          <span className="num-box">40%</span> Decreased in customer phone calls
        </div>
      </div>
    </div>
  );
}
