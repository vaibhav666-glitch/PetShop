import React from "react";
import { View, Text, Button } from "react-native";
import { Controller, Control } from "react-hook-form";
import { launchImageLibrary } from "react-native-image-picker";
import { PetRegisterFormData } from "../modules/pet/schema/petRegistrationSchema";

interface Props {
  control: Control<PetRegisterFormData>;
  error?: string;
}

export const ImagePickerField = ({ control, error }: Props) => {
  const pickImage = async (onChange: any) => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 5,
      },
      (response) => {
        if (response.didCancel || response.errorCode) return;

        const formatted =
          response.assets?.map((img) => ({
            uri: img.uri!,
            type: img.type || "image/jpeg",
            fileName: img.fileName || "photo.jpg",
            fileSize: img.fileSize,
          })) || [];

        onChange(formatted);
      }
    );
  };

  return (
    <View>
      <Controller
        control={control}
        name="petImages"
        render={({ field: { onChange, value } }) => (
          <>
            <Button
              title="Upload Images"
              onPress={() => pickImage(onChange)}
            />
            <Text>{value?.length || 0} images selected</Text>
          </>
        )}
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
};