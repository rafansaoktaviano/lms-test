const { default: axios } = require("axios");
const FormData = require("form-data");

const getCategoryName = async (categoryId) => {
  try {
    const formData = new FormData();

    formData.append("moodlewsrestformat", "json");
    formData.append("wsfunction", "core_course_get_categories");
    formData.append("wstoken", process.env.API_TOKEN);
    formData.append("criteria[0][key]", "id");
    formData.append("criteria[0][value]", categoryId);

    const response = await axios.post(
      `${process.env.LMS_URL}/webservice/rest/server.php`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    if (response.data?.errorcode) {
      throw { data: response.data };
    }

    const category = response.data[0]; // Assuming there is only one category with the given ID
    return category ? category.name : "Category not found";
  } catch (error) {
    console.error("Error fetching category name:", error);
    return "Category not found";
  }
};

module.exports = getCategoryName;
