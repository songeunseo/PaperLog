import Layout from "../../../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧠 이 프로젝트에 대하여</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">📘 프로젝트 설명</h2>
          <p>
            <strong>Eunseo&apos;s Paperlog</strong>는 인공지능(AI) 및 머신러닝 분야 논문을 리뷰하고 정리하는 개인 블로그 플랫폼입니다.
            논문을 단순히 읽는 데서 그치지 않고, 핵심 아이디어를 요약하고, 구조를 시각화하며, 코드와 함께 재현하거나
            개인적인 통찰을 덧붙이는 과정을 통해 논문 기반 학습을 <strong>깊이 있게 지속적으로 수행</strong>하는 것을 목표로 합니다.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">🎯 프로젝트 목적</h2>
          <ul>
            <li>논문 리뷰를 깔끔하게 기록하고 공유하기 위해</li>
            <li>구현 실험을 정리하며 포트폴리오로 활용하기 위해</li>
            <li>꾸준한 AI 학습 기록을 아카이빙하기 위해</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">🧩 기술 스택</h2>
          <ul>
            <li><strong>Next.js</strong> – 정적 페이지 기반 블로그 프레임워크</li>
            <li><strong>TailwindCSS</strong> – 반응형 UI, 미니멀하고 가독성 높은 스타일</li>
            <li><strong>MDX</strong> – Markdown 기반 글 작성 + 코드/리액트 컴포넌트 삽입 가능</li>
            <li><strong>KaTeX</strong> – 수학 수식 표현 (<code>$...$</code>, <code>$$...$$</code> 지원)</li>
            <li><strong>shiki</strong> or <strong>prismjs</strong> – 코드블럭 하이라이팅</li>
            <li><strong>Vercel</strong> – 간편한 배포 및 커스텀 도메인 연결</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">📚 논문 리뷰 템플릿</h2>
          <p>각 논문 리뷰는 다음과 같은 구조로 작성됩니다:</p>
          <ul>
            <li>논문 정보 (제목, 저자, 링크)</li>
            <li>핵심 아이디어 요약</li>
            <li>구조 설명 / 그림</li>
            <li>실험 결과 요약</li>
            <li>내가 이해한 포인트</li>
            <li>관련 구현 링크</li>
            <li>한줄 소감</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">📌 향후 기능 예정</h2>
          <ul>
            <li>분야별 태그 및 필터 (NLP, Vision, etc.)</li>
            <li>논문 발표 슬라이드 첨부</li>
            <li>논문 따라 구현한 코드와 연결</li>
            <li>시리즈별 정리 페이지 (예: GPT 시리즈, BERT 시리즈)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">👩‍💻 개발 및 운영</h2>
          <ul>
            <li><strong>개발자:</strong> 송은서</li>
            <li><strong>진행 기간:</strong> 2025.04 ~ ongoing</li>
            <li><strong>기여 방식:</strong> 개인 학습/연구 아카이빙 목적</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
} 