function activeMenuItem(url) {
  const arr = url.split("/");
  //default dashbord
  let defaultOpenKeys = [],
    defaultSelectedKeys = ["/"];

  // products
  if (arr[1] === "products") {
    defaultOpenKeys = ["products"];
    defaultSelectedKeys = ["all-products"];
  }
  if (arr[1] === "products" && arr[2] === "add-product") {
    defaultOpenKeys = ["products"];
    defaultSelectedKeys = ["add-product"];
  }
  // types

  if (arr[1] === "products" && arr[2] === "types") {
    defaultOpenKeys = ["products", "products-types"];
    defaultSelectedKeys = ["all-products-types"];
  }

  if (arr[1] === "products" && arr[2] === "types" && arr[3] === "add-type") {
    defaultOpenKeys = ["products", "products-types"];
    defaultSelectedKeys = ["add-products-types"];
  }

  // images
  if (arr[1] === "images") {
    defaultOpenKeys = ["images"];
    defaultSelectedKeys = ["all-images"];
  }
  if (arr[1] === "images" && arr[2] === "add-image") {
    defaultOpenKeys = ["images"];
    defaultSelectedKeys = ["add-image"];
  }

  return {
    defaultOpenKeys,
    defaultSelectedKeys,
  };
}
export { activeMenuItem };
