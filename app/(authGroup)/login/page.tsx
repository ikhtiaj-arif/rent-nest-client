import AuthCard from "../_components/AuthCard";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to continue managing your rentals."
      footerText="Don't have an account?"
      footerHref="/register"
      footerLabel="Create account"
    >
      <LoginForm />
    </AuthCard>
  );
}