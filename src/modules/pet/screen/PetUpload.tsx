import React from "react";
import { View, Button } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petRegisterSchema, PetRegisterFormData } from "../schema/petRegistrationSchema";
import { FormInput } from "../../../components/FormInput";
import { ImagePickerField } from "../../../components/ImagePicker";
import { uploadPetData } from "../../../service/petApiService";
import Toast from "react-native-toast-message";

export const PetUpload = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PetRegisterFormData>({
    resolver: zodResolver(petRegisterSchema),
    defaultValues: {
      petName: "",
      breed: "",
      age: "",
      price: "",
      petImages: [],
    },
  });

 const onSubmit = async (data: PetRegisterFormData) => {
  try{

  
  const formData = new FormData();

  formData.append("petName", data.petName);
  formData.append("breed", data.breed);
  formData.append("age", String(data.age));
  formData.append("price", String(data.price));

  data.petImages.forEach((image, index) => {
    formData.append("images", {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    } as any);
  });

  const response=await uploadPetData(formData)
  if(response){
     Toast.show({
      type: 'success',
      text1: `Data Uploaded Successfully`,
      
    });
    reset()
    navigation.goBack()
  }
  }
  catch(err)
  {
     Toast.show({
      type: 'error',
      text1: `Failed to upload Data`,
      
    });
    console.error(err)
  }
  
};

  return (
    <View style={{ padding: 20 }}>
      <FormInput<PetRegisterFormData>
        control={control}
        name="petName"
        placeholder="Pet Name"
        error={errors.petName?.message}
      />

      <FormInput<PetRegisterFormData>
        control={control}
        name="breed"
        placeholder="Breed"
        error={errors.breed?.message}
      />

      <FormInput<PetRegisterFormData>
        control={control}
        name="age"
        placeholder="Age"
        keyboardType="numeric"
        error={errors.age?.message}
      />

      <FormInput<PetRegisterFormData>
        control={control}
        name="price"
        placeholder="Price"
        keyboardType="numeric"
        error={errors.price?.message}
      />
      <ImagePickerField
        control={control}
        error={errors.petImages?.message}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
  
    </View>
  );
};