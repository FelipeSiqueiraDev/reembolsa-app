import * as SecureStore from "expo-secure-store";

import { UserDTO } from "@dtos/userDTO";
import { USER_CREDENTIALS } from "@storage/storageConfig";

export async function saveUserCredentials(credentials: UserDTO) {
  try {
    await SecureStore.setItemAsync(
      USER_CREDENTIALS,
      JSON.stringify(credentials)
    );
  } catch (err) {
    throw err;
  }
}
