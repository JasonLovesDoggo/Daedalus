import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primaryLight to-backgroundMuted px-4">
      {/* Decorative Background Icon */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <AlertCircle size={200} className="text-primaryDark" />
      </div>

      {/* Main Content */}
      <div className="relative text-center">
        <h1 className="mb-4 text-5xl font-bold text-primary">
          404 - Page Not Found
        </h1>
        <p className="mb-6 text-lg text-textSecondary">
          Oops! The page you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="rounded-lg border-2 border-primary bg-transparent px-6 py-3 font-medium text-primary transition hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Go to Dashboard
        </Link>

        {/* Footer Text */}
        <p className="mt-8 text-sm text-textMuted">
          Need help?{" "}
          <a
            href="mailto:support@example.com"
            className="text-primary underline hover:text-primaryDark"
          >
            Contact us.
          </a>
        </p>
      </div>
    </div>
  );
}
