import axios from "axios";

/*
 * This function helps to put image to database. removing existing image replace new user images
 */
export async function putImage(body) {
  const { images, ...restOfBody } = body;

  const imageFormData = new FormData();
  imageFormData.append("avatar", images.avatar[0].originFileObj);
  imageFormData.append("cover", images.cover[0].originFileObj);

  const imageResponse = await axios.put(
    `/api/users/upload-profile-images`,
    imageFormData,
    {
      headers: { "Content-type": "multipart/form-data; boundary=XXX" },
    }
  );
  console.log(imageResponse);

  const newImages = {
    ...images,
  };

  const newBody = {
    images: newImages,
    restOfBody,
  };
  return newBody;
}
