import { portfolioData } from "@/lib/data";

const colorClasses = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  purple: "text-purple-600 dark:text-purple-400",
} as const;

export default function Home() {
  const { personal, social, techStacks } = portfolioData;

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-bold mb-2">
          {personal.fullName}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-mono mb-4">
          {personal.nickname}
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            GitHub
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <div className="space-y-4 text-left">
          <h2 className="text-2xl font-semibold mb-4 text-center">Tech Stacks</h2>

          {Object.values(techStacks).map((stack) => (
            <div key={stack.title} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className={`font-semibold mb-2 ${colorClasses[stack.color]}`}>
                {stack.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {stack.technologies.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
