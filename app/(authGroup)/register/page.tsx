
import AuthCard from "../_components/AuthCard";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
    return (
        <AuthCard
            title="Create Account"
            description="Create your landlord or tenant account."
            footerText="Already have an account?"
            footerHref="/login"
            footerLabel="Sign in"
        >
            <RegisterForm />
        </AuthCard>
    );
}