# **GrooveGrid**

<img src='./src/assets/Logo1.png'>

## Introduction

Welcome to **GrooveGrid**, a music application that allows you to create a personalized experience tailored to your musical taste. With **GrooveGrid**, you can seamlessly log in, explore genres, discover information about artists, and curate your own playlists.

## Getting Started

To get started with **GrooveGrid**, follow the instructions below:

1. Clone both of the repositories to your local machine.
2. [GitHub repository front-end](https://github.com/chuinga/GrooveGrid) & [GitHub repository back-end](https://github.com/chuinga/GrooveGrid-backend)
3. Install the required dependencies with `npm install` on both repositories.
4. Start the back-end application with `npm start`.
5. Start the front-end application with `npm run dev` and visit the provided page in your browser.
6. Explore the App and enjoy the features!

## Features

**GrooveGrid** offers a variety of features that provide a comprehensive and interactive user experience:

-   **User Authentication**: Securely log in to your account, ensuring a personalized experience.

-   **Create Playlist**: Build and customize your playlists with your favorite tracks.

-   **Genre Information**: Explore detailed information about various music genres.

-   **Song Details**: Access comprehensive details about each song, including title, artist, and album.

-   **Artist Profile**: Discover insights into your favorite artists and their discography.

## Backlog for Future Enhancements

As we continue to improve **GrooveGrid**, here are some ideas for future enhancements that we are considering:

### Expaded Music Library:

-   **Expanding**: Explore options for expanding the music library to provide a broader selection of songs and artists.

### Licensing and Copyrigth Compilance:

-   **Paternship**: Investigate partnerships and licensing agreements to legally make more songs available for user enjoyment, while ensuring compliance with copyright regulations.

### User-Suggested Features:

-   **Sugestions**:Consider incorporating features suggested by our users to enhance their overall experience.

### Feedback Mechanism:

-   **User Feedback System**: Implementing a user feedback mechanism for bug reports, scoring and feature requests.
-   **Community Voting**: Allowing users to vote on proposed features, helping prioritize development efforts.

## Project Structure

Our GrooveGrid application is meticulously organized for optimal development workflow and maintenance. Below is a detailed outline of the project's structure:

-   `node_modules`: Contains all the Node.js modules our project depends on.
-   `public`: This directory houses static assets, including the `index.html` entry point.
-   `src`: The core directory where the source code of our application is located.
-   `assets`: Here we store static resources such the images used across the app.
-   `react.svg`: An SVG logo for React.
-   `components`: This folder holds our React components, which include
    -   AlbumDetails.jsx: Displays detailed information about a specific album.
    -   AlbumList.jsx: Lists all available albums.
    -   ArtistList.jsx: Displays a list of artists in your application.
    -   ArtistDetails.jsx: Shows detailed information about a specific artist.
    -   CreateArtistForm.jsx: Provides a form for creating a new artist.
    -   CreatePlaylist.jsx: Offers a form to create a new playlist.
    -   EditPlaylist.jsx: Allows users to edit an existing playlist.
    -   GenreDetails.jsx: Shows detailed information about a specific genre.
    -   GenreList.jsx: Lists all available genres.
    -   IsPrivate.jsx: A component indicating whether a playlist is private or not.
    -   ModalComponents: Folder that holds various modal components for your application.
    -   Navbar.jsx: Navigation bar component for easy navigation within the app.
    -   PlaylistList.jsx: Displays a list of all available playlists.
    -   SongDetails.jsx: Provides detailed information about a specific song.
    -   SongList.jsx: Lists all songs available in your application.
    -   UpdatePlaylist.jsx: Allows users to update and modify an existing playlist.
-   `context`: a mechanism for efficiently passing and managing state data, such as user authentication or application-wide settings, throughout a React component tree, such as:
    -   auth.context.jsx: Manages and provides context related to user authentication, potentially storing information about the logged-in user, authentication status, or related data.
    -   Playlists.context.jsx: Manages and provides context related to playlists, potentially storing information about playlists, playlist details, or any state relevant to the playlists in your application.
-   `pages`: React components that correspond to the various pages of the app, such as:
    -   AboutUs.jsx: Page information about the app creators.
    -   AlbumsPage.jsx: Page displaying information and details about albums.
    -   ArtistsPage.jsx: Page listing and showcasing various artists.
    -   GenresPage.jsx: Page displaying information about different genres.
    -   HomePage.jsx: The entry point of the application, offering navigation to other pages.
    -   LoginPage.jsx: Page where users can log in to access personalized features.
    -   NotFoundPage.jsx: Custom 404 error page displayed when a route is not found.
    -   PlaylistPage.jsx: Page containing details about playlists.
    -   SignupPage.jsx: Page where users can sign up to create an account.
    -   SongsPage.jsx: Page providing information about songs and potentially offering a list of songs.
    -   UserProfilePage.jsx: Page displaying the user's profile information.
-   `styling`: Directory for all CSS files, ensuring a consistent and elegant UI/UX.
    -   ArtistsPage.css: Styling details for the Artists page.
    -   AlbumsPage.css: Styling details for the Albums page.
    -   Footer.css: Styling details for the footer section of your web app.
    -   GenreDetails.css: Styling details for the GenreDetails component.
    -   GenresPage.css: Styling details for the Genres page.
    -   HomePage.css: Styling details for the home page of your web app.
    -   LoginPage.css: Styling details for the login page.
    -   Navbar.css: Styling details for the navigation bar.
    -   NotFound.css: Styling details for the 404 Not Found page.
    -   Playlist.css: Styling details for the Playlist component.
    -   Signup.css: Styling details for the signup page.
    -   SongsList.css: Styling details for the SongsList component.
    -   UserProfilePage.css: Styling details for the user profile page.
    -   App.css: Global styling details for the entire application.
-   `.eslintrc.cjs`: ESLint configuration file for code style and quality checks.
-   `.gitignore`: Lists the files and directories which are not to be tracked by Git.
-   `package-lock.json` & `package.json`: These files manage project dependencies and metadata.
-   `README.md`: A markdown file providing detailed information about the project.
-   `vite.config.js`: Configuration file for Vite, our frontend build tool.

    This structure highlights our dedication to a clean and organized codebase, making it straightforward for developers to locate and familiarize themselves with the various aspects of our application, which supports efficient development and easy upkeep..

## Links

-   [Slides Link](https://docs.google.com/presentation/d/1NSUfj4DBbZi1HAeQlJi3cHnQCgnGoj1lmNGvMwE15yU/edit?usp=sharing)
-   [Github repository Link back-end](https://github.com/chuinga/GrooveGrid-backend)
-   [GitHub repository Link front-end](https://github.com/chuinga/GrooveGrid)
-   [Netlify page Link](https://groovegrid.netlify.app/)
-   [Trello Link](https://trello.com/b/hNXzkmYr/groovegrid)

## Made By

**GrooveGrid** is proudly developed by a team of dedicated and talented individuals:

-   **Carina França**

    -   Is 28 years old with a background in pharmacy, changing careers to IT and really enjoying the process.

-   **Josip Milan**

    -   Josip's narrative is a tale of transformation from a high-caliber Executive Sous Chef to an innovative web developer. His remarkable journey into the tech realm is marked by the same passion and pursuit of excellence that distinguished his culinary career. In Amsterdam's bustling cityscape, Josip's blend of creativity and systematic problem-solving manifests in his dedication to the HERO_COMPARE project. His diverse interests, from gastronomy to gaming, infuse his work with a unique perspective, making him a vital contributor to the world of IT.

-   **Miguel Martins**

    -   When I'm not immersed in code, you'll often find me tearing up the trails on my downhill bike, embracing the thrill of speed and adventure. Downhill biking isn't just a hobby it's a lifestyle that keeps me grounded and energized. Outside the realm of technology, I find solace in composing music, blending melodies and harmonies to create captivating soundscapes.

-   **Victor Silva**
    -   I was born in Brazil but came to Portugal when I was five years old, since then I have lived in Lisbon. I have a background in Management, but I have always been interested in technology, which is why I decided not to pursue the area of economics. I really like playing football and playing computer games.

This project showcases their dedication, ingenuity, and hard teamwork. The **GrooveGrid** team consistently challenges conventional norms in web development, establishing fresh benchmarks for creativity and user engagement.
