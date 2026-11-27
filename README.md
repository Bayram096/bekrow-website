# bekrow.ca

Static website for Bekrow Development Ltd., hosted on GitHub Pages.

- `index.html` – main site, commercial only (bekrow.ca)
- `residential/index.html` – residential site (bekrow.ca/residential). Not linked from the main site, marked `noindex` and left out of the sitemap, so only people given the link will find it.
- `style.css`, `site.js` – shared styles and script for both pages
- `images/` – photos
- Contact forms: `FORM_KEY` in `site.js` is the Web3Forms access key. Each form's `data-subject` sets the email subject, so commercial and residential requests arrive labelled. Without a key, the form opens the visitor's email app.
