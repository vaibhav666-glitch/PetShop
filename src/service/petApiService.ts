import axios from "axios";



export const uploadPetData = async (data: FormData) => {
  try {
    const response = await axios.post(
      "https://reqres.in/api/users",
      data,
     {headers: {
          "x-api-key": "reqres_4dd5ed6cb03e4d6689d626f8148f1089",
          "Content-Type": "multipart/form-data",
        }}
    );


    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRandomPet = async () => {
  try {
    const response = await axios.get(
      "https://dog.ceo/api/breeds/image/random",
      
    );

    return response.data;
  } catch (error) {
      console.error(error);
    
    throw error;
  }
};