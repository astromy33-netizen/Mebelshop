import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PrivateRoute } from './utils/PrivateRoute';
import { AdminGuard } from './utils/AdminGuard';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { Booking } from './pages/Booking';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { HelpCenter } from './pages/HelpCenter';
import { HelpTopic } from './pages/HelpTopic';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductAdd } from './pages/admin/AdminProductAdd';
import { AdminProductEdit } from './pages/admin/AdminProductEdit';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminUsers } from './pages/admin/AdminUsers';

import './i18n/config';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/catalog" element={<Catalog />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route
                        path="/checkout"
                        element={
                          <PrivateRoute>
                            <Checkout />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/orders"
                        element={
                          <PrivateRoute>
                            <Orders />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/booking"
                        element={
                          <PrivateRoute>
                            <Booking />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <PrivateRoute>
                            <Profile />
                          </PrivateRoute>
                        }
                      />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/help" element={<HelpCenter />} />
                      <Route path="/help/:topic" element={<HelpTopic />} />
                      <Route
                        path="/admin"
                        element={
                          <AdminGuard>
                            <AdminDashboard />
                          </AdminGuard>
                        }
                      />
                      <Route
                        path="/admin/products"
                        element={
                          <AdminGuard>
                            <AdminProducts />
                          </AdminGuard>
                        }
                      />
                      <Route
                        path="/admin/products/add"
                        element={
                          <AdminGuard>
                            <AdminProductAdd />
                          </AdminGuard>
                        }
                      />
                      <Route
                        path="/admin/products/edit/:id"
                        element={
                          <AdminGuard>
                            <AdminProductEdit />
                          </AdminGuard>
                        }
                      />
                      <Route
                        path="/admin/orders"
                        element={
                          <AdminGuard>
                            <AdminOrders />
                          </AdminGuard>
                        }
                      />
                      <Route
                        path="/admin/users"
                        element={
                          <AdminGuard>
                            <AdminUsers />
                          </AdminGuard>
                        }
                      />
                      <Route path="/404" element={<NotFound />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
