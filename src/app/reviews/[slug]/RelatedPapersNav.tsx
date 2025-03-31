'use client';

import Link from 'next/link';
import type { relatedPapersData } from "./page";

// 컴포넌트 props 타입 정의
type RelatedPapersNavProps = {
  relatedPapers: relatedPapersData;
  currentSlug: string;
  currentPaperTitle: string;
};

export default function RelatedPapersNav({ relatedPapers, currentSlug, currentPaperTitle }: RelatedPapersNavProps) {
  // 모바일 뷰용 컴포넌트
  const MobileRelatedPapers = () => (
    <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">현재 논문: {currentPaperTitle}</h3>
        
        {relatedPapers.before.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">먼저 읽으면 좋은 논문:</h4>
            <ul className="space-y-2">
              {relatedPapers.before.map((paper, index) => (
                <li key={`before-${index}`} className="pl-2 border-l-2 border-green-500 dark:border-green-600">
                  <Link 
                    href={`/reviews/${paper.slug}`} 
                    className="text-sm text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                  >
                    {paper.title}
                    {paper.relation && (
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{paper.relation}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {relatedPapers.after.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">이후에 읽으면 좋은 논문:</h4>
            <ul className="space-y-2">
              {relatedPapers.after.map((paper, index) => (
                <li key={`after-${index}`} className="pl-2 border-l-2 border-blue-500 dark:border-blue-600">
                  <Link 
                    href={`/reviews/${paper.slug}`} 
                    className="text-sm text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {paper.title}
                    {paper.relation && (
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{paper.relation}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  // 데스크탑 뷰용 컴포넌트 (일반 레이아웃)
  const DesktopBeforeRelatedPapers = () => (
    relatedPapers.before.length > 0 && (
      <div className="w-[250px] shrink-0">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">먼저 읽으면 좋은 논문</h3>
          <div className="overflow-y-auto max-h-[300px]">
            <ul className="space-y-3">
              {relatedPapers.before.map((paper, index) => (
                <li key={`before-${index}`} className="pl-2 border-l-2 border-green-500 dark:border-green-600">
                  <Link 
                    href={`/reviews/${paper.slug}`} 
                    className="text-sm text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 block"
                  >
                    {paper.title}
                    {paper.relation && (
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{paper.relation}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );

  const DesktopAfterRelatedPapers = () => (
    relatedPapers.after.length > 0 && (
      <div className="w-[250px] shrink-0">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">다음에 읽으면 좋은 논문</h3>
          <div className="overflow-y-auto max-h-[300px]">
            <ul className="space-y-3">
              {relatedPapers.after.map((paper, index) => (
                <li key={`after-${index}`} className="pl-2 border-l-2 border-blue-500 dark:border-blue-600">
                  <Link 
                    href={`/reviews/${paper.slug}`} 
                    className="text-sm text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 block"
                  >
                    {paper.title}
                    {paper.relation && (
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">{paper.relation}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );

  // 모바일 뷰
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return <MobileRelatedPapers />;
  }

  // 여기서는 컴포넌트만 반환하고 실제 flex 레이아웃은 page.tsx에서 구성
  return (
    <>
      <DesktopBeforeRelatedPapers />
      <DesktopAfterRelatedPapers />
    </>
  );
} 