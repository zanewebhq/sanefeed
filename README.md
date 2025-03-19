# SaneFeed

SaneFeed is a user-friendly, feature-rich RSS reader designed to provide a seamless content consumption experience across multiple platforms.

## Table of Contents

- [SaneFeed](#sanefeed)
    - [Table of Contents](#table-of-contents)
    - [Prerequisites](#prerequisites)
    - [Get started](#get-started)
    - [License](#license)

## Prerequisites

- [Node](https://nodejs.org/en) with [Node version manager](https://github.com/nvm-sh/nvm)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

## Get started

1. Clone the repository
    ```
    git clone git@github.com:zanewebhq/sanefeed.git
    ```
2. Install the dependencies
    ```
    pnpm install
    ```
3. Create a `.env` file and add the variables as specified in the [.env.example](./.env.example).
4. Set up the local database
    ```
    pnpm db:up
    ```
5. Apply the migrations to the local database
    ```
    pnpm migrate:up
    ```
6. Done! You can now start developing locally.

## License

This project is licensed under the MIT License. See the LICENSE file for details.