export function ProductsUpdate(updateProduct, updateVariant, productData, variantData, variantId) {
  updateProduct.mutate(productData
    , {
      onSuccess: ({ product }) => {
          console.log(product.title);
      },
      onError: (error) => {
          console.log("Error: ", error);
      }
  });
  updateVariant.mutate({
    variantData
  }, {
    onSuccess: ({ product }) => {
      console.log("Products updated successfully.");
    },
    onError: (error) => {
        console.log("Error: ", error);
    }
  });
  return console.log("Products updated successfully.");
}