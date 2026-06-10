# Artwork Content Guide

Use this guide when you need to add, edit, sell, rename, or reorder artworks without ChatGPT.

The main file to edit is:

```text
data/works.json
```

Artwork images live in:

```text
public/paintings
```

When you commit a change to GitHub, Vercel should redeploy the website automatically.

## Add A New Artwork

1. Upload the artwork image to `public/paintings`.
2. Open `data/works.json`.
3. Copy one existing artwork record.
4. Paste it in the correct place.
5. Change the fields.
6. Commit the change to GitHub.

For an available work, use this shape:

```json
{
  "slug": "new-work-title",
  "title": "New Work Title",
  "year": "2026",
  "medium": "Oil on canvas",
  "dimensions": "31\" x 29\"",
  "priceGhs": 8500,
  "availability": "Available",
  "images": ["/paintings/new-work-title.jpg", "/paintings/new-work-title-detail.jpg"],
  "format": "Portrait",
  "featured": true,
  "description": "New Work Title is an available oil painting by Kofi Baiden."
}
```

For a sold work, use this shape:

```json
{
  "slug": "sold-work-title",
  "title": "Sold Work Title",
  "year": "2024",
  "medium": "Oil on canvas",
  "dimensions": "30\" x 35\"",
  "availability": "Sold",
  "images": ["/paintings/sold-work-title.jpg"],
  "format": "Landscape"
}
```

## Important Fields

`slug`: The page URL. Use lowercase letters, numbers, and hyphens only. Example: `jazz-in-the-shadows`.

`title`: The visible artwork title. If this is only a number, the title is still missing.

`availability`: Use only `Available` or `Sold`.

`priceGhs`: Number only. Do not type `GHS`, commas, or VAT text. The website automatically displays it as GHS and says `incl. VAT`.

`images`: Use 1 or 2 images. The site only uses the first 2. Paths must start with `/paintings/`.

`format`: Use only `Portrait`, `Landscape`, or `Square`.

`featured`: Set to `true` for available works that should appear on the homepage.

`showOnHomepage`: Set to `true` for sold works that should appear in the homepage latest artworks list.

`showOnWorksPage`: Set to `true` for sold works that should also appear on the Works page.

`showInGallery`: Set to `false` only when a sold work should be hidden from the Gallery page.

## Reorder Works

The order inside `data/works.json` controls the curated order on the site.

Keep available works near the top in the order you want them to appear on the Works page. Keep sold works below them in the order you want them to appear in the Gallery.

## Mark A Work As Sold

Change:

```json
"availability": "Available"
```

to:

```json
"availability": "Sold"
```

Then remove `featured` if you no longer want it in the homepage available works group.

If you still want it to appear on the Works page as sold, add:

```json
"showOnWorksPage": true
```

## Replace An Image

1. Upload the new image to `public/paintings`.
2. Update the image path in `data/works.json`.
3. Keep the path like this:

```json
"/paintings/file-name.jpg"
```

Use simple filenames with lowercase letters and hyphens, such as:

```text
colour-ripples-detail.jpg
```

## Check Your Edits Locally

If you have the project on your computer, run:

```bash
npm run content:check
npm run build
```

`npm run content:check` will warn you about things like missing titles, missing prices, duplicate slugs, and image files that do not exist.

## Quick Completion Checklist

Before publishing a new available work, confirm it has:

- Real title
- Year
- Medium
- Dimensions
- GHS price including VAT
- At least one real image
- Correct availability
- Correct format
- Clear description
