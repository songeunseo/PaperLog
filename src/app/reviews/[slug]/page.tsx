import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPapers, getPaperBySlug } from '../../../../utils/mdx'
import Layout from '../../../../components/Layout'
import { PaperReview } from '../../../../types'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const paper = getPaperBySlug(params.slug)

  if (!paper) {
    return {
      title: '404',
      description: 'Page not found',
    }
  }

  return {
    title: `${paper.title} - PaperLog`,
    description: paper.summary,
  }
}

export async function generateStaticParams() {
  const papers = getAllPapers()
  return papers.map((paper) => ({
    slug: paper.slug,
  }))
}

export default function ReviewPage({ params }: { params: { slug: string } }) {
  const paper = getPaperBySlug(params.slug)

  if (!paper) {
    notFound()
  }

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto mt-12">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* 좌측 패널 - 이전 논문 */}
          <aside className="w-full md:w-[220px] p-3">
            <h2 className="text-base font-medium mb-4 text-gray-600 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              이전 논문
            </h2>
            {/* 이전 논문 목록 */}
            <div className="space-y-4 overflow-y-auto pr-1" style={{ height: 'calc(1.5 * (4rem + 2.5rem))' }}>
              <a href="/reviews/attention-is-all-you-need" className="block">
                <div className="bg-white dark:bg-gray-800/60 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">Transformer</span>
                  </div>
                  <div className="font-medium text-gray-700 dark:text-gray-200 text-[15px] leading-snug tracking-tight">Attention Is All You Need</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">Transformer 아키텍처 소개</div>
                </div>
              </a>
              <a href="/reviews/transformer-xl" className="block">
                <div className="bg-white dark:bg-gray-800/60 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">Transformer</span>
                  </div>
                  <div className="font-medium text-gray-700 dark:text-gray-200 text-[15px] leading-snug tracking-tight">Transformer-XL</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">장문 시퀀스를 위한 개선</div>
                </div>
              </a>
              <a href="/reviews/reformer" className="block">
                <div className="bg-white dark:bg-gray-800/60 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">Transformer</span>
                  </div>
                  <div className="font-medium text-gray-700 dark:text-gray-200 text-[15px] leading-snug tracking-tight">Reformer</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">효율적인 Transformer</div>
                </div>
              </a>
            </div>
          </aside>

          {/* 중앙 패널 - 현재 논문 및 본문 */}
          <main className="flex-1 max-w-[720px] w-full">
            {/* 논문 정보 헤더 카드 */}
            <div className="bg-white dark:bg-gray-800/70 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 dark:bg-gray-600"></div>
              <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                {/* 카테고리와 태그 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {/* 카테고리 */}
                  {paper.categories?.map((category: string, index: number) => (
                    <a 
                      key={`category-${index}`}
                      href={`/reviews/category/${category}`}
                      className={`text-xs px-2.5 py-1 rounded-full hover:bg-opacity-80 dark:hover:bg-opacity-80 transition-colors ${
                        category.toLowerCase() === 'nlp' || category.toLowerCase() === 'language-model' 
                          ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category}
                    </a>
                  ))}
                  
                  {/* 태그 */}
                  {paper.tags?.map((tag: string, idx: number) => (
                    <span key={`tag-${idx}`} className={`text-xs px-2.5 py-1 rounded-full border ${
                      tag.toLowerCase() === 'nlp' || tag.toLowerCase() === 'language-model'
                        ? 'bg-green-50/70 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800/40'
                        : 'bg-gray-50/70 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700'
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-start mb-8">
                  <div className="w-full">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100 tracking-tight leading-tight">{paper.title}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{paper.authors}</p>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>📖 약 {Math.max(1, Math.round(paper.content.split(/\s+/).length / 300))}분 소요</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border-l-4 border-gray-300 dark:border-gray-600">
                  <p className="text-xl leading-relaxed text-gray-800 dark:text-gray-100 mb-4 tracking-tight">{paper.summary}</p>
                  <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                    이 논문은 자연어 처리 분야에서 혁신적인 딥러닝 모델을 제안합니다. 
                    해당 연구는 기존 모델들의 한계를 극복하고 다양한 NLP 작업에서 뛰어난 성능을 보여주었습니다.
                    특히 텍스트 표현에 있어 양방향 컨텍스트를 효과적으로 활용하는 방법론을 제시하여 
                    언어 이해 능력을 크게 향상시켰습니다. 이 모델은 이후 많은 연구의 기초가 되었으며, 
                    다양한 응용 분야에서 활용되고 있습니다.
                  </p>
                </div>

                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex items-center justify-between">
                  {paper.publishedDate && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <time dateTime={paper.publishedDate} className="text-xs italic">
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
                    className="text-sm text-green-600 dark:text-green-400 hover:underline flex items-center"
                  >
                    원문 논문 보기
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* 본문 콘텐츠 */}
            <article className="bg-white dark:bg-gray-800/70 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
              <div className="mb-6 text-xs text-gray-400 dark:text-gray-500 flex items-center italic border-b border-gray-100 dark:border-gray-700 pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>게시일: {new Date(paper.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                {paper.updatedAt && paper.updatedAt !== paper.createdAt && (
                  <span className="ml-4">
                    (수정일: {new Date(paper.updatedAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })})
                  </span>
                )}
              </div>
              <div 
                className="prose prose-xl prose-stone dark:prose-invert max-w-none leading-relaxed text-[15px]"
                dangerouslySetInnerHTML={{ 
                  __html: paper.content
                    // 단독 # 문자 및 공백이 있는 # 제거
                    .replace(/^#\s*$/gm, '')
                    .replace(/^\s*#\s*$/gm, '')
                    .replace(/^#{1,6}\s+$/gm, '')
                    // 헤더 변환
                    .replace(/# (.*?)$/gm, '<h1 class="text-3xl font-bold mt-10 mb-6 text-gray-900 dark:text-gray-50">$1</h1>')
                    .replace(/## (.*?)$/gm, '<h2 class="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-3">$1</h2>')
                    .replace(/### (.*?)$/gm, '<h3 class="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100">$1</h3>')
                    // 강조 및 목록 처리
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-gray-50">$1</strong>')
                    .replace(/^(\d+\. )(.*?)$/gm, '<div class="ml-4 my-2 text-gray-800 dark:text-gray-100">$1$2</div>')
                    .replace(/^(- )(.*?)$/gm, '<div class="ml-4 my-2 text-gray-800 dark:text-gray-100">• $2</div>')
                    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 text-sm font-mono">$1</code>')
                    // 단락 처리
                    .split('\n\n')
                    .filter(p => p.trim() !== '#' && p.trim() !== '') // 빈 줄, 단독 # 제거
                    .map(p => 
                      !p.startsWith('<h') && !p.startsWith('<div') && !p.trim().endsWith('</h2>') && !p.trim().endsWith('</h3>') ? 
                      `<p class="my-4 text-gray-800 dark:text-gray-100 leading-relaxed">${p}</p>` : p
                    )
                    .join('\n')
                }}
              />
            </article>
          </main>

          {/* 우측 패널 - 다음 논문 */}
          <aside className="w-full md:w-[220px] p-3">
            <h2 className="text-base font-medium mb-4 text-gray-600 dark:text-gray-400 flex items-center justify-end">
              다음 논문
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </h2>
            {/* 다음 논문 목록 */}
            <div className="space-y-4 overflow-y-auto pr-1" style={{ height: 'calc(1.5 * (4rem + 2.5rem))' }}>
              <a href="/reviews/roberta" className="block">
                <div className="bg-white dark:bg-gray-800/60 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">BERT</span>
                  </div>
                  <div className="font-medium text-gray-700 dark:text-gray-200 text-[15px] leading-snug tracking-tight">RoBERTa</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">BERT의 최적화 버전</div>
                </div>
              </a>
              <a href="/reviews/albert" className="block">
                <div className="bg-white dark:bg-gray-800/60 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">BERT</span>
                  </div>
                  <div className="font-medium text-gray-700 dark:text-gray-200 text-[15px] leading-snug tracking-tight">ALBERT</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">경량화된 BERT</div>
                </div>
              </a>
              <a href="/reviews/distilbert" className="block">
                <div className="bg-white dark:bg-gray-800/60 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">BERT</span>
                  </div>
                  <div className="font-medium text-gray-700 dark:text-gray-200 text-[15px] leading-snug tracking-tight">DistilBERT</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">증류 기법으로 경량화된 BERT</div>
                </div>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}