import Head from "next/head";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { Title } from "@/components/Text/Title.component";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const App = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    // wait 300ms before showing loader to make it feel "snappy"
    timerRef.current = setTimeout(() => {
      setIsLoading(true);
    }, 300);

    return () => clearTimeout(timerRef.current);
  }, []);

  // remove loader as soon as router is ready
  const { isReady } = useRouter();
  useEffect(() => {
    if (!isReady) return;

    clearTimeout(timerRef.current);
    if (isLoading) setIsLoading(false);
  }, [isReady]);

  return (
    <>
      <Head>
        <title>Codesandbox Sandpack</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <div
        className={`
          ${inter.variable} font-inter 
          w-full h-full fixed left-0 top-0 flex flex-col items-center
          bg-light-shade-5 dark:bg-dark-shade-5  overflow-auto
          text-light-shade-1 dark:text-dark-shade-1
        `}
      >
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <Title>Loading...</Title>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </>
  );
};

export default App;
