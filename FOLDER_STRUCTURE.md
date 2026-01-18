# MebelMart - Project Structure

```
MebelMart/
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vercel.json
├── vite.config.js
└── src/
    ├── api/
    │   ├── bookings.js
    │   ├── favorites.js
    │   ├── orders.js
    │   ├── products.js
    │   ├── reviews.js
    │   └── users.js
    ├── components/
    │   ├── AddToCartButton.jsx
    │   ├── AdminLayout.jsx
    │   ├── AdminOrdersTable.jsx
    │   ├── AdminProductForm.jsx
    │   ├── AdminProductsTable.jsx
    │   ├── AdminUsersTable.jsx
    │   ├── BookingForm.jsx
    │   ├── BurgerMenu.jsx
    │   ├── CartItem.jsx
    │   ├── CartSummary.jsx
    │   ├── CheckoutForm.jsx
    │   ├── DatePickerSimple.jsx
    │   ├── EmptyState.jsx
    │   ├── ErrorBoundary.jsx
    │   ├── FavoriteButton.jsx
    │   ├── FiltersPanel.jsx
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   ├── LanguageSwitcher.jsx
    │   ├── ModalConfirm.jsx
    │   ├── OrderCard.jsx
    │   ├── OrdersList.jsx
    │   ├── Pagination.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductGallery.jsx
    │   ├── ProductGrid.jsx
    │   ├── RatingStars.jsx
    │   ├── ReviewForm.jsx
    │   ├── ReviewsList.jsx
    │   ├── SearchBar.jsx
    │   ├── SkeletonCard.jsx
    │   ├── SkeletonList.jsx
    │   ├── StatsChart.jsx
    │   ├── ThemeToggle.jsx
    │   └── TimeSlotsSimple.jsx
    ├── context/
    │   ├── AuthContext.jsx
    │   ├── CartContext.jsx
    │   ├── LanguageContext.jsx
    │   └── ThemeContext.jsx
    ├── i18n/
    │   ├── config.js
    │   └── locales/
    │       ├── en.json
    │       ├── kg.json
    │       └── ru.json
    ├── pages/
    │   ├── admin/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AdminOrders.jsx
    │   │   ├── AdminProductAdd.jsx
    │   │   ├── AdminProductEdit.jsx
    │   │   ├── AdminProducts.jsx
    │   │   └── AdminUsers.jsx
    │   ├── Booking.jsx
    │   ├── Cart.jsx
    │   ├── Catalog.jsx
    │   ├── Checkout.jsx
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── NotFound.jsx
    │   ├── Orders.jsx
    │   ├── ProductDetails.jsx
    │   ├── Profile.jsx
    │   └── Register.jsx
    ├── utils/
    │   ├── AdminGuard.jsx
    │   └── PrivateRoute.jsx
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## Component Count

- **API Files**: 6
- **Components**: 40+
- **Pages**: 16
- **Context Providers**: 4
- **Utils**: 2
- **Total Files**: 70+

## Key Features

✅ All MockAPI endpoints configured
✅ Complete i18n setup (KG, RU, EN)
✅ Dark/Light theme support
✅ Responsive design
✅ Admin panel with CRUD operations
✅ Shopping cart functionality
✅ User authentication
✅ Product reviews and ratings
✅ Booking system
✅ Order management
