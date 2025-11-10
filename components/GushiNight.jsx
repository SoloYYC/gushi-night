"use client";

import { useEffect, useState } from "react";

// ✅ 每首诗包含 标题、作者、朝代、正文（多行）
const POEMS = [
  {
    title: "静夜思",
    author: "李白",
    dynasty: "唐",
    content: [
      "床前明月光，疑是地上霜。",
      "举头望明月，低头思故乡。"
    ]
  },
  {
    title: "春晓",
    author: "孟浩然",
    dynasty: "唐",
    content: [
      "春眠不觉晓，处处闻啼鸟。",
      "夜来风雨声，花落知多少。"
    ]
  },
  {
    title: "登鹳雀楼",
    author: "王之涣",
    dynasty: "唐",
    content: [
      "白日依山尽，黄河入海流。",
      "欲穷千里目，更上一层楼。"
    ]
  },
  {
    title: "望庐山瀑布",
    author: "李白",
    dynasty: "唐",
    content: [
      "日照香炉生紫烟，遥看瀑布挂前川。",
      "飞流直下三千尺，疑是银河落九天。"
    ]
  },
  {
    title: "黄鹤楼送孟浩然之广陵",
    author: "李白",
    dynasty: "唐",
    content: [
      "故人西辞黄鹤楼，烟花三月下扬州。",
      "孤帆远影碧空尽，唯见长江天际流。"
    ]
  },
  {
    title: "相思",
    author: "王维",
    dynasty: "唐",
    content: [
      "红豆生南国，春来发几枝。",
      "愿君多采撷，此物最相思。"
    ]
  },
  {
    title: "江雪",
    author: "柳宗元",
    dynasty: "唐",
    content: [
      "千山鸟飞绝，万径人踪灭。",
      "孤舟蓑笠翁，独钓寒江雪。"
    ]
  },
  {
    title: "夜宿山寺",
    author: "李白",
    dynasty: "唐",
    content: [
      "危楼高百尺，手可摘星辰。",
      "不敢高声语，恐惊天上人。"
    ]
  },
  {
    title: "早发白帝城",
    author: "李白",
    dynasty: "唐",
    content: [
      "朝辞白帝彩云间，千里江陵一日还。",
      "两岸猿声啼不住，轻舟已过万重山。"
    ]
  },
  {
    title: "送元二使安西",
    author: "王维",
    dynasty: "唐",
    content: [
      "渭城朝雨浥轻尘，客舍青青柳色新。",
      "劝君更尽一杯酒，西出阳关无故人。"
    ]
  }
];


export default function GushiNight() {
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    const today = new Date();
    const index = today.getDate() % POEMS.length;
    setPoem(POEMS[index]);
  }, []);

  if (!poem) return null;

  // ✅ 封装一个函数，用来生成每个字的动画
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

  // ✅ 在渲染前计算所有延迟
  let delay = 0;
  const titleEl = renderAnimatedText(poem.title, delay);
  delay += poem.title.length * 0.1;

  const authorEl = renderAnimatedText(`【${poem.dynasty}】${poem.author}`, delay);
  delay += (poem.author.length + poem.dynasty.length + 2) * 0.1;

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
