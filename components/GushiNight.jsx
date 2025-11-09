"use client";  // ✅ 这一行必须加

import { useEffect, useState } from "react";

// 这里可以替换为你自己的古诗库
const POEMS = [
  "床前明月光，疑是地上霜。",
  "举头望明月，低头思故乡。",
  "春眠不觉晓，处处闻啼鸟。",
  "夜来风雨声，花落知多少。"
];

export default function GushiNight() {
  const [poem, setPoem] = useState("");

  useEffect(() => {
    // 每天随机选一首诗
    const today = new Date();
    const index = today.getDate() % POEMS.length;
    setPoem(POEMS[index]);
  }, []);

  return (
    <div className="center">
      {poem.split("").map((char, i) => (
        <span
          key={i}
          className="letter"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
