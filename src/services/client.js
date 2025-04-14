const client = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      status: "Success",
      data: data.results,
    };
  } catch (err) {
    return {
      status: "Error",
      message: err,
    };
  }
};

export default client;
