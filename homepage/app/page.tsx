"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";


export default function Home() {
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
  
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main className={`min-h-screen ${darkMode ? "bg-[#CaCaD9]" : "bg-[#1A181a]"} p-8 flex flex-col gap-8`}>
    <div>
        <h1 className="text-2xl font-bold text-center font-serif">MEKOU Home Page</h1>
    </div>

    <div className="flex top-6 right-6 justify-end">
      <button onClick={() => setDarkMode(!darkMode)}
        className="text-xs font-mono tracking-widest border border-current px-3 py-1.5 hover:opacity-70 transition-opacity uppercase"
        >{darkMode ? "Light Mode" : "Dark Mode"}
        </button>
    </div>

    <div className="flex items-center w-full gap-4">
      <span className="text-xs text-red-800 font-mono">┼</span>
      <h2 className="font-serif text-lg tracking-[0.2em] text-zinc-200 uppercase">
        WATERFALL
      </h2>
      <span className="text-xs text-red-800 font-mono">┼</span>
      <div className="flex-1 border-t border-zinc-800" />
    </div>

    {/* 鳥居全体を包む大きな箱 */}
<div className="w-full max-w-md flex left flex flex-col items-center my-8">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

  {/* 1. 笠木（一番上の横木：5pxの赤線） */}
  <div className="w-full h-[5px] bg-red-800 flex justify-between items-center px-1">
    <span className="text-[10px] font-mono text-red-800 leading-none">┼</span>
    <span className="text-[10px] font-mono text-red-800 leading-none">┼</span>
  </div>

  {/* 2. 額束（中央の看板）と 柱（左右）が交差する中間エリア */}
  <div className="w-[85%] flex justify-between items-center relative py-3">
    {/* 左柱の通過点 */}
    <div className="w-[5px] h-full bg-red-800/40 absolute left-0 top-0" />

    {/* 中央の額束（文字） */}
    <div className="mx-auto px-5 py-1 border-x border-red-800/40">
      <span className="font-serif text-xs tracking-[0.5em] uppercase">
        PORTAL
      </span>
    </div>

    {/* 右柱の通過点 */}
    <div className="w-[5px] h-full bg-red-800/40 absolute right-0 top-0" />
  </div>

  {/* 3. 貫（二番目の横木：少し短い1pxの赤線） */}
  <div className="w-[85%] h-[5px] bg-red-800/60" />

  {/* 4. 2本の柱（下へ伸びる左右の縦線） */}
  <div className="w-[85%] flex justify-between h-16">
    {/* 左柱 */}
    <div className="w-[5px] h-full bg-red-800/40" />
    {/* 右柱 */}
    <div className="w-[5px] h-full bg-red-800/40" />
  </div>

</div>

    <div className="flex items-center gap-3">
      {/* 左側の赤いアクセント縦線 */}
      <div className="w-[2px] h-6 bg-red-800" />
      <h2 className="font-serif text-xl tracking-widest text-zinc-100 uppercase">
        01 / TORII
      </h2>
    </div>

    <div className="border-y border-zinc-800/80 py-2 my-4 w-full flex flex-col justify-between gap-2">
      <h2 className="font-serif text-sm tracking-[0.4em] text-zinc-300 uppercase flex left">
        ARCHIVE
      </h2>
      <button className="text-xs font-nomo flex transition-colors">page1</button>
      <button className="text-xs font-mono flex transition-colors">page2</button>
      <button className="text-xs font-mono flex transition-colors">page3</button>
      <span className="text-[10px] text-zinc-600 font-mono">[ 02 ]</span>

    </div>

    <div className="flex justify-center my-6">
      <Link href="/waterfall">
        <button className="text-xs flex right font-mono tracking-widest border border-current px-3 py-1.5 hover:opacity-70 transition-opacity uppercase">
          View Waterfall
        </button>
        <span className="w-1.5 h-1.5 bg-red-800 group-hover:scale-125 transition-transform" />
      </Link>
    </div>

    </main>
  );
}
