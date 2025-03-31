import { notFound } from "next/navigation";
import Layout from "../../../../../components/Layout";
import { getAllCategories, getPapersByCategory } from "../../../../../utils/mdx";
import Link from "next/link";
import { PaperReview, Category } from "../../../../../types";

// 메타데이터 생성
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const categories = getAllCategories();
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: '카테고리를 찾을 수 없습니다',
    };
  }
  
  return {
    title: `${category.name} 논문 리뷰 - PaperLog`,
    description: `${category.name} 카테고리의 논문 리뷰 모음입니다.`,
  };
}

// 동적 경로를 위한 generateStaticParams 함수
export function generateStaticParams() {
  const categories = getAllCategories();
  
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categories: Category[] = getAllCategories();
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const reviews: PaperReview[] = getPapersByCategory(params.slug);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <Link href="/reviews" className="text-green-600 dark:text-green-400 hover:underline mb-4 inline-block flex items-center text-base">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            모든 리뷰
          </Link>
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">{category.name} 논문 리뷰</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {category.name} 카테고리의 논문 리뷰 모음입니다.
          </p>
        </div>
        
        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 mb-10 bg-gray-100 dark:bg-gray-800/90 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <Link 
            href="/reviews" 
            className="px-4 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            모두 보기
          </Link>
          
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/reviews/category/${c.slug}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                c.slug === params.slug 
                  ? "bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* 논문 리스트 */}
        <div className="space-y-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-800/80 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-grow">
                      <div className="flex items-start mb-4">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 mr-4">
                          {review.categories.includes('nlp') ? '🔤' : 
                           review.categories.includes('vision') ? '👁️' : 
                           review.categories.includes('transformer') ? '⚡' : '📊'}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                          <Link href={`/reviews/${review.slug}`} className="hover:text-green-600 dark:hover:text-green-400">
                            {review.title}
                          </Link>
                        </h2>
                      </div>
                      <p className="text-base text-gray-600 dark:text-gray-400 mb-4 ml-16">
                        {review.authors}
                      </p>
                      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-100 mb-6 ml-16">
                        {review.summary.substring(0, 200)}
                        {review.summary.length > 200 ? '...' : ''}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-6 ml-16">
                        {review.categories.map((categorySlug, index) => {
                          const cat = categories.find(c => c.slug === categorySlug);
                          return (
                            <Link 
                              key={index}
                              href={`/reviews/category/${categorySlug}`}
                              className={`text-sm px-4 py-2 rounded-full transition-colors ${
                                categorySlug === params.slug
                                  ? "bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-200"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                              }`}
                            >
                              {cat?.name || categorySlug}
                            </Link>
                          );
                        })}
                        {review.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <Link 
                      href={`/reviews/${review.slug}`} 
                      className="text-base text-green-600 dark:text-green-400 font-medium hover:underline flex items-center"
                    >
                      자세히 보기 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-12 bg-gray-100 dark:bg-gray-800/90 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg">
                이 카테고리에 게시된 논문 리뷰가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 