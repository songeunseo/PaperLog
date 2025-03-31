export interface PaperReview {
  id: string;
  title: string;
  authors: string;
  paperLink: string;
  summary: string;
  categories: string[];
  tags: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  content: string;  // MDX 콘텐츠
  publishedDate?: string;  // 논문 발표일

  // 아래 필드들은 MDX 내용에 포함되므로 선택적
  keyPoints?: string[];
  structure?: string;
  results?: string;
  personalInsights?: string;
  implementationLink?: string;
  oneLineFeedback?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
} 