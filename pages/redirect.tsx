import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Redirect() {
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState([]);
  const [configurationId, setConfigurationId] = useState("");
  const [next, setNext] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const configurationId = params.get("configurationId");
    const next = params.get("next");

    if (!(code && configurationId && next)) {
      throw new Error("Missing required integration URL params");
    }
    console.debug("useEffect found", { code, configurationId, next });
    setLoading(false);
    setConfigurationId(configurationId);
    setNext(next);
    setCode(code);
  }, []);

  useEffect(() => {
    if (!code) return;
    if (token) return;
    setLoading(true);
    const fn = async () => {
      const res = await fetch(
        `/api/callback?code=${code}&configurationId=${configurationId}`
      );
      if (!res.ok) {
        throw new Error("Failed to get access token");
      }
      const json = await res.json();
      console.debug("callback", { json });
      setToken(json.token);
      setProjects(json.projects);
      setLoading(false);
    };
    fn();
  }, [code]);

  const setEnv = async (project: any) => {
    console.debug("setEnv", { project });
    const key = "LEONARD_TEST";
    const value = "LEONARD_VAL";
    const res = await fetch(
      `/api/setEnvVars?token=${token}&projectId=${project.id}&key=${key}&value=${value}`
    );
    if (!res.ok) {
      throw new Error("Failed to get access token");
    }
    const json = await res.json();
    console.debug("setEnv res", { json });
  };

  return (
    <Page>
      {loading ? (
        <h3>Loading access token...</h3>
      ) : (
        <div className={styles.grid}>
          <div className={styles.card}>
            <table className={styles.table}>
              <tr>
                <th className={styles.tableHeaderShrink}>Key</th>
                <th>val</th>
              </tr>
              <tr>
                <td>configurationId</td>
                <td>{configurationId}</td>
              </tr>
              <tr>
                <td>token</td>
                <td>{token}</td>
              </tr>
              <tr>
                <td>next</td>
                <td>{next}</td>
              </tr>
            </table>
          </div>
          <div className={styles.card}>
            <table className={styles.table}>
              <tr>
                <th>Project</th>
                <th></th>
              </tr>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <strong title={project.id}>{project.name}</strong>
                  </td>
                  <td>
                    <button onClick={() => setEnv(project)}>Set Env</button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div>
            <button
              onClick={() => {
                console.debug("All Done, going to", { next });
                window.location.href = next;
              }}
            >
              All Done
            </button>
          </div>
        </div>
      )}
    </Page>
  );
}

const Page = ({ children }) => (
  <div className={styles.container}>
    <Head>
      <title>Redirect Handler</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Redirect Handler</h1>
      {children}
    </main>
    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=vercel-integration-test&utm_medium=default-template&utm_campaign=vercel-integration-test"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
      </a>
    </footer>
  </div>
);
