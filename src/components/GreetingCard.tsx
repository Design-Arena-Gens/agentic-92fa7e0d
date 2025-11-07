"use client";

import { useMemo, useState } from "react";

type Greeting = {
  phrase: string;
  pronunciation: string;
  meaning: string;
};

const greetings: Greeting[] = [
  {
    phrase: "Chào bạn",
    pronunciation: "chow ban",
    meaning: "Lời chào thân mật dành cho bạn bè hoặc người mới gặp."
  },
  {
    phrase: "Chúc bạn một ngày tuyệt vời",
    pronunciation: "chook ban moot ngay twiet voy",
    meaning: "Một lời chúc dễ thương cho khởi đầu ngày mới."
  },
  {
    phrase: "Rất vui được gặp bạn",
    pronunciation: "rut vui duoc gap ban",
    meaning: "Câu chào lịch sự khi gặp gỡ ai đó lần đầu."
  }
];

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);

export function GreetingCard() {
  const [index, setIndex] = useState(0);
  const [timestamp, setTimestamp] = useState(() => new Date());

  const greeting = greetings[index];

  const timeOfDay = useMemo(() => {
    const hour = timestamp.getHours();

    if (hour < 12) return "buổi sáng rạng rỡ";
    if (hour < 18) return "buổi chiều tươi mới";
    return "buổi tối nhẹ nhàng";
  }, [timestamp]);

  const cycleGreeting = () => {
    setIndex((prev) => (prev + 1) % greetings.length);
    setTimestamp(new Date());
  };

  return (
    <div className="card">
      <span className="badge">
        <span aria-hidden>🇻🇳</span>
        Xin chào!
      </span>
      <h1>{greeting.phrase}</h1>
      <div className="grid">
        <section>
          <h2>Phát âm</h2>
          <p>{greeting.pronunciation}</p>
        </section>
        <section>
          <h2>Ý nghĩa</h2>
          <p>{greeting.meaning}</p>
        </section>
        <section>
          <h2>Tâm trạng trong ngày</h2>
          <p>
            Cùng tận hưởng {timeOfDay}! Hiện tại đang là {formatTime(timestamp)}.
          </p>
        </section>
      </div>
      <footer>
        <strong>Muốn học thêm câu mới?</strong>
        <div className="actions">
          <button
            type="button"
            className="button button-primary"
            onClick={cycleGreeting}
          >
            Gợi ý câu khác
          </button>
          <a
            className="button button-secondary"
            href="https://vi.wikipedia.org/wiki/Ti%E1%BA%BFng_Vi%E1%BB%87t"
            target="_blank"
            rel="noreferrer"
          >
            Tìm hiểu văn hoá
          </a>
        </div>
      </footer>
    </div>
  );
}
