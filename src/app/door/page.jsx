"use client";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const videoRef = useRef(null);
  const [show, setShow] = useState(false);
  const [looping, setLooping] = useState(true); // لحد ما المستخدم يضغط
  const directionRef = useRef(1); // 1 = قدام , -1 = ورا
  const intervalRef = useRef(null);

  // التحكم في حركة أول ثانيتين
  const loopFirstTwoSeconds = () => {
    if (!videoRef.current) return;
    const v = videoRef.current;

    intervalRef.current = setInterval(() => {
      if (!looping) return;

      v.currentTime += 0.03 * directionRef.current; // أسرع شوية

      if (v.currentTime >= 3.2) {
        directionRef.current = -1; // ارجع ورا
      } else if (v.currentTime <= 2.5) {
        directionRef.current = 3; // قدام تاني
      }
    }, 30); // ~33fps
  };

  // لما المستخدم يضغط -> كمل الفيديو من مكانه
  const handleClick = () => {
    clearInterval(intervalRef.current);
    setLooping(false);
    videoRef.current.playbackRate = 3;
    videoRef.current.play();
  };

  // لما يخلص الفيديو -> اخفيه
  const handleEnded = () => {
    setShow(true);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 1;
      loopFirstTwoSeconds();
      v.addEventListener("ended", handleEnded);
    }

    return () => {
      clearInterval(intervalRef.current);
      if (v) v.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <section className="relative h-svh" onClick={handleClick}>
      {show ? (
        <div className="relative text-black bg-[coral] text-3xl">Hello</div>
      ) : (
        <video
          ref={videoRef}
          muted
          src="./videos/door.mp4"
          className="w-full h-full object-cover fixed top-0 left-0"
        />
      )}
    </section>
  );
};

export default Page;
