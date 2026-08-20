# Medimax Surgicals — Website

A single-page React (Vite) website for Medimax Surgicals. Content (products, testimonials,
contact details, WhatsApp number) is driven entirely by JSON files, so you can update the site
without touching any code.

## Project structure

```
Medimax/
├── public/
│   ├── data/
│   │   ├── config.json        # company info, nav, hero, about, contact, whatsapp
│   │   ├── products.json      # product cards
│   │   ├── testimonials.json  # client testimonial cards
│   │   └── team.json          # leadership cards (CEO, CTO, etc.)
│   └── assets/
│       ├── logo/               # your logo files (already added)
│       └── images/
│           ├── products/       # put product photos here
│           ├── team/           # put testimonial (client) photos here
│           └── leadership/     # put CEO/CTO/leadership photos here
├── src/                        # React app source
├── deploy.sh                   # one-command GitHub Pages deploy
└── package.json
```

## Running locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Editing content

### Products

Edit `public/data/products.json`. Add as many entries as you like — they render as a
horizontally-scrolling carousel with arrows and dots automatically.

```json
{
  "id": "p7",
  "name": "New Product Name",
  "category": "Category",
  "image": "new-product.jpg",
  "description": "Short description."
}
```

Drop the matching photo into `public/assets/images/products/new-product.jpg`. If an image is
missing, a placeholder card is shown automatically — the site never breaks.

### Testimonials

Edit `public/data/testimonials.json` the same way. `image` should match a file placed in
`public/assets/images/team/`. If missing, the person's initials are shown in a colored circle
instead.

```json
{
  "id": "t5",
  "name": "Person Name",
  "designation": "Title, Company",
  "image": "person-name.jpg",
  "quote": "Their quote here."
}
```

### Leadership (CEO, CTO, etc.)

Edit `public/data/team.json`. `image` should match a file placed in
`public/assets/images/leadership/`. `bio` and `linkedin` are optional — omit either and the card
just won't show that line.

```json
{
  "id": "m5",
  "name": "Person Name",
  "designation": "Chief Something Officer",
  "image": "person-name.jpg",
  "bio": "One line about their role.",
  "linkedin": "https://linkedin.com/in/..."
}
```

### Company / contact details, WhatsApp number

All in `public/data/config.json`:

- `contact.address`, `contact.phone`, `contact.email`, `contact.socials` — shown in the Contact section.
- `whatsapp.number` — digits only, with country code, no `+` or spaces (e.g. `919876543210`).
- `whatsapp.message` — the pre-filled message opened in WhatsApp.

## Connecting the Contact Form to Google Forms

1. Create a Google Form with fields for Name, Email, Phone, and Message.
2. Open the live form, click the 3-dot menu → **Get pre-filled link**.
3. Fill in dummy values for each field and click **Get link**, then copy the generated URL.
4. In that URL, each field appears as `entry.123456789=value`. Note the `entry.XXXXXXXXX` id for
   each field.
5. Take the form's edit URL, e.g. `https://docs.google.com/forms/d/e/1FAI.../viewform`, and
   change `viewform` to `formResponse` — that's your `formActionUrl`.
6. Update `public/data/config.json`:

```json
"googleForm": {
  "formActionUrl": "https://docs.google.com/forms/d/e/1FAI.../formResponse",
  "fields": {
    "name": "entry.111111111",
    "email": "entry.222222222",
    "phone": "entry.333333333",
    "message": "entry.444444444"
  }
}
```

Until this is filled in, the form shows a small notice instead of silently failing.
Responses will appear in your Google Form's **Responses** tab (and optionally a linked Sheet).

## Deploying to GitHub Pages (one command)

1. Create a GitHub repository and set it as the remote:

   ```bash
   git init
   git remote add origin git@github.com:<your-username>/<your-repo>.git
   git add -A
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. Deploy:

   ```bash
   ./deploy.sh
   ```

   (or `npm install && npm run deploy`)

This builds the site and pushes it to a `gh-pages` branch using the `gh-pages` package. In your
repo settings → **Pages**, set the source to the `gh-pages` branch (GitHub usually detects and
enables this automatically after the first push). Your site will be live at
`https://<your-username>.github.io/<your-repo>/`.

Re-run `./deploy.sh` any time you update content or code.
