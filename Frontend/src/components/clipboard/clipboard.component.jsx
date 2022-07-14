import { useState } from "react";
import "./clipboard.styles.css";

const ClipboardCopy = ({ copyText }) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = (e) => {
    e.preventDefault();
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form class="clipboard">
        <input type="text" value={copyText} readOnly />
        <button class="clip-button" onClick={handleCopyClick}>
          <span>{isCopied ? "Copied!" : "Copy"}</span>
        </button>
      </form>
    </div>
  );
};

export default ClipboardCopy;
