import Link from "next/link";
import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NewsHub. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
            <a
              href="https://github.com/yourusername/newshub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center"
            >
              <Github className="h-4 w-4 mr-1" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
