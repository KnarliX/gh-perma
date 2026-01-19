# gh-perma

Permanent GitHub URLs powered by immutable user IDs.

`gh-perma` solves a simple but real problem:  
GitHub profile and repository URLs break when usernames change.  
This project provides a stable, ID-based resolver that always redirects to the current GitHub username.

---

## Why gh-perma?

GitHub usernames are mutable.  
GitHub user IDs are not.

`gh-perma` uses this fact to generate **permanent GitHub links** that continue to work even if a user renames their account.

---

## Live instance

**Dashboard:**  
https://gh-perma.pages.dev/dash

**Resolver:**  
https://gh-perma.pages.dev

---

## How it works

1. You enter a GitHub username or GitHub URL
2. `gh-perma` fetches the immutable GitHub user ID
3. A permanent URL is generated using that ID
4. When opened, the resolver:
   - Fetches the current username via GitHub API
   - Redirects to the correct GitHub profile or repository path

No database.  
No authentication.  
Pure client-side + GitHub API.

---

## URL format

### Profile
`https://gh-perma.pages.dev?id=USER_ID`

### Repository / path
`https://gh-perma.pages.dev?id=USER_ID&path=repo/tree/main`
### Examples
- [https://gh-perma.pages.dev?id=172272341](https://gh-perma.pages.dev?id=172272341)
- [https://gh-perma.pages.dev?id=172272341&path=Discord-Auth/tree/main](https://gh-perma.pages.dev?id=172272341&path=Discord-Auth/tree/main)

---

## Dashboard usage

You can generate permanent URLs from the dashboard:

- Username:
knarliX
- Username with path:
knarliX/repo/blob/main/README.md
- Full GitHub URL:
https://github.com/KnarliX/repo
All formats are supported.

---

## Error handling

- Invalid ID → shown immediately
- User not found → clear error dialog
- GitHub API rate limit → explicit warning
- Network failure → graceful fallback

---

## Tech stack

- HTML / CSS / Vanilla JavaScript
- GitHub REST API
- Cloudflare Pages

No frameworks.  
No build step.  
Minimal surface area.

---

## Limitations

- Depends on GitHub API availability
- Subject to GitHub API rate limits (unauthenticated)
- Not intended to be a canonical SEO URL

This is a **resolver**, not a replacement for GitHub URLs.

---

## Roadmap (optional, non-binding)

- Clean path-based routing (`/{id}/{path}`)
- Cloudflare pages

---

## License

MIT License  
You are free to use, modify, and self-host.

---

## Author

Built by **[Rajnish Mehta](https://gh-perma.pages.dev?id=172272341)**  
For developers who care about stable links.
