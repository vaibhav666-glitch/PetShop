import { z } from "zod";

const imageSchema = z.object({
  uri: z.string().min(1, "Image URI is required"),
  type: z.string().startsWith("image/", "Only image files are allowed"),
  fileName: z.string().min(1, "File name is required"),
  fileSize: z
    .number()
    .max(5 * 1024 * 1024, "Each image must be less than 5MB")
    .optional(),
});

export const petRegisterSchema = z.object({
  petName: z.string().min(3, "Pet name must be at least 3 characters"),

  breed: z.string().min(3, "Breed must be at least 3 characters"),

  age: z.string().min(0, "Age cannot be negative"),

  price: z.string().min(0, "Price cannot be negative"),

  petImages: z
    .array(imageSchema)
    .min(3, "Please upload at least 3 images")
    .max(5, "You can upload maximum 5 images"),
});

export type PetRegisterFormData = z.infer<typeof petRegisterSchema>;