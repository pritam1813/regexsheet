# RegexSheet

> A free, fast reference for regular expressions.

RegexSheet is a comprehensive and lightning-fast cheat sheet for regular expressions across various programming languages and tools, including JavaScript, Python, Java, C#, R, SQL, Perl, Notepad++, Vim, and Grep.

## Features

- **Multi-language Support:** Specific regex guides for major programming languages and tools.
- **Fast & Responsive:** Built with [Astro](https://astro.build/) for optimal performance.
- **Dark Mode Support:** Seamless dark/light theme switching.
- **Downloadable PDFs:** Easily export cheat sheets as PDFs for offline use.

## Project Structure

Inside this Astro project, you'll see the following key folders and files:

```text
/
├── public/           # Static assets like icons and images
├── src/
│   ├── components/   # Reusable Astro components (e.g., SiteNav, SiteFooter)
│   ├── data/         # Regex data definitions (TypeScript)
│   ├── layouts/      # Astro layouts
│   ├── pages/        # Astro pages for different languages/tools
│   └── styles/       # Global CSS and Tailwind styles
├── AGENTS.md         # Developer guidelines
├── CONTRIBUTING.md   # Guidelines for contributing
└── package.json
```

## Local Development

RegexSheet uses **npm** as its package manager.

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the local dev server:**
   ```sh
   npm run dev
   ```

3. **Build for production:**
   ```sh
   npm run build
   ```

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get started, and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
