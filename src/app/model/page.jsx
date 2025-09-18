"use client";
import { useRef } from "react";
import gsap from "gsap";

export default function DoorPage() {
  const leftDoor = useRef(null);
  const rightDoor = useRef(null);
  const contentRef = useRef(null);

  const handleOpen = () => {
    const tl = gsap.timeline();

    // حركة فتح الباب + دخول لجوا
    tl.to(leftDoor.current, {
      xPercent: -100,
      transformOrigin: "right center",
      duration: 1.2,
      ease: "power3.inOut",
    });
    tl.to(
      rightDoor.current,
      {
        xPercent: 100,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.inOut",
      },
      "<"
    );

    // إخفاء الأبواب بعد الفتح
    tl.set([leftDoor.current, rightDoor.current], { display: "none" });

    // إظهار المحتوى
    tl.to(contentRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      {/* الأبواب */}
      <div
        className="absolute inset-0 flex z-20"
        onClick={handleOpen}
        style={{ cursor: "pointer", perspective: "1000px" }} // عشان يعطي إحساس العمق
      >
        {/* الباب الشمال */}
        <img
          ref={leftDoor}
          src="/pics/door.jpg"
          alt="Left Door"
          className="w-1/2 h-full object-cover"
        />

        {/* الباب اليمين */}
        <img
          ref={rightDoor}
          src="/pics/door.jpg"
          alt="Right Door"
          className="w-1/2 h-full object-cover "
        />
      </div>

      {/* المحتوى */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-center text-[seagreen] text-4xl font-bold opacity-0 scale-90 z-10"
      >
        Welcome to the Website
      </div>
    </div>
  );
}
