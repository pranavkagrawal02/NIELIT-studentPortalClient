import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../config/apiClient.js";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import { initialTheme } from "../utils/theme.js";
import "../styles/theme.css";
import "../studentPortal/MainPage.css";

function Page() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | not-found | error
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState(initialTheme);

  const pageName = searchParams.get("PN");
  const t = { btnLogin: "Log In", btnReg: "New Registration" };

  useEffect(() => {
    if (!pageName) {
      setStatus("not-found");
      setData(null);
      return;
    }

    setStatus("loading");
    api
      .getPage(pageName)
      .then((response) => {
        setData(response);
        setStatus("ready");
      })
      .catch((err) => {
        console.error("Failed to load page:", err);
        setStatus(err?.response?.status === 404 ? "not-found" : "error");
      });
  }, [pageName]);

  function adjustSize() {}
  function changeTheme(next) {
    setTheme(next);
    window.localStorage.setItem("sp-theme", next);
  }

  return (
    <div className="sp-root" data-theme={theme}>
      <Header lang={lang} setLang={setLang} adjustSize={adjustSize} theme={theme} changeTheme={changeTheme} t={t} />

      <div className="container" style={{ padding: "40px 0", minHeight: "50vh" }}>
        {status === "loading" && <p>Loading…</p>}

        {status === "error" && (
          <div>
            <h1>Something went wrong</h1>
            <p>We couldn't load this page. Please try again later.</p>
          </div>
        )}

        {status === "not-found" && (
          <div>
            <h1>Page not found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/">← Back to Home</Link>
          </div>
        )}

        {status === "ready" && data && (
          <>
            <h1>{data.pageTitle}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.pageContent }} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Page;
