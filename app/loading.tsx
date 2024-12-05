"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
          </div>
          <svg
            className="mx-auto h-24 w-24 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>
        <div className="mt-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Loading{dots}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please wait while we prepare your magical experience
          </p>
        </div>
        <div className="mt-5 flex justify-center items-center space-x-2">
          {[0, 1, 2].map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full bg-indigo-600 animate-bounce`}
              style={{ animationDelay: `${index * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
