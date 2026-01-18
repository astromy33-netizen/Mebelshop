export const getProductId = (product) => {
  if (!product) return null;
  return product.id ?? product.productId ?? product.productID ?? product._id ?? null;
};
