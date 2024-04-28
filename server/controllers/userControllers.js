const { default: axios } = require("axios");

const FormData = require("form-data");

const userControllers = {
  createUser: async (req, res, next) => {
    let { username, firstname, lastname, password, email } = req.body;

    username = username.toLowerCase();

    const formData = new FormData();
    formData.append("moodlewsrestformat", "json");
    formData.append("wsfunction", "core_user_create_users");
    formData.append("wstoken", process.env.API_TOKEN);
    formData.append("users[0][username]", username);
    formData.append("users[0][firstname]", firstname);
    formData.append("users[0][lastname]", lastname);
    formData.append("users[0][password]", password);
    formData.append("users[0][email]", email);

    try {
      const response = await axios.post(
        `${process.env.LMS_URL}/webservice/rest/server.php`,
        formData,
        {
          headers: formData.getHeaders(),
        }
      );
      console.log(response.data);

      if (response.data?.errorcode) {
        throw { data: response.data };
      }

      res.status(200).send({
        isError: false,
        data: response.data,
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  userLogin: async (req, res, next) => {
    try {
      const formData = new FormData();

      formData.append("moodlewsrestformat", "json");
      formData.append("wsfunction", "user_login_webservice");
      formData.append("wstoken", process.env.API_TOKEN);
      formData.append("users[0][username]", "test");
      formData.append("users[0][password]", "test");

      const response = await axios.post(
        `${process.env.LMS_URL}/webservice/rest/server.php`,
        formData,
        {
          headers: formData.getHeaders(),
        }
      );
      console.log(response);

      res.status(200).send({
        isError: false,
        data: response.data,
        message: "Login success",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userControllers;
