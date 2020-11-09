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

  const setEnv = (projectId: string) => {};

  if (loading) {
    return <h1 className={styles.title}>Loading access token...</h1>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Redirect Handler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Redirect Handler</h1>

        <div className={styles.grid}>
          <div className={styles.card}>configurationId: {configurationId}</div>
          <div className={styles.card}>next: {next}</div>
          <div className={styles.card}>token: {token}</div>
          <div className={styles.card}>
            <h3>Projects</h3>
            <table className={styles.table}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th></th>
              </tr>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <code>{project.id}</code>
                  </td>
                  <td>
                    <strong>{project.name}</strong>
                  </td>
                  <td>
                    <button onClick={() => setEnv(project.id)}>Set Env</button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
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
}
