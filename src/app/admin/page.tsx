import Layout from "../../../components/Layout";
import AuthGuard from "../../../components/AuthGuard";
import LogoutButton from "../../../components/LogoutButton";
import Link from "next/link";

export default function AdminPage() {
  return (
    <AuthGuard>
      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">논문 리뷰 관리</h2>
              <div className="space-y-2">
                <Link 
                  href="/admin/reviews" 
                  className="block px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded"
                >
                  논문 리뷰 목록
                </Link>
                <Link 
                  href="/admin/reviews/new" 
                  className="block px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 rounded"
                >
                  새 논문 리뷰 작성
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">카테고리 및 태그 관리</h2>
              <div className="space-y-2">
                <Link 
                  href="/admin/categories" 
                  className="block px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded"
                >
                  카테고리 관리
                </Link>
                <Link 
                  href="/admin/tags" 
                  className="block px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded"
                >
                  태그 관리
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">사이트 관리</h2>
            <div className="space-y-2">
              <Link 
                href="/admin/settings" 
                className="block px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
              >
                사이트 설정
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </Layout>
    </AuthGuard>
  );
} 