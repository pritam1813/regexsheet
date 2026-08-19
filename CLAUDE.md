## Development

Use **npm** as the package manager and runtime for this project.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Tailwind CSS v4 Conventions

When writing Tailwind CSS v4 utility classes:

1. **Use the Dynamic Numeric Scale:**
   * Tailwind v4 calculates spacing/sizing dynamically: `value_in_px / 4 = n`.
   * For any pixel measurement divisible by 4px, **always** use the numeric scale (e.g., `min-w-155` for 620px, `w-145` for 580px, `h-20` for 80px, `p-6` for 24px).
   * **Never** use bracketed arbitrary pixel values like `min-w-[620px]` or `p-[16px]` when the value maps to the 4px grid.

2. **When to use Arbitrary Values `[...]`:**
   * Only for values that do not align with the 4px grid (e.g., `min-w-[623px]`), percentage widths (e.g., `w-[30%]`), or CSS expressions (e.g., `calc(...)`).

3. **Theme Tokens:**
   * Use generated theme utility classes (`bg-surface`, `text-ink`, `border-border`, `shadow-card`) rather than inline `var(--...)` or `[var(--...)]`.

4. **Modern Shorthands:**
   * **Size:** Use `size-{n}` instead of `w-{n} h-{n}` for square dimensions (e.g., `size-7`, `size-3.5`, `size-4`).
   * **Inset:** Use `inset-{n}` instead of `top-{n} right-{n} bottom-{n} left-{n}`.
   * **Flex/Grid:** Use `gap-{n}` for spacing between child items rather than margin hacks.


