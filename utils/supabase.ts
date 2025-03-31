import { createClient } from '@supabase/supabase-js';

// 환경 변수 없을 경우를 대비한 기본값 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'fallback-key';

// 클라이언트 측 서비스를 위한 Supabase 클라이언트
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 