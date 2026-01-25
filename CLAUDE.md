# Project Guidelines for Claude Code

## Cache Busting

When updating `styles.css` or `script.js`, increment the version query string in `index.html`:

```html
<link rel="stylesheet" href="styles.css?v=1.2">
<script src="script.js?v=1.2"></script>
```

This prevents browser caching issues after deployment.

## Deployment

The site deploys to GitHub Pages from the `main` branch:
- URL: https://jimholden82.github.io/dcf-calc/
- Push to `main` triggers automatic deployment

## CSS Architecture

- Uses CSS custom properties (variables) in `:root` for colors and spacing
- BEM-style naming convention: `.block__element--modifier`
- State classes use `is-` prefix: `.is-active`, `.is-positive`
- Shared components across tools: `.panel`, `.input-group`, `.slider-group`, `.result-card`, `.info-box`

## Adding New Tools

1. Add a new nav tab in the `.nav` element
2. Create a new `.tool` container with `id="toolname-tool"`
3. Use shared component classes for consistency
4. Update `script.js` to handle the new tool's logic
