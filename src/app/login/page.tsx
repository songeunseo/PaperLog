import Layout from "../../../components/Layout";
import AuthForm from "../../../components/AuthForm";

export default function LoginPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">관리자 로그인</h1>
        <AuthForm />
      </div>
    </Layout>
  );
} 