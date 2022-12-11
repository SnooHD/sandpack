export interface GithubDataItemProps {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

export interface GithubResponseProps {
  status: number;
  url: string;
  headers: Record<string, string>;
  data: GithubDataItemProps[];
}
