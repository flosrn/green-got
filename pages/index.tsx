import React from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import LayoutPage from "components/layout-page";

import styles from "../styles/Home.module.css";

interface Props {
  user: {
    first_name: string;
    last_name: string;
  };
}

const HomePage: React.FC<Props> = ({ user }: Props) => {
  return (
    <LayoutPage title="Home">
      <h1 className={styles.title}>Hello 👋</h1>
      <h1>
        My name is {user?.first_name} {user?.last_name} !
      </h1>

      <h3>I'm a fullstack french developer 🇫🇷</h3>

      <div className={styles.links}>
        <a
          href="https://www.linkedin.com/in/florian-seran/"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Linkedin
        </a>
        <a
          href="https://github.com/Flosrn"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Github
        </a>
        <a
          href="https://www.notion.so/Hello-This-is-Florian-c818d334e4ea41eba4b0cb930e30288f"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Notion portfolio
        </a>
      </div>
    </LayoutPage>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get("http://localhost:3000/api/greetings");
  return {
    props: { user: data },
  };
};

export default HomePage;
