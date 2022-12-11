import { Octokit } from "@octokit/core";

/**
 * Initialize octokit with Github Token
 */
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

interface FetchGithubDataProps {
  owner: string;
  repo: string;
}

interface FetchGithubRepositoriesReturnProps {
  repository: {
    refs: {
      nodes: {
        name: string;
      }[];
    };
    stargazers: {
      totalCount: number;
    };
  };
}

export const fetchGithubData = async ({
  owner,
  repo,
}: FetchGithubDataProps) => {
  /**
   * Fetch branches and star count from github
   * TODO: sort on last commit? Fetch more branches?
   */
  try {
    const response = await octokit.graphql<FetchGithubRepositoriesReturnProps>({
      query: `query ($owner: String!, $repo: String!) {
        repository(name: $repo, owner: $owner) {
          stargazers {
            totalCount
          }
          refs(first: 20, ,refPrefix:"refs/heads/") {
            nodes {
              name
            }
          }
        }
      }`,
      owner,
      repo,
    });

    // Map branches to string[]
    const branches = response.repository.refs.nodes.map(({ name }) => name);

    // Format number to compact form e.g. 4000 -> 4k
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    const { totalCount } = response.repository.stargazers;
    const starCount = formatter.format(totalCount);

    return { branches, starCount };
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};
