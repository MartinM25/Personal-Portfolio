"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  bvx: number; bvy: number;
  r: number; rp: number;
  col: string;
  ps: number; pp: number;
  spawn: (init: boolean) => void;
  update: (t: number) => void;
  draw: () => void;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Assign to explicitly typed consts so closures below never see null
    const el: HTMLCanvasElement = canvas;
    const cx: CanvasRenderingContext2D = ctx;

    let W = 0, H = 0;
    let nodes: Node[] = [];
    let rafId: number;
    let t = 0;
    const mouse = { x: -9999, y: -9999 };
    let isMob = window.innerWidth < 768;

    function cfg() {
      return {
        count:      isMob ? 18 : 60,
        maxDist:    isMob ? 0  : 150,
        repulse:    !isMob,
        repulseR:   120,
        repulseStr: 0.5,
        speed:      isMob ? 0.15 : 0.22,
        rMin:       isMob ? 1.5  : 1.4,
        rMax:       isMob ? 3.0  : 3.2,
        clearAlpha: isMob ? 1.0  : 0.55,
      };
    }

    function makeNode(): Node {
      const node: Node = {
        x: 0, y: 0, vx: 0, vy: 0, bvx: 0, bvy: 0,
        r: 0, rp: 0, col: "", ps: 0, pp: 0,
        spawn(init: boolean) {
          const c = cfg();
          this.x  = Math.random() * W;
          this.y  = init ? Math.random() * H : H + 6;
          const angle = Math.random() * Math.PI * 2;
          const spd   = c.speed * (0.6 + Math.random() * 0.8);
          this.vx  = Math.cos(angle) * spd * 0.4;
          this.vy  = -Math.abs(Math.sin(angle) * spd);
          this.bvx = this.vx;
          this.bvy = this.vy;
          this.r   = c.rMin + Math.random() * (c.rMax - c.rMin);
          const roll = Math.random();
          if      (roll < 0.55) this.col = `rgba(200,80,42,${0.18 + Math.random() * 0.2})`;
          else if (roll < 0.80) this.col = `rgba(59,90,62,${0.18  + Math.random() * 0.15})`;
          else                  this.col = `rgba(122,110,95,${0.15 + Math.random() * 0.15})`;
          this.ps = 0.007 + Math.random() * 0.012;
          this.pp = Math.random() * Math.PI * 2;
        },
        update(t: number) {
          const c = cfg();
          this.rp = this.r + Math.sin(t * this.ps + this.pp) * 0.4;
          if (c.repulse) {
            const dx = this.x - mouse.x, dy = this.y - mouse.y;
            const d  = Math.hypot(dx, dy);
            if (d < c.repulseR && d > 0) {
              const f = (c.repulseR - d) / c.repulseR;
              this.vx += (dx / d) * f * c.repulseStr;
              this.vy += (dy / d) * f * c.repulseStr;
            }
          }
          this.vx += (this.bvx - this.vx) * 0.04;
          this.vy += (this.bvy - this.vy) * 0.04;
          this.x  += this.vx;
          this.y  += this.vy;
          if (this.x < -12) this.x = W + 12;
          if (this.x > W + 12) this.x = -12;
          if (this.y < -12) this.spawn(false);
        },
        draw() {
          cx.beginPath();
          cx.arc(this.x, this.y, this.rp, 0, Math.PI * 2);
          cx.fillStyle = this.col;
          cx.fill();
        },
      };
      node.spawn(true);
      return node;
    }

    function resize() {
      const hero = el.parentElement;
      if (!hero) return;
      W = el.width  = hero.offsetWidth;
      H = el.height = hero.offsetHeight;
      isMob = window.innerWidth < 768;
    }

    function initNodes() {
      nodes = Array.from({ length: cfg().count }, () => makeNode());
    }

    function tick() {
      rafId = requestAnimationFrame(tick);
      t++;
      const c = cfg();

      if (isMob) {
        cx.clearRect(0, 0, W, H);
      } else {
        cx.fillStyle = `rgba(245,240,232,${c.clearAlpha})`;
        cx.fillRect(0, 0, W, H);
      }

      if (!isMob) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < c.maxDist) {
              cx.beginPath();
              cx.moveTo(a.x, a.y);
              cx.lineTo(b.x, b.y);
              cx.strokeStyle = `rgba(200,80,42,${(1 - d / c.maxDist) * 0.25})`;
              cx.lineWidth = 0.65;
              cx.stroke();
            }
          }
        }
      }

      nodes.forEach(n => { n.update(t); n.draw(); });
    }

    resize();
    initNodes();
    tick();

    const onResize     = () => { resize(); initNodes(); };
    const onMouseMove  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none block"
    />
  );
}