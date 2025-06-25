# 🍲 Recipe Book - A Hub for Food Lovers

Welcome to **Recipe Book**, a dynamic and responsive web app for food enthusiasts to share, explore, and manage their favorite recipes. Featuring private routes, Google authentication, recipe filtering, interactive likes, and stunning animations – this app offers a fully-fledged recipe management experience.

🔗 **Live Site URL:** [https://recipebook-client.netlify.app]([https://recipebook-client.netlify.app](https://recipe-booking-app-mashruf-ahmed55.netlify.app/))  
🔗 **Client Repository:** [GitHub - recipebook-client]([https://github.com/yourusername/recipebook-client](https://github.com/Programming-Hero-Web-Course4/b11a10-client-side-Mashruf-Ahmed55))  
🔗 **Server Repository:** [GitHub - recipebook-server]([https://github.com/yourusername/recipebook-server](https://github.com/Programming-Hero-Web-Course4/b11a10-server-side-Mashruf-Ahmed55))

---

## 🚀 Key Features

- 🔐 **Authentication & Protected Routes**  
  Users can register or log in using email/password or Google. Certain routes (Add Recipe, My Recipes, Recipe Details) are accessible only to logged-in users.

- ❤️ **Like System & Top Recipes**  
  View the top 6 liked recipes on the homepage. Users can like any recipe _except their own_. The like count updates instantly.

- 🧑‍🍳 **Personal Recipe Manager**  
  Authenticated users can add, view, update, and delete their own recipes in a private dashboard.

- 🌐 **Dynamic Filtering & Search**  
  Easily filter all recipes by cuisine type using a dropdown menu.

- 🌗 **Dark/Light Theme Toggle**  
  Enjoy a visually pleasing UI with theme switching between dark and light modes.

- 🎉 **Stunning Animations**  
  Enhanced user experience using:
  - `Lottie-react` for animated banners  
  - `React-awesome-reveal` for smooth reveals on scroll

---

## 🧩 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Firebase Auth, SweetAlert2, Lottie, React Awesome Reveal  
- **Backend:** Express.js, MongoDB, Mongoose, dotenv, CORS  
- **Hosting:**  
  - Client: Netlify  
  - Server: Vercel  
- **Database:** MongoDB Atlas

---

## 🧪 Environment Variables (Not Exposed)

- Firebase Config Keys  
- MongoDB Connection URI  

Stored securely using `.env` files and excluded via `.gitignore`.

---

## 📱 Responsive Design

Tested on:

- ✅ Mobile  
- ✅ Tablet  
- ✅ Desktop  

All views are fully responsive and optimized for different screen sizes.

---

## 📂 Folder Structure Overview

### Client
```
src/
├── assets/
├── components/
├── hooks/
├── layouts/
├── pages/
│   ├── Home.jsx
│   ├── AddRecipe.jsx
│   ├── AllRecipes.jsx
│   ├── MyRecipes.jsx
│   ├── RecipeDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
├── router/
├── App.jsx
├── main.jsx
```

---

## ✅ Requirements Checklist

| Requirement                           | Status |
|--------------------------------------|--------|
| Min 15 client GitHub commits          | ✅     |
| Min 8 server GitHub commits           | ✅     |
| Custom README with live site          | ✅     |
| Firebase config + Mongo URI hidden    | ✅     |
| Responsive design                     | ✅     |
| No Lorem Ipsum or default alert       | ✅     |
| Unique design                         | ✅     |
| SPA reloading works on all routes     | ✅     |
| Domain added in Firebase Auth         | ✅     |
| Custom 404 page without Navbar/Footer | ✅     |

---

## 📧 Contact

**Name:** Mashruf Ahmed 
**Email:** mashrufahmed03@gmail.com
**GitHub:** [Mashruf Ahmed]([https://github.com/yourusername](https://github.com/Mashruf-Ahmed55))
