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
3. **⚠️ Important:** Any data-related changes *must* be verified by running the PDF generation process and checking the generated PDFs to ensure the formatting and content remain correct. (`npm run build:pdfs`)
4. **Run the test suite** to ensure your regex syntax compiles and evaluates correctly across different language runtimes.

### Testing

RegexSheet includes a test suite that dynamically evaluates the regex definitions against native language runtimes to ensure correctness.

#### Option 1: Using Docker (Recommended)
You can run the entire test suite in an isolated Docker container that has all the required language runtimes pre-installed.
```bash
docker compose -f docker-compose.test.yml up --build
```

#### Option 2: Running Locally
To run all tests locally on your machine:
```bash
npm run test:all
```

**Local Testing Requirements:**
The test scripts automatically detect available CLI tools and will gracefully skip languages that aren't installed on your system. To fully run the entire suite locally without Docker, you'll need the following installed:
- **Node.js** (>= 22.12.0, for JavaScript tests and running the test suite)
- **Python** (`python` or `python3` for Python tests)
- **Java** (`javac` and `java` for Java tests)
- **.NET SDK** (`dotnet` for C# tests)
- **R** (`Rscript` for R tests)
- **Perl** (`perl` for Perl tests)
- **Grep** (`grep` for Grep tests)

### Submitting a Pull Request

1. Make sure your code adheres to our styling conventions.
2. If you changed any data, ensure you have verified the generated PDFs.
3. Commit your changes with clear, descriptive commit messages.
4. Push to your fork and submit a Pull Request.
5. In your PR description, explain what changes you made and any relevant issues they fix.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and welcoming environment for everyone.
