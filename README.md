# GitHub User Fetcher (Bootstrap-inspired, static site)

This is a self-contained static website intended for GitHub Pages. It publishes a Bootstrap-like page that lets you fetch a GitHub user's account creation date via the GitHub API.

How it works
- A form with id "github-user-${seed}" collects a GitHub username.
- On submit, it fetches https://api.github.com/users/{username}.
- If a URL parameter token is provided (?token=...), the request is authenticated with that token.
- The account creation date is displayed in UTC as YYYY-MM-DD UTC inside the element with id "github-created-at".

Usage
- Open index.html on a server or GitHub Pages.
- Optionally append ?token=YOUR_TOKEN to the URL to authenticate requests (highly limited for public endpoints).

Files
- index.html: The page HTML (inline script defines apiBase).
- style.css: Lightweight CSS to resemble Bootstrap form styling.
- main.js: Core logic for form handling and GitHub API fetch.
- README.md: This file.
- LICENSE: MIT License.