import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric";
  error?: string;
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  error,
}: Props<T>) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            value={value?.toString()}
            onChangeText={onChange}
          />
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
  error: { color: "red", marginTop: 5 },
});