import { createClient } from '@supabase/supabase-js';
import { PaperReview, Category, Tag } from '../types';

// 서버 컴포넌트에서 안전하게 Supabase 클라이언트 생성
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(supabaseUrl, supabaseKey);
};

// 모든 논문 리뷰 가져오기
export async function getAllPaperReviews(): Promise<PaperReview[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('paper_reviews')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching paper reviews:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllPaperReviews:', error);
    return [];
  }
}

// 특정 카테고리의 논문 리뷰 가져오기
export async function getPaperReviewsByCategory(categorySlug: string): Promise<PaperReview[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('paper_reviews')
      .select('*')
      .eq('categories', categorySlug)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error(`Error fetching paper reviews by category ${categorySlug}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Error in getPaperReviewsByCategory:`, error);
    return [];
  }
}

// 특정 태그를 가진 논문 리뷰 가져오기
export async function getPaperReviewsByTag(tagSlug: string): Promise<PaperReview[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('paper_reviews')
      .select('*')
      .contains('tags', [tagSlug])
      .order('createdAt', { ascending: false });

    if (error) {
      console.error(`Error fetching paper reviews by tag ${tagSlug}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Error in getPaperReviewsByTag:`, error);
    return [];
  }
}

// 슬러그로 특정 논문 리뷰 가져오기
export async function getPaperReviewBySlug(slug: string): Promise<PaperReview | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('paper_reviews')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching paper review by slug ${slug}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error in getPaperReviewBySlug:`, error);
    return null;
  }
}

// 모든 카테고리 가져오기
export async function getAllCategories(): Promise<Category[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllCategories:', error);
    return [];
  }
}

// 모든 태그 가져오기
export async function getAllTags(): Promise<Tag[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching tags:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllTags:', error);
    return [];
  }
}

// 새 논문 리뷰 작성하기
export async function createPaperReview(review: Omit<PaperReview, 'id' | 'createdAt' | 'updatedAt'>): Promise<PaperReview | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('paper_reviews')
      .insert([{
        ...review,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating paper review:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createPaperReview:', error);
    return null;
  }
}

// 논문 리뷰 수정하기
export async function updatePaperReview(id: string, review: Partial<PaperReview>): Promise<PaperReview | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('paper_reviews')
      .update({
        ...review,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating paper review ${id}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error in updatePaperReview:`, error);
    return null;
  }
}

// 논문 리뷰 삭제하기
export async function deletePaperReview(id: string): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('paper_reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting paper review ${id}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error in deletePaperReview:`, error);
    return false;
  }
} 