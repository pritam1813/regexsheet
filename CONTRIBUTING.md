# Contributing to RegexSheet

Thank you for your interest in contributing to RegexSheet! We welcome contributions to make our regular expression reference even better.

## Getting Started

1. **Fork the repository** and clone it locally.
2. **Install dependencies** using npm:
   ```bash
   npm install
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b my-feature-branch
   ```

## Development Guidelines

- **Package Manager**: Always use **npm** as the package manager and runtime.
- **Styling**: We use Tailwind CSS v4. Please follow the styling conventions outlined in [AGENTS.md](AGENTS.md) (e.g., use the dynamic numeric scale, avoid arbitrary values when possible, use modern shorthands).

### Modifying Data

Regex patterns and descriptions are stored in the `src/data/` directory. When making changes or additions to the regex definitions:

1. Locate the appropriate file in `src/data/` (e.g., `javascriptRegex.ts`, `pythonRegex.ts`).
2. Make your additions or corrections.
3. **⚠️ Important:** Any data-related changes *must* be verified by running the PDF generation process and checking the generated PDFs to ensure the formatting and content remain correct.

### Submitting a Pull Request

1. Make sure your code adheres to our styling conventions.
2. If you changed any data, ensure you have verified the generated PDFs.
3. Commit your changes with clear, descriptive commit messages.
4. Push to your fork and submit a Pull Request.
5. In your PR description, explain what changes you made and any relevant issues they fix.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and welcoming environment for everyone.
