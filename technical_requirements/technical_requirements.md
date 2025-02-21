Current Webapp:

The current app is built using React.

The app uses React Redux for state management.

The app uses React Router for routing.

The app uses axios to make API requests.

The app has a Netflix style UI.

The app is responsive.

The Home page shows a random video response from the API call that gets stored in the Redux store.

At the top of the page, there is a search bar that allows the user to search for video from the youtube Channels; "Hablando Huevadas" or "No Somos TV"

The Channel ID from the youtube channel title "Hablando Huevadas" is: `UC-yH-OeZwgcY3qKZM-8Z_Yg`

The Channel ID from the youtube channel title "No Somos TV" is: `UCba1vMvOHWlMddLARS382Zw`

The Channel ID from the youtube channel title "No Somos TV" is: `UCZFRsDLdgYLUIbQBSsdyVGg`

This website is a webapp that allows the user to search for videos from the youtube channels; "Hablando Huevadas" or "No Somos TV"

The Home Page will show some of the shows these channels have made.

The youtube channel "Hablando Huevadas" is a show that has playlists created for each season the show has currently made. We currently show every season from season 2 trough season 8, as the first season is a private playlist. Also only show the videos in the playlist that are not private.

The youtube channel "No Somos TV" has playlists created for each show they have. Each playlist represents a different show.

In the Shows section, we will show all the shows available from the youtube channel "No Somos TV", or the show  "Hablando Huevadas"

## Current Directory Structure
```text
/hh-app

├── /src
│   ├── /hh
│   │   ├── /components
│   │   │   ├── NavBar.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── /pages
│   │   │   ├── EpisodePage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   └── SearchPage.jsx
│   │   ├── /routes
│   │   │   ├── HomeRoutes.jsx
│   │   │   └── index.js
│   │   └── index.js
│   │
│   ├── /store
│   │   ├── /hh
│   │   │   └── hhSlice.js
│   │   ├── /youtube_api
│   │   │   ├── youtubeAPI.js
│   │   │   └── index.js
│   │   └── store.js
│   │
│   ├── /router
│   │   ├── AppRouter.jsx
│   │   └── index.js
│   │
│   ├── /theme
│   │   └── AppTheme.js
│   │
│   └── HHApp.jsx
│
├── .gitignore
└── technical_requirements
    └── technical_requirements.md
```

### Next Steps
- [x] Implement the card components for the shows of the "Hablando Huevadas" channel.
- [ ] Implement the card components for the shows of the "No Somos TV" channel.
- [ ] Implement the search functionality to search for videos from the youtube channels; "Hablando Huevadas" or "No Somos TV"
- [ ] Show the preview video in the Home Page from either show; "Hablando Huevadas" or "No Somos TV"
- [x] On click of a card component the show "Hablando Huevadas", open a modal that contains a Netflix style selector for the episode to play and ordered the episodes by season, like Netflix.
- [ ] On click card component of a show from "No Somos TV" channel, open a modal that contains a Netflix style selector for the episode to play.




