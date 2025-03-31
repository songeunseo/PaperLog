"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../../../components/Layout";
import AuthGuard from "../../../../../components/AuthGuard";
import { createPaperReview } from "../../../../../utils/api";
import Link from "next/link";

export default function NewPaperReviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    paperLink: "",
    summary: "",
    keyPoints: [""],
    structure: "",
    results: "",
    personalInsights: "",
    implementationLink: "",
    oneLineFeedback: "",
    categories: [""],
    tags: [""],
    slug: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: string, index: number, value: string) => {
    setFormData((prev) => {
      const array = [...prev[name as keyof typeof prev] as string[]];
      array[index] = value;
      return { ...prev, [name]: array };
    });
  };

  const addArrayItem = (name: string) => {
    setFormData((prev) => {
      const array = [...prev[name as keyof typeof prev] as string[]];
      array.push("");
      return { ...prev, [name]: array };
    });
  };

  const removeArrayItem = (name: string, index: number) => {
    setFormData((prev) => {
      const array = [...prev[name as keyof typeof prev] as string[]];
      if (array.length > 1) {
        array.splice(index, 1);
      }
      return { ...prev, [name]: array };
    });
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Slug가 비어있다면 자동으로 생성
      if (!formData.slug) {
        generateSlug();
      }

      // 빈 문자열 항목 제거
      const cleanedData = {
        ...formData,
        keyPoints: formData.keyPoints.filter(point => point.trim() !== ""),
        categories: formData.categories.filter(category => category.trim() !== ""),
        tags: formData.tags.filter(tag => tag.trim() !== ""),
      };

      const result = await createPaperReview(cleanedData);
      
      if (result) {
        router.push("/admin/reviews");
      }
    } catch (error) {
      console.error("Error creating paper review:", error);
      alert("논문 리뷰 저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">새 논문 리뷰 작성</h1>
            <Link 
              href="/admin/reviews" 
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              뒤로 가기
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">기본 정보</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">논문 제목</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={generateSlug}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">저자</label>
                  <input
                    type="text"
                    name="authors"
                    value={formData.authors}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">논문 링크</label>
                  <input
                    type="url"
                    name="paperLink"
                    value={formData.paperLink}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">URL 슬러그</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="ml-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      생성
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">내용</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">핵심 아이디어 요약</label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">주요 포인트</label>
                  {formData.keyPoints.map((point, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handleArrayChange("keyPoints", index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("keyPoints", index)}
                        className="ml-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("keyPoints")}
                    className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50"
                  >
                    추가
                  </button>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">구조 설명 (HTML 가능)</label>
                  <textarea
                    name="structure"
                    value={formData.structure}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">실험 결과</label>
                  <textarea
                    name="results"
                    value={formData.results}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">내가 이해한 포인트</label>
                  <textarea
                    name="personalInsights"
                    value={formData.personalInsights}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">구현 링크 (선택사항)</label>
                  <input
                    type="url"
                    name="implementationLink"
                    value={formData.implementationLink}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">한줄 소감</label>
                  <input
                    type="text"
                    name="oneLineFeedback"
                    value={formData.oneLineFeedback}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">분류</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">카테고리</label>
                  {formData.categories.map((category, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => handleArrayChange("categories", index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("categories", index)}
                        className="ml-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("categories")}
                    className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50"
                  >
                    추가
                  </button>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">태그</label>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleArrayChange("tags", index, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("tags", index)}
                        className="ml-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("tags")}
                    className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50"
                  >
                    추가
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Link 
                href="/admin/reviews" 
                className="px-6 py-3 mr-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded font-medium ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loading ? "저장 중..." : "저장하기"}
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </AuthGuard>
  );
} 