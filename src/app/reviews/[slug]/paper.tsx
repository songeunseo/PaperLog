'use client';

import { useState } from 'react';
import Link from 'next/link';

// Paper 컴포넌트 prop 타입 정의
interface PaperProps {
  paper: any; // 타입 임시 설정 - 실제 contentlayer 타입으로 대체 필요
}

// 읽기 시간 추정 함수
function estimateReadingTime(content: string): number {
  // 평균적으로 분당 읽는 단어 수 (한국어 기준)
  const wordsPerMinute = 300;
  
  // 내용에서 단어 수 계산 (공백 기준 분리)
  const wordCount = content.split(/\s+/).length;
  
  // 분 단위로 계산하고 반올림
  const minutes = Math.round(wordCount / wordsPerMinute);
  
  // 최소 1분 이상으로 표시
  return Math.max(1, minutes);
}

export default function Paper({ paper }: PaperProps) {
  // 읽기 시간 추정
  const readingTime = estimateReadingTime(paper.body.raw);

  return (
    <>
      {/* 논문 정보 헤더 카드 */}
      <div className="bg-white dark:bg-gray-800/80 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 mb-8 relative">  
        <div className="p-6">
          {/* 카테고리와 태그 */}
          <div className="flex justify-end mb-4">
            <div className="flex flex-wrap gap-2 justify-end">
              {/* 카테고리 - 메인 컬러(초록색) */}
              {paper.categories?.map((category: string, index: number) => (
                <Link 
                  key={`category-${index}`}
                  href={`/reviews/category/${category}`}
                  className="text-xs px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full hover:bg-green-100 dark:hover:bg-green-800/40 transition-colors"
                >
                  {category}
                </Link>
              ))}
              
              {/* 태그 - 회색 */}
              {paper.tags?.map((tag: string, idx: number) => (
                <span key={`tag-${idx}`} className="text-xs px-3 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">{paper.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">{paper.authors}</p>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>📖 약 {readingTime}분 소요</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-100">{paper.summary}</p>
          </div>
          
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-5 flex items-center justify-between">
            {paper.publishedDate && (
              <div className="text-base text-gray-600 dark:text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={paper.publishedDate}>
                  {new Date(paper.publishedDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            )}
            <a 
              href={paper.paperLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-base text-green-600 dark:text-green-400 hover:underline flex items-center"
            >
              원문 논문 보기
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* 본문 콘텐츠 */}
      <article className="bg-white dark:bg-gray-800/80 rounded-xl shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        {/* 게시일/수정일 정보 */}
        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <span>게시일: {new Date(paper.createdAt || paper.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
          {paper.updatedAt && paper.createdAt !== paper.updatedAt && (
            <span className="ml-3">
              (수정일: {new Date(paper.updatedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })})
            </span>
          )}
        </div>
        
        {/* 실제 콘텐츠, contentlayer 형식에 맞게 렌더링 */}
        <div className="prose prose-green dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: paper.body.html }} />
      </article>
    </>
  );
} 