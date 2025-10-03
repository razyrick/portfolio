
export const portfolioData = {
  personal: {
    fullName: "John Charlie Catedrilla",
    nickname: "razyrick",
  },
  social: {
    github: "https://github.com/razyrick",
    linkedin: "https://www.linkedin.com/in/john-charlie-catedrilla-4b5936232/",
  },
  techStacks: {
    frontend: {
      title: "Frontend",
      technologies: ["Typescript", "Javascript", "React", "Next.js"],
      color: "blue",
    },
    backend: {
      title: "Backend",
      technologies: ["Node.js", "Python", "PostgreSQL (Prisma)"],
      color: "green",
    },
    ai: {
      title: "AI Engineer/Machine Learning",
      technologies: ["ElizaOS", "CrewAI", "Tensorflow", "Python", "n8n", "dify"],
      color: "purple",
    },
  },
} as const;

export type PortfolioData = typeof portfolioData;
