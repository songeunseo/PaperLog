import Layout from "../../components/Layout";
import Link from "next/link";
import { getAllPapers } from "../../utils/mdx";

export default function Home() {
  // 최근 논문 리뷰 가져오기 (최대 3개)
  const recentPapers = getAllPapers().slice(0, 3);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">PaperLog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            인공지능과 머신러닝 논문 탐색의 여정
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            <strong>PaperLog</strong>는 인공지능(AI) 및 머신러닝 분야 논문을 리뷰하고 정리하는 개인 블로그 플랫폼입니다. 
            논문을 단순히 읽는 데서 그치지 않고, 핵심 아이디어를 요약하고, 구조를 시각화하며, 코드와 함께 재현하거나 개인적인 통찰을 덧붙이는 
            과정을 통해 논문 기반 학습을 <strong>깊이 있게 지속적으로 수행</strong>하는 것을 목표로 합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-gray-100 dark:bg-gray-800/90 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">💡 논문 리뷰 방식</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>핵심 아이디어 집중적 요약</li>
                <li>구조와 모델 시각화</li>
                <li>코드 구현 및 실험 결과 분석</li>
                <li>개인적인 이해와 통찰 기록</li>
              </ul>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800/90 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">🔍 관심 연구 분야</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>자연어 처리 (NLP)</li>
                <li>컴퓨터 비전 (Vision)</li>
                <li>생성형 AI (Generative AI)</li>
                <li>멀티모달 학습 (Multimodal Learning)</li>
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-green-700 dark:text-green-400">📚 최근 리뷰한 논문</h2>
            {recentPapers.length > 0 ? (
              <div className="grid grid-cols-1 gap-8">
                {recentPapers.map((paper) => (
                  <div key={paper.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-grow">
                          <div className="flex items-start mb-2">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 mr-3">
                              {paper.categories.includes('nlp') ? '🔤' : 
                               paper.categories.includes('vision') ? '👁️' : 
                               paper.categories.includes('transformer') ? '⚡' : '📊'}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                              <Link href={`/reviews/${paper.slug}`} className="hover:text-green-600 dark:hover:text-green-400">
                                {paper.title}
                              </Link>
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 ml-12">
                            {paper.authors}
                          </p>
                          <p className="text-gray-800 dark:text-gray-100 mb-4">
                            {paper.summary}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {paper.categories.map((category, idx) => (
                              <Link 
                                key={idx} 
                                href={`/reviews/category/${category}`}
                                className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                {category}
                              </Link>
                            ))}
                            {paper.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-between items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(paper.createdAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <Link 
                          href={`/reviews/${paper.slug}`} 
                          className="text-sm text-green-600 dark:text-green-400 font-medium hover:underline flex items-center"
                        >
                          자세히 보기 
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center mt-8">
                  <Link
                    href="/reviews"
                    className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    모든 논문 리뷰 보기
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center p-12 bg-gray-100 dark:bg-gray-800/90 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 italic">아직 게시된 논문 리뷰가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
