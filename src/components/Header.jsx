import { Github, Moon, Route, Sun } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMessageStore from "../stores/MessageStore";
import useThemeStore from "../stores/ThemeStore";
import Button from "./Button";

const Header = () => {
  const { selectedTheme, toggleTheme } = useThemeStore();
  const { message, type, isOpen, closeMessage } = useMessageStore();
  const navigator = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      closeMessage();
    }, 5000);
  }, [isOpen]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between border-b shadow-sm p-3">
        <Button
          config={{
            icon: <Route strokeWidth={2} />,
            label: "",
            isTextBold: true,
          }}
          onClickFn={() => navigator("/")}
        />

        <div className="flex flex-row">
          <Button
            config={{
              icon: <Github strokeWidth={2} />,
              label: "GitHub",
              isTextBold: false,
            }}
            onClickFn={() => window.open(process.env.REACT_APP_GITHUB_LINK)}
          />

          <Button
            config={{
              icon:
                selectedTheme === "light-theme" ? (
                  <Moon strokeWidth={2} />
                ) : (
                  <Sun strokeWidth={2} />
                ),
              label: selectedTheme === "light-theme" ? "Dark" : "Light",
              isTextBold: false,
            }}
            onClickFn={() => {
              selectedTheme === "light-theme"
                ? toggleTheme("dark-theme")
                : toggleTheme("light-theme");
            }}
          />
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-row justify-center border-b p-2">
          <span style={{ color: type === "error" ? "red" : "green" }}>
            {message}
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
