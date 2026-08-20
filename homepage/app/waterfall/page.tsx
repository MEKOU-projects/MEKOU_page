"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// 必: export default が必要です
export default function WaterfallPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const lines = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      length: Math.random() * 50 + 10,
      speed: Math.random() * 3 + 1.5,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(139, 26, 26, 0.35)";
      ctx.lineWidth = 1;

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x, line.y + line.length);
        ctx.stroke();

        line.y += line.speed;
        if (line.y > canvas.height) {
          line.y = -line.length;
          line.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0C0C0D] text-[#D1CEC7] p-8 font-serif overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col justify-between min-h-[90vh]">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <h1 className="text-sm font-mono tracking-[0.3em] uppercase">
            // WATERFALL_SCENE
          </h1>
          <Link
            href="/"
            className="text-xs font-mono border border-zinc-700 px-3 py-1 hover:border-red-800 hover:text-red-700 transition-colors"
          >
            [ RETURN ]
          </Link>
        </div>

        <div className="text-center my-auto">
          <span className="text-[10px] font-mono text-red-800 tracking-[0.5em] block mb-2">
            ┼ BOUNDARY ┼
          </span>
          <h2 className="text-3xl md:text-5xl tracking-[0.4em] uppercase font-bold">
            瀧
          </h2>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-zinc-600 border-t border-zinc-800 pt-4">
          <span>FLOW_RATE: HIGH</span>
          <span>SYS.LOC: WATERFALL</span>
        </div>
      </div>
    </main>
  );
}