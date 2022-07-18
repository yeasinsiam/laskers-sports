function activeMenuItem(url) {
  const arr = url.split("/");
  //default dashbord
  let defaultOpenKeys = [],
    defaultSelectedKeys = ["/"];

  // console.log(arr);

  if (arr[1] === "players") {
    defaultOpenKeys = [""];
    defaultSelectedKeys = ["players"];
  }
  if (arr[1] === "profile") {
    defaultOpenKeys = [""];
    defaultSelectedKeys = ["profile"];
  }
  if (arr[1] === "settings") {
    defaultOpenKeys = [""];
    defaultSelectedKeys = ["settings"];
  }

  // // images
  // if (arr[1] === "images") {
  //   defaultOpenKeys = ["images"];
  //   defaultSelectedKeys = ["all-images"];
  // }
  // if (arr[1] === "images" && arr[2] === "add-image") {
  //   defaultOpenKeys = ["images"];
  //   defaultSelectedKeys = ["add-image"];
  // }

  return {
    defaultOpenKeys,
    defaultSelectedKeys,
  };
}

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

export { activeMenuItem, formatDate };
