"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={`bg-white dark:bg-gray-900 shadow-sm py-4 ${className || ''}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Eunseo&apos;s Paperlog
        </Link>
        <div className="flex items-center space-x-4">
          <Link 
            href="/reviews" 
            className={pathname === '/reviews' 
              ? "text-blue-600 dark:text-blue-400" 
              : "hover:text-blue-600 dark:hover:text-blue-400"
            }
          >
            논문 리뷰
          </Link>
          <Link 
            href="/about" 
            className={pathname === '/about' 
              ? "text-blue-600 dark:text-blue-400" 
              : "hover:text-blue-600 dark:hover:text-blue-400"
            }
          >
            소개
          </Link>
        </div>
      </div>
    </nav>
  );
} 