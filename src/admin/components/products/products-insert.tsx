export function ProductsInsert(createProduct, items) {
  let success = false;
  createProduct.mutate({
    title: items["title"],
    handle: "insert-" + items["title"],
    is_giftcard: false,
    discountable: true,
    description: items["description"],
    metadata: {
      attribute1: {
        key: "UPC",
        value: items["upc"]
      },
      attribute2: {
        key: "Common Uses",
        value: items["commonUse"]
      },
      attribute3: {
        key: "UNIT",
        value: items["unit"]
      },
    },
    weight: items["weight"],
    length: items["length"],
    width: items["width"],
    height: items["height"],
    variants: [
      {
        title: items["title"],
        sku: items["sku"],
        prices: [
          {
            currency_code: "usd",
            amount: items["price"]
          }
        ],
        inventory_quantity: items["inventory"],
        metadata: {
          specificationName: items["specificationName"],
          specificationValue: items["specificationValue"]
        }
      }
    ]
  }, {
      onSuccess: ({ product }) => {
        success = true;
      },
      onError: (error) => {
        success = false;
        console.log("Error: ", error);
      }
  });
  return console.log("Import:", success);
}