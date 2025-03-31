import React from 'react';

type HeadingProps = {
  children: React.ReactNode;
};

// 관련 논문 추천 컴포넌트
export const RelatedPapers = ({ before = [], after = [] }: { before?: {title: string, slug: string}[], after?: {title: string, slug: string}[] }) => {
  return (
    <div className="my-12 p-6 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">관련 논문</h3>
      
      {before.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-300">먼저 읽으면 좋은 논문</h4>
          <ul className="space-y-2 pl-2">
            {before.map((paper, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">→</span>
                <a 
                  href={`/reviews/${paper.slug}`}
                  className="text-green-600 dark:text-green-400 hover:underline"
                >
                  {paper.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {after.length > 0 && (
        <div>
          <h4 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-300">다음에 읽으면 좋은 논문</h4>
          <ul className="space-y-2 pl-2">
            {after.map((paper, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">→</span>
                <a 
                  href={`/reviews/${paper.slug}`}
                  className="text-green-600 dark:text-green-400 hover:underline"
                >
                  {paper.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const MDXComponents = {
  // 제목 컴포넌트
  h1: ({ children }: HeadingProps) => (
    <h1 className="text-4xl font-bold mt-10 mb-8 text-gray-900 dark:text-gray-50">
      {children}
    </h1>
  ),
  h2: ({ children }: HeadingProps) => (
    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: HeadingProps) => (
    <h3 className="text-2xl font-bold mt-10 mb-5 text-gray-800 dark:text-gray-100">
      {children}
    </h3>
  ),
  
  // 문단 컴포넌트
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-xl text-gray-800 dark:text-gray-100 leading-relaxed my-6">
      {children}
    </p>
  ),
  
  // 강조 컴포넌트
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold text-gray-900 dark:text-gray-50">
      {children}
    </strong>
  ),
  
  // 목록 컴포넌트
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-8 pl-6 space-y-4">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-8 pl-6 space-y-4 list-decimal">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-xl text-gray-800 dark:text-gray-100 my-2">
      {children}
    </li>
  ),
  
  // 링크 컴포넌트
  a: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      className="text-green-600 dark:text-green-400 font-medium underline hover:text-green-700 hover:dark:text-green-300"
      target={href.startsWith('http') ? '_blank' : '_self'}
      rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
    >
      {children}
    </a>
  ),
  
  // 코드 블록 컴포넌트
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 text-sm">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="p-6 my-8 rounded-xl shadow-md bg-gray-900 dark:bg-gray-900 border border-gray-700 overflow-x-auto">
      {children}
    </pre>
  ),
  
  // 인용구 컴포넌트
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-green-500 pl-8 pr-4 py-4 my-8 bg-gray-50 dark:bg-gray-800/60 rounded-r-md italic text-xl text-gray-800 dark:text-gray-100">
      {children}
    </blockquote>
  ),
  
  // 구분선 컴포넌트
  hr: () => (
    <hr className="my-12 border-gray-300 dark:border-gray-700" />
  ),
  
  // 이미지 컴포넌트
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img 
      {...props} 
      className="rounded-xl shadow-md my-10"
      loading="lazy"
      alt={props.alt || 'Image'}
    />
  ),
  
  // 커스텀 컴포넌트
  RelatedPapers,
};

export default MDXComponents; 