// Get current active tab
async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    return tab;
}

// Apply Theme Button
document.getElementById("applyBtn").addEventListener("click", async () => {

    try {
        const tab = await getCurrentTab();

        // Block chrome:// pages
        if (
            tab.url.startsWith("chrome://") ||
            tab.url.startsWith("edge://") ||
            tab.url.startsWith("about:")
        ) {
            alert("Please open a normal website first.");
            return;
        }

        const bgColor =
            document.getElementById("bgColor").value || "#ffffff";

        const textColor =
            document.getElementById("textColor").value || "#000000";

        const buttonColor =
            document.getElementById("buttonColor").value || "#007bff";

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            args: [bgColor, textColor, buttonColor],
            func: (bg, text, button) => {

                let style =
                    document.getElementById("website-color-changer");

                if (!style) {
                    style = document.createElement("style");
                    style.id = "website-color-changer";
                    document.head.appendChild(style);
                }

                style.innerHTML = `
                    html, body {
                        background-color: ${bg} !important;
                        color: ${text} !important;
                    }

                    * {
                        color: ${text} !important;
                    }

                    button,
                    input[type="button"],
                    input[type="submit"] {
                        background-color: ${button} !important;
                        color: white !important;
                    }

                    a {
                        color: ${text} !important;
                    }
                `;
            }
        });

    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
    }
});

// Dark Mode Button
document.getElementById("darkBtn").addEventListener("click", async () => {

    try {
        const tab = await getCurrentTab();

        if (
            tab.url.startsWith("chrome://") ||
            tab.url.startsWith("edge://") ||
            tab.url.startsWith("about:")
        ) {
            alert("Please open a normal website first.");
            return;
        }

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {

                let style =
                    document.getElementById("website-color-changer");

                if (!style) {
                    style = document.createElement("style");
                    style.id = "website-color-changer";
                    document.head.appendChild(style);
                }

                style.innerHTML = `
                    html, body {
                        background: #121212 !important;
                        color: white !important;
                    }

                    * {
                        color: white !important;
                    }

                    button,
                    input[type="button"],
                    input[type="submit"] {
                        background: #333 !important;
                        color: white !important;
                    }

                    a {
                        color: #4da6ff !important;
                    }
                `;
            }
        });

    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
    }
});

// Reset Button
document.getElementById("resetBtn").addEventListener("click", async () => {

    try {
        const tab = await getCurrentTab();

        if (
            tab.url.startsWith("chrome://") ||
            tab.url.startsWith("edge://") ||
            tab.url.startsWith("about:")
        ) {
            alert("Please open a normal website first.");
            return;
        }

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {

                const style =
                    document.getElementById("website-color-changer");

                if (style) {
                    style.remove();
                }
            }
        });

    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
    }
});