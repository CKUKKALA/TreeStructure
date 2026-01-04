"use server";
import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

export const createUser = async (prevState, formData) => {
  console.log(prevState);
  console.log(formData);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const newUser = { firstName, lastName, id: Date.now().toString() };
  console.log(newUser);

  try {
    await saveUser(newUser);
    revalidatePath("/actions");

    // some logic
    return "User Created Successfully...";
  } catch (error) {
    console.log(error);
    return "failed to create user...";
  }
};

export const fetchUsers = async () => {
  const result = await readFile("users.json", { encoding: "utf8" });
  const users = result ? JSON.parse(result) : [];
  return users;
};

export const saveUser = async (user) => {
  console.log(user)
  const users = await fetchUsers();
  users.push(user);
  await writeFile("users.json", JSON.stringify(users));
};

export const deleteUser = async (formData) => {
  const id = formData.get("id");
  const users = await fetchUsers();
  const updatedUsers = users.filter((user) => user.id !== id);
  await writeFile("users.json", JSON.stringify(updatedUsers));
  revalidatePath("/actions");
};
export const removeUser = async (id, formData) => {
  const name = formData.get("name");
  // console.log(name);

  const users = await fetchUsers();
  const updatedUsers = users.filter((user) => user.id !== id);
  await writeFile("users.json", JSON.stringify(updatedUsers));
  revalidatePath("/actions");
};
