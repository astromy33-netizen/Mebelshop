# MebelMart - Online Furniture Store

A simple React frontend application for an online furniture store. Built with Vite, React, TailwindCSS, and MockAPI.

## Features

- 🛋️ **Furniture Catalog** - Browse and search furniture items
- 🛒 **Shopping Cart** - Add items to cart and checkout
- ❤️ **Favorites** - Save favorite products
- 📦 **Orders** - View order history
- 📅 **Booking** - Book furniture appointments
- 👤 **User Authentication** - Login and registration
- 🎨 **Dark/Light Theme** - Toggle between themes
- 🌍 **Multilanguage** - Support for KG, RU, EN
- 👨‍💼 **Admin Panel** - Manage products, orders, and users
- 📊 **Statistics** - View sales statistics with charts

## Tech Stack

- **Vite** - Build tool
- **React** - UI library (JSX only, no TypeScript)
- **React Router** - Routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **react-i18next** - Internationalization
- **Recharts** - Charts
- **React Context** - State management

## Project Structure

```
src/
 ├ api/              # MockAPI endpoints
 ├ components/       # Reusable components
 ├ pages/           # Page components
 ├ context/         # Context providers
 ├ i18n/           # Translation files
 ├ utils/          # Utility components
 ├ App.jsx         # Main app component
 └ main.jsx        # Entry point
```

## MockAPI Endpoints

- **Products**: https://6968854769178471522ab887.mockapi.io/productss
- **Users**: https://6968854769178471522ab887.mockapi.io/users
- **Orders**: https://6969e5563a2b2151f8467c2f.mockapi.io/orders
- **Reviews**: https://6969e4093a2b2151f8467813.mockapi.io/reviews
- **Favorites**: https://6969e4093a2b2151f8467813.mockapi.io/favorites
- **Bookings**: https://6969e5563a2b2151f8467c2f.mockapi.io/bookings

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MebelMart
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Deploy to Vercel

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

The `vercel.json` file is already configured for SPA routing.

## Usage

### Authentication

- Register a new account or login with existing credentials
- Admin users can access the admin panel
- User data is stored in localStorage

### Shopping

1. Browse the catalog
2. Use filters to find specific items
3. Add items to cart
4. Proceed to checkout
5. Complete order with address and phone

### Admin Panel

- Access at `/admin` (admin role required)
- Manage products (add, edit, delete)
- View and update order status
- View user list

## Data Storage

- **Authentication**: localStorage (token, user)
- **Cart**: localStorage
- **Favorites**: MockAPI
- **Theme**: localStorage
- **Language**: localStorage

## Routes

- `/` - Home page
- `/catalog` - Product catalog
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout (protected)
- `/orders` - User orders (protected)
- `/booking` - Book appointment (protected)
- `/profile` - User profile (protected)
- `/login` - Login page
- `/register` - Registration page
- `/admin` - Admin dashboard (admin only)
- `/admin/products` - Manage products (admin only)
- `/admin/orders` - Manage orders (admin only)
- `/admin/users` - View users (admin only)
- `/404` - Not found page

## Development Notes

- Simple, student-level code
- No backend required
- All data via MockAPI
- localStorage for client-side state
- Responsive design
- Dark mode support
- Multilanguage support (KG, RU, EN)

## License

MIT
