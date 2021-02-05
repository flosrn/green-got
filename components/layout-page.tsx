import React from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

interface Props {
  title: string;
  children: React.ReactNode;
}

const LayoutPage: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/create-user">
          <a>Create user</a>
        </Link>
      </div>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default LayoutPage;
