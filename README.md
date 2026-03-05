# EduStream

React + Vite app scaffolded with:

- MUI for UI components and theming
- Supabase for database and edge function integration

## Project Structure

```text
src/
	components/
		common/
			Header.jsx
		dashboard/
			ConnectionStatusCard.jsx
	layouts/
		AppLayout.jsx
	pages/
		HomePage.jsx
	services/
		supabase/
			client.js
			database.js
			functions.js
	theme/
		theme.js
	App.jsx
	main.jsx
	index.css
```

## Environment Variables

1. Copy `.env.example` to `.env`
2. Fill values from your Supabase project settings:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Scripts

- `npm run dev` - run development server
- `npm run build` - build production bundle
- `npm run preview` - preview build
