import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GitLab from "next-auth/providers/gitlab";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GitLab({
      clientId: process.env.GITLAB_ID || "",
      clientSecret: process.env.GITLAB_SECRET || "",
    }),
  ],
  secret: process.env.JWT_SECRET,
});
