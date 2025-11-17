# SBA-320H - MangaDB

A responsive web application built with React, designed to be a one-stop-shop for fans of manga, manhwa, manhua, and light novels. Using the Jikan API, it provides detailed information, recommendations, and a user-favorite system.

## Link to Demo

[Demo Link](https://manga-db-site.netlify.app/)

## Features

- Browse & Discover: Explore thousands of titles, including manga, novels, light novels, oneshots, doujin, manhwa, and manhua.

- Detailed Information: View a dedicated page for any title with its summary, genres, score, and other details.

- User Favorites: Create an account to save and manage a list of your favorite manga.

- Recommendation Carousel: Displays manga recommendations in an interactive carousel, with titles appearing on hover.

- Responsive Pagination: A custom page controller for search results and top manga, showing the first page, last page, and increments of the current page.

- Responsive Design: A clean and modern interface that works for desktop browsers.

## Tech Stack
- Front-End: React, JavaScript (ES6+), HTML5, CSS
- State Management: React Context, useReducer, useState
- API Official Page: [Jikan API](https://jikan.moe/)
- API Docs: [Jikan API Docs](https://docs.api.jikan.moe/)

## Implementation Highlights

- Client-Side Auth (Context & Reducer): Manages user state and favorites using useReducer and useContext. A useEffect hook in the auth context monitors state changes and automatically persists the current user and updated user list to localStorage's "user" and "users" keys.

- Dynamic Page Headings (Context): A second React Context is used to manage and update the main page heading. This allows any child component to pass a new heading string up to the main layout.

## A Note on Authentication & Data Persistence

This project features a complete, front-end-only authentication system. This approach was chosen to demonstrate managing user state, session persistence, and data handling purely on the client side.

- No Database: There is no backend or database. All user information, including account details and favorited manga, is stored exclusively in the browser's localStorage.

- Browser-Specific Accounts: Because data is stored in localStorage, an account is tied only to the browser it was created in.

  * An account created in one browser will not be accessible in another browser.
  * This also means the same "unique" username and email can be used to create a different account in another browser.


## Acknowledgements

This project was made possible by the free [Jikan API](https://jikan.moe/).