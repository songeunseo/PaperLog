import { PaperReview, Category } from '../types';

// 하드코딩된 페이퍼 데이터
const paperData: Record<string, any> = {
  'attention-is-all-you-need': {
    id: 'attention-is-all-you-need',
    slug: 'attention-is-all-you-need',
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
    paperLink: "https://arxiv.org/abs/1706.03762",
    summary: "트랜스포머 아키텍처를 소개한 획기적인 논문으로, 자연어 처리 분야에 큰 변화를 가져왔습니다.",
    categories: ["nlp", "transformer"],
    tags: ["attention", "transformer", "seq2seq"],
    createdAt: "2023-06-15",
    updatedAt: "2023-06-20",
    publishedDate: "2017-06-12",
    content: "트랜스포머 모델의 상세 내용..."
  },
  'bert': {
    id: 'bert',
    slug: 'bert',
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
    paperLink: "https://arxiv.org/abs/1810.04805",
    summary: "양방향 트랜스포머 인코더를 활용한 사전 학습 모델로, 다양한 NLP 작업에서 획기적인 성능을 달성했습니다.",
    categories: ["nlp", "language-model"],
    tags: ["bert", "transformer", "pre-training"],
    createdAt: "2023-06-20",
    updatedAt: "2023-06-25",
    publishedDate: "2018-10-11",
    content: "BERT 모델의 상세 내용..."
  },
  'vision-transformer': {
    id: 'vision-transformer',
    slug: 'vision-transformer',
    title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
    authors: "Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, Dirk Weissenborn, Xiaohua Zhai, Thomas Unterthiner, Mostafa Dehghani, Matthias Minderer, Georg Heigold, Sylvain Gelly, Jakob Uszkoreit, Neil Houlsby",
    paperLink: "https://arxiv.org/abs/2010.11929",
    summary: "Vision Transformer(ViT)는 NLP에서 성공한 트랜스포머 아키텍처를 이미지 분류에 적용한 혁신적인 모델입니다.",
    categories: ["vision"],
    tags: ["transformer", "vision-transformer", "computer-vision", "vit"],
    createdAt: "2023-07-01",
    updatedAt: "2023-07-15",
    publishedDate: "2020-10-22",
    content: "Vision Transformer 모델의 상세 내용..."
  },
  'clip': {
    id: 'clip',
    slug: 'clip',
    title: "Learning Transferable Visual Models From Natural Language Supervision",
    authors: "Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry, Amanda Askell, Pamela Mishkin, Jack Clark, Gretchen Krueger, Ilya Sutskever",
    paperLink: "https://arxiv.org/abs/2103.00020",
    summary: "CLIP은 자연어 설명을 통해 이미지를 이해하는 멀티모달 모델로, 다양한 시각적 인식 태스크에서 뛰어난 제로샷 성능을 보여줍니다.",
    categories: ["multimodal", "vision"],
    tags: ["clip", "contrastive-learning", "zero-shot", "multimodal-learning"],
    createdAt: "2023-07-05",
    updatedAt: "2023-07-20",
    publishedDate: "2021-02-26",
    content: "CLIP 모델의 상세 내용..."
  },
  'vae': {
    id: 'vae',
    slug: 'vae',
    title: "Auto-Encoding Variational Bayes",
    authors: "Diederik P. Kingma, Max Welling",
    paperLink: "https://arxiv.org/abs/1312.6114",
    summary: "VAE는 변분 추론과 신경망을 결합하여 잠재 변수 모델을 효율적으로 학습하는 생성 모델입니다.",
    categories: ["vision", "generative-model"],
    tags: ["vae", "generative-model", "deep-learning", "variational-inference"],
    createdAt: "2023-07-20",
    updatedAt: "2023-07-30",
    publishedDate: "2013-12-20",
    content: "VAE 모델의 상세 내용..."
  },
  'gan': {
    id: 'gan',
    slug: 'gan',
    title: "Generative Adversarial Networks",
    authors: "Ian J. Goodfellow, Jean Pouget-Abadie, Mehdi Mirza, Bing Xu, David Warde-Farley, Sherjil Ozair, Aaron Courville, Yoshua Bengio",
    paperLink: "https://arxiv.org/abs/1406.2661",
    summary: "GAN은 생성자와 판별자 네트워크의 적대적 훈련을 통해 데이터 분포를 학습하는 혁신적인 생성 모델입니다.",
    categories: ["vision", "generative-model"],
    tags: ["gan", "generative-model", "deep-learning"],
    createdAt: "2023-08-01",
    updatedAt: "2023-08-10",
    publishedDate: "2014-06-10",
    content: "GAN 모델의 상세 내용..."
  },
  'dalle': {
    id: 'dalle',
    slug: 'dalle',
    title: "Zero-Shot Text-to-Image Generation",
    authors: "Aditya Ramesh, Mikhail Pavlov, Gabriel Goh, Scott Gray, Chelsea Voss, Alec Radford, Mark Chen, Ilya Sutskever",
    paperLink: "https://arxiv.org/abs/2102.12092",
    summary: "DALL-E는 텍스트 프롬프트로부터 이미지를 생성할 수 있는 강력한 멀티모달 모델입니다.",
    categories: ["multimodal", "generative-model"],
    tags: ["dall-e", "text-to-image", "generative-model", "multimodal"],
    createdAt: "2023-08-15",
    updatedAt: "2023-08-25",
    publishedDate: "2021-02-24",
    content: "DALL-E 모델의 상세 내용..."
  }
};

// 카테고리 데이터
const categoryData: Record<string, any> = {
  'nlp': {
    id: 'nlp',
    name: '자연어 처리',
    slug: 'nlp',
    description: '언어 모델링, 텍스트 분류, 감성분석 등 자연어 처리 분야의 논문',
    icon: '🔤'
  },
  'vision': {
    id: 'vision',
    name: '컴퓨터 비전',
    slug: 'vision',
    description: '이미지 인식, 객체 탐지, 세그멘테이션 등 컴퓨터 비전 분야의 논문',
    icon: '👁️'
  },
  'language-model': {
    id: 'language-model',
    name: '언어 모델',
    slug: 'language-model',
    description: 'BERT, GPT 등 대규모 언어 모델 및 관련 기술에 관한 논문',
    icon: '🧠'
  },
  'multimodal': {
    id: 'multimodal',
    name: '멀티모달',
    slug: 'multimodal',
    description: '텍스트, 이미지, 오디오 등 여러 모달리티의 통합 학습에 관한 논문',
    icon: '🔀'
  },
  'generative-model': {
    id: 'generative-model',
    name: '생성 모델',
    slug: 'generative-model',
    description: 'GAN, VAE, Diffusion 등 데이터 분포를 학습하고 새로운 샘플을 생성하는 모델들에 관한 논문',
    icon: '🎨'
  }
};

// 모든 논문 슬러그 가져오기
export function getAllPaperSlugs() {
  return Object.keys(paperData).map((slug) => {
    return {
      params: {
        slug: slug,
      },
    };
  });
}

// 모든 논문 데이터 가져오기
export function getAllPapers(): PaperReview[] {
  // Object.values로 모든 논문 데이터를 배열로 가져오기
  const allPapersData = Object.values(paperData);

  // 날짜 기준 정렬
  return allPapersData.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  }) as PaperReview[];
}

// 특정 슬러그로 논문 찾기
export function getPaperBySlug(slug: string): PaperReview | undefined {
  return paperData[slug] as PaperReview | undefined;
}

// 모든 카테고리 가져오기
export function getAllCategories(): Category[] {
  return Object.values(categoryData) as Category[];
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
export function getCategoryName(slug: string): string {
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
export function getTagName(slug: string): string {
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