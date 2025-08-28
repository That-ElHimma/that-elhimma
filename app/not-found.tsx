import Link from "next/link"
import type { Metadata } from "next"
import StructuredData from "@/components/StructuredData"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Return to That El-Himma's homepage for tech solutions and business development services.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Page Not Found - That El-Himma",
    description: "The page you're looking for doesn't exist. Return to That El-Himma's homepage.",
    url: "https://thatelhimma.com/404",
    siteName: "That El-Himma",
    type: "website",
  },
};

export default function NotFound() {
  return (
    <>
      <StructuredData 
        type="website" 
        data={{
          name: "404 Error Page",
          description: "Page not found error"
        }} 
      />
      
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Or try these popular pages:</p>
              <div className="mt-2 space-x-4">
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}