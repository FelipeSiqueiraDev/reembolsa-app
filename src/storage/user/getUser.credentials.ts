import * as SecureStore from "expo-secure-store";

import { UserDTO } from "@dtos/userDTO";
import { USER_CREDENTIALS } from "@storage/storageConfig";

export async function getUserCredentials() {
  try {
    const userCredentials = await SecureStore.getItemAsync(USER_CREDENTIALS);
    const userData: UserDTO = userCredentials
      ? JSON.parse(userCredentials)
      : undefined;

    if (!userData) {
      throw userData;
    }

    return userData;
  } catch (err) {
    throw err;
  }
}
