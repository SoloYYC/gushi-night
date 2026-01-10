"use client";

import { useEffect, useState } from "react";

export default function GushiNight() {
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    async function loadPoem() {
      try {
        // 1️⃣ 读取 all.json
        const res = await fetch("/poems/all.json");
        const allPoems = await res.json();

        // 2️⃣ 根据今天日期计算索引
        const today = new Date();
        const dayOfYear = Math.floor(
          (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
        );
        const index = dayOfYear % allPoems.length;

        // 3️⃣ 获取今天的诗
        const selected = allPoems[index];

        // 4️⃣ content 兼容数组或字符串
        const contentLines = Array.isArray(selected.content)
          ? selected.content
          : selected.content.split("\n");

        setPoem({
          title: selected.title,
          author: selected.author,
          dynasty: selected.dynasty,
          content: contentLines,
        });
      } catch (err) {
        console.error("加载诗失败:", err);
      }
    }

    loadPoem();
  }, []);

  if (!poem) return null;

  // ✅ 封装每个字的动画
  const renderAnimatedText = (text, baseDelay = 0) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="letter"
        style={{ animationDelay: `${baseDelay + i * 0.1}s` }}
      >
        {char}
      </span>
    ));

  // ✅ 计算所有延迟
  let delay = 0;
  const titleEl = renderAnimatedText(poem.title, delay);
  delay += poem.title.length * 0.1;

  const authorEl = renderAnimatedText(`【${poem.dynasty}】${poem.author}`, delay);
  delay += (poem.dynasty.length + poem.author.length + 2) * 0.1;

  const contentEls = poem.content.map((line, idx) => {
    const el = renderAnimatedText(line, delay);
    delay += line.length * 0.1;
    return (
      <div key={idx} className="poem-line">
        {el}
      </div>
    );
  });

  return (
    <div className="center">
      <div className="poem-title">{titleEl}</div>
      <div className="poem-author">{authorEl}</div>
      <div className="poem-content">{contentEls}</div>

      <style jsx>{`
        .center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: black;
          color: white;
          font-family: "Noto Serif SC", serif;
        }

        .poem-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .poem-author {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          opacity: 0.8;
        }

        .poem-line {
          font-size: 1.6rem;
          line-height: 2.5rem;
        }

        .letter {
          opacity: 0;
          display: inline-block;
          animation: fadeIn 0.6s forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
