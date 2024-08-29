// Reserved file for user queries that will often be used

export const getUserById = async (userId: string) => {
  // TODO: Implement this function when ready
  try {
    // const user = await db.select().from("users").where({ id: userId });
    // return user;
  } catch (error) {
    console.error("Error fetching user in getUserByID function: ", error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  // TODO: Implement this function when ready
  try {
    // const user = await db.select().from("users").where({ email: email });
    // return user;
  } catch (error) {
    console.error("Error fetching user in getUserByEmail function: ", error);
    return null;
  }
};
