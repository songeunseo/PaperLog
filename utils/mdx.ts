import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PaperReview, Category } from '../types';

const paperDirectory = path.join(process.cwd(), 'content/papers');
const categoryDirectory = path.join(process.cwd(), 'data/categories');

// 모든 논문 파일의 슬러그 가져오기
export function getAllPaperSlugs() {
  const fileNames = fs.readdirSync(paperDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}

// 모든 논문 데이터 가져오기
export function getAllPapers(): PaperReview[] {
  // 파일 이름 목록 얻기
  const fileNames = fs.readdirSync(paperDirectory);
  const allPapersData = fileNames.map((fileName) => {
    // .mdx 확장자 제거하여 id 얻기
    const slug = fileName.replace(/\.mdx$/, '');

    // 마크다운 파일을 문자열로 읽기
    const fullPath = path.join(paperDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matter로 메타데이터 파싱
    const matterResult = matter(fileContents);

    // 데이터 결합
    return {
      id: slug,
      slug,
      content: matterResult.content,
      title: matterResult.data.title,
      authors: matterResult.data.authors,
      paperLink: matterResult.data.paperLink,
      summary: matterResult.data.summary,
      categories: matterResult.data.categories || [],
      tags: matterResult.data.tags || [],
      createdAt: matterResult.data.date,
      updatedAt: matterResult.data.lastmod || matterResult.data.date,
      publishedDate: matterResult.data.publishedDate,
    } as PaperReview;
  });

  // 날짜 기준 정렬
  return allPapersData.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });
}

// 특정 슬러그로 논문 찾기
export function getPaperBySlug(slug: string): PaperReview | undefined {
  const fullPath = path.join(paperDirectory, `${slug}.mdx`);
  
  // 파일이 존재하지 않으면 undefined 반환
  if (!fs.existsSync(fullPath)) {
    return undefined;
  }
  
  // 파일 내용 읽기
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // gray-matter로 메타데이터 파싱
  const matterResult = matter(fileContents);
  
  // 데이터 결합
  return {
    id: slug,
    slug,
    content: matterResult.content,
    title: matterResult.data.title,
    authors: matterResult.data.authors,
    paperLink: matterResult.data.paperLink,
    summary: matterResult.data.summary,
    categories: matterResult.data.categories || [],
    tags: matterResult.data.tags || [],
    createdAt: matterResult.data.date,
    updatedAt: matterResult.data.lastmod || matterResult.data.date,
    publishedDate: matterResult.data.publishedDate,
  } as PaperReview;
}

// 모든 카테고리 가져오기
export function getAllCategories(): Category[] {
  // 카테고리 데이터가 없으면 빈 배열 반환
  if (!fs.existsSync(categoryDirectory)) {
    return [];
  }
  
  // 파일 이름 목록 얻기
  const fileNames = fs.readdirSync(categoryDirectory).filter(file => file.endsWith('.json'));
  
  // 각 파일의 내용을 읽어서 카테고리 데이터 생성
  const allCategories = fileNames.map((fileName) => {
    const fullPath = path.join(categoryDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // JSON 파싱
    const category = JSON.parse(fileContents);
    
    // id 추가 (파일 이름에서 .json 제거)
    return {
      ...category,
      id: fileName.replace(/\.json$/, ''),
    } as Category;
  });
  
  return allCategories;
}

// 카테고리별 논문 가져오기
export function getPapersByCategory(categorySlug: string): PaperReview[] {
  const allPapers = getAllPapers();
  
  // 카테고리가 일치하는 논문만 필터링
  return allPapers.filter(paper => 
    paper.categories && paper.categories.includes(categorySlug)
  );
}

// 모든 태그 가져오기
export function getAllTags() {
  const allPapers = getAllPapers();
  const tags = new Set<string>();
  
  allPapers.forEach(paper => {
    if (paper.tags) {
      paper.tags.forEach(tag => {
        tags.add(tag);
      });
    }
  });
  
  return Array.from(tags);
}

// 카테고리 이름 변환 (예: nlp -> NLP)
function getCategoryName(slug: string): string {
  const categoryNames: Record<string, string> = {
    'nlp': 'NLP',
    'vision': 'Computer Vision',
    'transformer': 'Transformer',
    'language-model': '언어 모델',
    'multimodal': '멀티모달',
    'generative-model': '생성 모델',
    'reinforcement-learning': '강화학습',
  };
  
  return categoryNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
}

// 태그 이름 변환 (prettier format)
function getTagName(slug: string): string {
  const tagNames: Record<string, string> = {
    'attention': 'Attention',
    'transformer': 'Transformer',
    'bert': 'BERT',
    'gpt': 'GPT',
    'deep-learning': 'Deep Learning',
    'pre-training': 'Pre-training',
  };
  
  return tagNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
} 