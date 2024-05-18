import Api from "@/config/api";

export const getRequest = async (config) => {
  try {
    let response = await Api.get(config);
    let data = await response.data;
    return data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
