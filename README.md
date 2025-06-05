JustHome – Real Estate App (Interview Task)

This project is a real estate platform built using Next.js 14 and React 18. It allows users to view, filter, and manage properties. The goal was to implement key real estate features with a clean, performant frontend architecture.

✔ Features Implemented

- Project structure: Modular folders (containers, components, atoms)
- Authentication: Simple mock login using localStorage
- Admin mode: Logged-in users can edit properties (UI changes on hover)
- Create/Edit property pages
- SSR for data fetching
- Filter & property detail pages
- SEO: Meta tags and clean urls
- No Redux: Not needed due to local state + form libs

✔ Tech Stack

- Next.js (App Router)
- React 19 + TypeScript
- TailwindCSS, shadcn/ui
- Formik for form handling
- No external state management (Redux not required)

✔ user Journey

- All users can browse listed properties
- To add or edit a property, login first
- When logged in, hovering a property card shows an edit option
  note : (the data in selects in card is a mock data for (country - city - district) and property type) that's mean all data will not be exist

  note : The "Listing" link in the navbar navigates to the filter/search page.
