'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type RelatedPaper = {
  title: string;
  slug: string;
};

type RelatedPapersProps = {
  relatedPapers: {
    before: RelatedPaper[];
    after: RelatedPaper[];
  };
  hasRelatedPapers: boolean;
};

export default function RelatedPaperSidebars({ relatedPapers, hasRelatedPapers }: RelatedPapersProps) {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [leftTimeout, setLeftTimeout] = useState<NodeJS.Timeout | null>(null);
  const [rightTimeout, setRightTimeout] = useState<NodeJS.Timeout | null>(null);

  // 타이머를 사용하여 마우스가 화살표에서 리스트로 이동할 시간을 제공
  const handleMouseEnterLeft = () => {
    if (leftTimeout) clearTimeout(leftTimeout);
    setShowLeft(true);
  };

  const handleMouseLeaveLeft = () => {
    const timeout = setTimeout(() => {
      setShowLeft(false);
    }, 300); // 300ms 딜레이
    setLeftTimeout(timeout);
  };

  const handleMouseEnterRight = () => {
    if (rightTimeout) clearTimeout(rightTimeout);
    setShowRight(true);
  };

  const handleMouseLeaveRight = () => {
    const timeout = setTimeout(() => {
      setShowRight(false);
    }, 300); // 300ms 딜레이
    setRightTimeout(timeout);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (leftTimeout) clearTimeout(leftTimeout);
      if (rightTimeout) clearTimeout(rightTimeout);
    };
  }, [leftTimeout, rightTimeout]);

  if (!hasRelatedPapers) return null;

  return (
    <>
      {/* 왼쪽 논문 관련 영역 */}
      {relatedPapers.before.length > 0 && (
        <>
          {/* 왼쪽 화살표 영역 */}
          <div 
            className="hidden lg:block fixed left-2 top-1/2 -translate-y-1/2 z-50 cursor-pointer"
            onMouseEnter={handleMouseEnterLeft}
            onMouseLeave={handleMouseLeaveLeft}
          >
            <div className="flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg rounded-full h-12 w-12 border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600 dark:text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
          
          {/* 왼쪽 논문 리스트 영역 */}
          <div 
            className={`fixed left-16 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ${showLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24 pointer-events-none'}`}
            onMouseEnter={handleMouseEnterLeft}
            onMouseLeave={handleMouseLeaveLeft}
          >
            {/* 화살표와 리스트 사이 연결 영역 */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-4 h-20"></div>
            
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 min-w-[280px]">
              <div className="text-gray-700 dark:text-gray-300 mb-3 font-medium flex items-center whitespace-nowrap">
                <span className="mr-2">⬅️</span>
                먼저 읽으면 좋은 논문
              </div>
              <ul className="space-y-3">
                {relatedPapers.before.map((relatedPaper, index) => (
                  <li key={index} className="transition-all hover:translate-x-1">
                    <Link 
                      href={`/reviews/${relatedPaper.slug}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 flex items-center"
                    >
                      {relatedPaper.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      
      {/* 오른쪽 논문 관련 영역 */}
      {relatedPapers.after.length > 0 && (
        <>
          {/* 오른쪽 화살표 영역 */}
          <div 
            className="hidden lg:block fixed right-2 top-1/2 -translate-y-1/2 z-50 cursor-pointer"
            onMouseEnter={handleMouseEnterRight}
            onMouseLeave={handleMouseLeaveRight}
          >
            <div className="flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg rounded-full h-12 w-12 border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-600 dark:text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          {/* 오른쪽 논문 리스트 영역 */}
          <div 
            className={`fixed right-16 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ${showRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24 pointer-events-none'}`}
            onMouseEnter={handleMouseEnterRight}
            onMouseLeave={handleMouseLeaveRight}
          >
            {/* 화살표와 리스트 사이 연결 영역 */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-4 h-20"></div>
            
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 min-w-[280px]">
              <div className="text-gray-700 dark:text-gray-300 mb-3 font-medium flex items-center whitespace-nowrap">
                다음에 읽으면 좋은 논문
                <span className="ml-2">➡️</span>
              </div>
              <ul className="space-y-3">
                {relatedPapers.after.map((relatedPaper, index) => (
                  <li key={index} className="transition-all hover:-translate-x-1">
                    <Link 
                      href={`/reviews/${relatedPaper.slug}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 flex items-center justify-end"
                    >
                      {relatedPaper.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
} 