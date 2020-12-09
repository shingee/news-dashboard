# News Dashboard

📺  A simple rotating news dashboard for feedly. 

![news dashboard banner](banner.png)

--- 

## Install

1. Clone repository: `git clone https://github.com/shingee/news-dashboard.git`
2. Install packages: `npm install` or `yarn`
3. Add your feedly credentials (user ID and access token) in `src/config.js` 

## Initialize

1. Start server: `cd src && node server.js`
2. In a separate terminal window, Start react front-end: `npm run start` or `yarn start`

## Blacklist categories

To prevent news from certain categories add them to a blacklist.

1. Fetch all your category IDs: `cd src && node get-categories.js`
2. Add the IDs to the `CATEGORY_BLACKLIST` array in `src/config.js`