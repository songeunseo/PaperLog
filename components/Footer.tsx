import React from "react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-gray-50 dark:bg-gray-900 border-t py-8 ${className || ''}`}>
      <div className="container mx-auto px-4 md:px-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Eunseo&apos;s Paperlog. 개인 학습/연구 아카이빙 목적으로 제작되었습니다.
        </p>
      </div>
    </footer>
  );
} 