"use client";

import Layout from "../../../components/Layout";
import Link from "next/link";
import { getAllPapers, getAllCategories } from "../../../utils/mdx";
import { PaperReview, Category } from "../../../types";
import { useSearchParams } from "next/navigation";

export default function ReviewsPage() {
  // 마크다운 파일에서 데이터 가져오기
  const paperReviews: PaperReview[] = getAllPapers();
  const categories: Category[] = getAllCategories();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams ? searchParams.get('category') : null;

  // 발간일 순서로 정렬하는 함수
  const sortByPublishedDate = (papers: PaperReview[]): PaperReview[] => {
    return [...papers].sort((a, b) => {
      if (!a.publishedDate && !b.publishedDate) return 0;
      if (!a.publishedDate) return 1;
      if (!b.publishedDate) return -1;
      return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
    });
  };

  // 카테고리별로 논문 필터링하는 함수
  const getPapersByCategory = (categorySlug: string): PaperReview[] => {
    return paperReviews.filter(paper => 
      paper.categories && paper.categories.includes(categorySlug)
    );
  };

  // 태그로 논문 필터링하는 함수
  const getPapersByTag = (tagPattern: string): PaperReview[] => {
    return paperReviews.filter(paper => 
      paper.tags && paper.tags.some(tag => tag.includes(tagPattern))
    );
  };

  // 생성형 모델 논문들
  const generativeModelPapers = sortByPublishedDate(getPapersByCategory('generative-model'));

  // 비전 관련 논문들
  const visionPapers = sortByPublishedDate(getPapersByCategory('vision'));

  // 멀티모달 관련 논문들
  const multimodalPapers = sortByPublishedDate(getPapersByCategory('multimodal'));

  // NLP 관련 논문들
  const nlpPapers = sortByPublishedDate(getPapersByCategory('nlp'));

  // 트랜스포머 관련 논문들
  const transformerPapers = sortByPublishedDate(
    paperReviews.filter(paper => 
      paper.categories?.includes('transformer') || 
      paper.tags?.some(tag => tag.includes('transformer'))
    )
  );

  // 언어 모델 관련 논문들
  const languageModelPapers = sortByPublishedDate(getPapersByCategory('language-model'));

  // 경량화 모델 관련 논문들
  const efficientModelPapers = sortByPublishedDate(
    paperReviews.filter(paper =>
      paper.tags?.some(tag => 
        tag.includes('distil') || 
        tag.includes('albert') ||
        tag.includes('efficient') ||
        tag.includes('compression')
      )
    )
  );

  // 컴퓨터 비전 기초 논문들
  const basicVisionPapers = sortByPublishedDate(
    visionPapers.filter(paper =>
      !paper.tags?.some(tag => 
        tag.includes('transformer') || 
        tag.includes('vit')
      )
    )
  );

  // 강화학습 관련 논문들
  const rlPapers = sortByPublishedDate(getPapersByCategory('reinforcement-learning'));

  // 자기지도 학습 관련 논문들
  const selfSupervisedPapers = sortByPublishedDate(
    paperReviews.filter(paper =>
      paper.tags?.some(tag => 
        tag.includes('self-supervised') || 
        tag.includes('contrastive-learning') ||
        tag.includes('simclr') ||
        tag.includes('moco')
      )
    )
  );

  // 그래프 신경망 관련 논문들
  const graphNNPapers = sortByPublishedDate(
    paperReviews.filter(paper =>
      paper.tags?.some(tag => 
        tag.includes('graph') || 
        tag.includes('gcn') ||
        tag.includes('gat')
      )
    )
  );

  // 커리큘럼 데이터 구성
  const curriculum = [
    {
      title: "자연어 처리 트랙",
      description: "자연어 처리(NLP)의 기본 개념부터 트랜스포머 기반 모델까지",
      slug: "nlp-basics",
      categorySlug: "nlp",
      icon: "🔤",
      papers: nlpPapers
    },
    {
      title: "언어 모델 트랙",
      description: "BERT 이후 언어 모델의 발전 과정 탐구",
      slug: "language-model-evolution",
      categorySlug: "language-model",
      icon: "🧠",
      papers: languageModelPapers
    },
    {
      title: "효율적인 언어 모델 트랙",
      description: "대규모 언어 모델의 경량화 및 효율화 방법",
      slug: "efficient-language-models",
      categorySlug: "language-model",
      icon: "⚡",
      papers: efficientModelPapers
    },
    {
      title: "컴퓨터 비전 트랙",
      description: "이미지 인식과 객체 탐지의 핵심 알고리즘",
      slug: "computer-vision-basics",
      categorySlug: "vision",
      icon: "👁️",
      papers: basicVisionPapers
    },
    {
      title: "비전 트랜스포머 트랙",
      description: "컴퓨터 비전에서의 트랜스포머 아키텍처 적용",
      slug: "vision-transformers",
      categorySlug: "vision",
      icon: "🔎",
      papers: visionPapers.filter(paper => 
        paper.tags?.some(tag => tag.includes('transformer') || tag.includes('vit'))
      )
    },
    {
      title: "멀티모달 트랙",
      description: "텍스트, 이미지, 오디오 등 여러 모달리티의 통합 학습",
      slug: "multimodal-learning",
      categorySlug: "multimodal",
      icon: "🔀",
      papers: multimodalPapers
    },
    {
      title: "생성형 AI 트랙",
      description: "텍스트, 이미지, 오디오 생성을 위한 최신 연구",
      slug: "generative-ai",
      categorySlug: "generative-model",
      icon: "🎨",
      papers: generativeModelPapers
    },
    {
      title: "강화학습 트랙",
      description: "에이전트가 환경과 상호작용하며 학습하는 강화학습의 기본과 발전",
      slug: "reinforcement-learning",
      categorySlug: "reinforcement-learning",
      icon: "🎮",
      papers: rlPapers
    },
    {
      title: "자기지도 학습 트랙",
      description: "레이블 없이 데이터의 구조를 학습하는 방법론",
      slug: "self-supervised-learning",
      categorySlug: "self-supervised",
      icon: "🔄",
      papers: selfSupervisedPapers
    },
    {
      title: "그래프 신경망 트랙",
      description: "그래프 데이터에 적용되는 딥러닝 접근법",
      slug: "graph-neural-networks",
      categorySlug: "graph",
      icon: "🕸️",
      papers: graphNNPapers
    },
    // 그 외 다른 그룹들을 추가할 수 있습니다
  ];

  // 선택된 카테고리에 따라 커리큘럼 필터링
  let filteredCurriculum = curriculum;
  if (selectedCategory) {
    filteredCurriculum = curriculum.filter(group => {
      // 그룹의 카테고리가 선택된 카테고리와 일치하는지 확인
      if (group.categorySlug === selectedCategory) return true;
      
      // 또는 그룹 내 논문 중 선택된 카테고리를 가진 논문이 있는지 확인
      return group.papers.some(paper => 
        paper.categories && paper.categories.includes(selectedCategory)
      );
    });
  }

  // 위 커리큘럼에 포함되지 않은 논문들
  const otherPapers = paperReviews.filter(
    paper => !curriculum.some(
      group => group.papers.some(p => p?.slug === paper.slug)
    )
  );

  // 선택된 카테고리가 있다면 otherPapers도 필터링
  const filteredOtherPapers = selectedCategory 
    ? otherPapers.filter(paper => 
        paper.categories && paper.categories.includes(selectedCategory)
      )
    : otherPapers;

  // 커리큘럼 그룹에 논문이 하나도 없으면 표시하지 않음
  filteredCurriculum = filteredCurriculum.filter(group => group.papers.length > 0);

  // 모든 트랙이 비어 있을 경우를 대비한 대체 데이터 (시각적으로 예시 표시)
  const examplePapers = [
    { 
      title: "예시: Attention Is All You Need", 
      authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, et al.", 
      slug: "attention-is-all-you-need",
      summary: "트랜스포머 아키텍처를 소개한 획기적인 논문으로, 자연어 처리 분야에 큰 변화를 가져왔습니다.",
      categories: ["nlp", "transformer"],
      publishedDate: "2017-06-12"
    },
    { 
      title: "예시: BERT: Pre-training of Deep Bidirectional Transformers", 
      authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, et al.", 
      slug: "bert",
      summary: "양방향 트랜스포머 인코더를 활용한 사전 학습 모델로, 다양한 NLP 작업에서 획기적인 성능을 달성했습니다.",
      categories: ["nlp", "language-model"],
      publishedDate: "2018-10-11"
    }
  ];

  // 트랙 없는 경우 예시 트랙 추가
  if (filteredCurriculum.length === 0 && paperReviews.length === 0) {
    filteredCurriculum.push({
      title: "자연어 처리 기초 과정 (예시)",
      description: "자연어 처리(NLP)의 기본 개념부터 트랜스포머 기반 모델까지",
      slug: "nlp-basics-example",
      categorySlug: "nlp",
      icon: "🔤",
      papers: examplePapers as unknown as PaperReview[]
    });
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">📚 논문 리뷰 모음</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            AI와 머신러닝 분야의 주요 논문 리뷰를 분야별로 살펴보세요.
          </p>
        </div>
        
        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 mb-10 bg-gray-100 dark:bg-gray-800/90 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <Link 
            href="/reviews" 
            className={`px-4 py-1.5 ${!selectedCategory 
              ? "bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-200" 
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"} rounded-full text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors`}
          >
            모두 보기
          </Link>
          
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/reviews?category=${category.slug}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.slug
                  ? "bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* 선택된 카테고리가 있을 경우 표시 */}
        {selectedCategory && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 mr-2">
                  필터링: 
                </span>
                <span className="bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                  {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
                </span>
              </div>
              <Link 
                href="/reviews" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center"
              >
                필터 초기화
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* 커리큘럼 리스트 */}
        <div className="space-y-16">
          {filteredCurriculum.map((group, groupIndex) => (
            <div key={group.slug} className="relative">
              {/* 커리큘럼 그룹 제목 */}
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-2xl mr-4">
                    {group.icon}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{group.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{group.description}</p>
                  </div>
                </div>
              </div>
              
              {/* 논문 리스트 */}
              <div className="ml-6 pl-10 border-l-2 border-gray-200 dark:border-gray-700 space-y-8">
                {group.papers.map((paper, paperIndex) => (
                  <div key={paper.slug} className="relative">
                    {/* 왼쪽의 순서 표시 */}
                    <div className="absolute -left-14 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-200 font-bold">
                      {paperIndex + 1}
                    </div>
                    
                    {/* 논문 카드 */}
                    <div className="bg-white dark:bg-gray-800/80 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                      <div className="p-4">
                        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-1">
                          <Link href={`/reviews/${paper.slug}`} className="hover:text-green-600 dark:hover:text-green-400">
                            {paper.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {paper.authors}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {paper.categories?.slice(0, 2).map((categorySlug, index) => {
                            const category = categories.find(c => c.slug === categorySlug);
                            return (
                              <Link 
                                key={index}
                                href={`/reviews/category/${categorySlug}`}
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  categorySlug === 'nlp' || categorySlug === 'language-model'
                                    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                    : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                }`}
                              >
                                {category?.name || categorySlug}
                              </Link>
                            );
                          })}
                        </div>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {paper.publishedDate 
                              ? new Date(paper.publishedDate).toLocaleDateString('ko-KR', {
                                  year: 'numeric',
                                  month: 'short'
                                })
                              : null
                            }
                          </span>
                          <Link 
                            href={`/reviews/${paper.slug}`} 
                            className="text-xs text-green-600 dark:text-green-400 hover:underline flex items-center"
                          >
                            자세히 보기 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* 기타 논문 (특정 커리큘럼에 속하지 않은 논문들) */}
          {filteredOtherPapers.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">기타 논문 리뷰</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredOtherPapers.map((paper) => (
                  <div key={paper.slug} className="bg-white dark:bg-gray-800/80 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1">
                        <Link href={`/reviews/${paper.slug}`} className="hover:text-green-600 dark:hover:text-green-400">
                          {paper.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {paper.authors}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {paper.categories?.slice(0, 2).map((categorySlug, index) => {
                          const category = categories.find(c => c.slug === categorySlug);
                          return (
                            <Link 
                              key={index}
                              href={`/reviews/category/${categorySlug}`}
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                categorySlug === 'nlp' || categorySlug === 'language-model'
                                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                  : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                              }`}
                            >
                              {category?.name || categorySlug}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 논문이 없는 경우 표시할 내용 */}
          {paperReviews.length > 0 && filteredCurriculum.length === 0 && filteredOtherPapers.length === 0 && (
            <div className="text-center p-12 bg-gray-100 dark:bg-gray-800/90 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                선택한 카테고리에 해당하는 논문이 없습니다.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                다른 카테고리를 선택하거나 카테고리 필터를 초기화해 보세요.
              </p>
            </div>
          )}
          
          {paperReviews.length === 0 && otherPapers.length === 0 && filteredCurriculum.length === 0 && (
            <div className="text-center p-12 bg-gray-100 dark:bg-gray-800/90 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                아직 게시된 논문 리뷰가 없습니다.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                첫 번째 논문 리뷰가 곧 업로드될 예정입니다!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 