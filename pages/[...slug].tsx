import React from "react";
import { GetServerSideProps } from "next";
import { Title } from "@/components/Text/Title.component";
import { Paragraph } from "@/components/Text/Paragraph.component";
import { Lanes } from "@/components/Lanes/Lanes.component";
import { Icon } from "@/components/Icons/Icon.component";
import Link from "next/link";
import { fetchGithubData } from "@/utils/github.util";

export interface PageProps {
  branches: string[];
  starCount: number;
  repo: string;
}

const Page = ({ branches, starCount, repo }: PageProps): JSX.Element => (
  <>
    <header className="flex w-full justify-between flex-wrap sticky left-0 pt-sm sm:pt-lg xl:pt-xl max-w-content px-sm sm:px-lg">
      <div className="w-1/2 md:w-1/3 text-md flex justify-start items-start">
        <Link
          href="/"
          className={`
            block transition-[color,_transform] duration-300
            hover:text-light-shade-1 dark:hover:text-dark-shade-1
            active:translate-x-[-3px]
          `}
        >
          <Icon name="back" />
        </Link>
      </div>
      <div className="w-full md:w-1/3 order-last md:order-none max-w-block">
        <Title>{repo}</Title>
        <Paragraph>
          A component toolkit for creating live-running code editing
          experiences, using the power of CodeSandbox.
        </Paragraph>
      </div>
      <div
        className={`
          w-1/2 md:w-1/3 justify-end flex text-xs items-start
        `}
      >
        <div className="space-x-xs inline-flex items-center">
          <Icon
            name="star"
            className="text-md"
          />
          <span>{starCount}</span>
        </div>
      </div>
    </header>
    <main className="py-sm sm:py-lg xl:py-xl text-light-shade-2 dark:text-dark-shade-2 max-w-content w-full">
      <Lanes data={branches} />
    </main>
  </>
);

const errorRedirect = (error: "api" | "url") => ({
  redirect: {
    destination: `/?error=${error}`,
    permanent: false,
  },
});

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) return errorRedirect("url");

  const { slug } = params;
  if (!slug || slug.length <= 1) return errorRedirect("url");
  const [owner, repo] = slug as string[];

  try {
    const { branches, starCount } = await fetchGithubData({ owner, repo });

    return {
      props: {
        branches,
        starCount,
        repo,
      },
    };
  } catch (error) {
    console.error(error);
    return errorRedirect("api");
  }
};

export default Page;
