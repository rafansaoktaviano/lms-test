const { default: axios } = require("axios");

const FormData = require("form-data");

const getCategoryName = require("./../services/getCategory");

const courseController = {
  createCourse: async (req, res, next) => {
    const formData = new FormData();

    const { fullname, shortname, categoryid, summary } = req.body;

    formData.append("moodlewsrestformat", "json");
    formData.append("wsfunction", "core_course_create_courses");
    formData.append("wstoken", process.env.API_TOKEN);
    formData.append("courses[0][fullname]", fullname);
    formData.append("courses[0][shortname]", shortname);
    formData.append("courses[0][categoryid]", categoryid);
    formData.append("courses[0][summary]", summary);

    try {
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
      res.status(200).send({
        isError: false,
        data: response.data,
        message: "Course created successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  getCourses: async (req, res, next) => {
    try {
      const formData = new FormData();

      formData.append("moodlewsrestformat", "json");
      formData.append("wsfunction", "core_course_get_courses");
      formData.append("wstoken", process.env.API_TOKEN);

      const response = await axios.post(
        `${process.env.LMS_URL}/webservice/rest/server.php`,
        formData,
        {
          headers: formData.getHeaders(),
        }
      );

      const courses = response.data;

      for (const course of courses) {
        const categoryId = course.categoryid;
        const categoryName = await getCategoryName(categoryId);
        course.categoryname = categoryName;
      }

      if (response.data?.errorcode) {
        throw { data: response.data };
      }

      res.status(200).send({
        isError: false,
        data: courses,
        message: "Courses data",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = courseController;
