import { currentUser } from "@clerk/nextjs/server";
import { DbClient } from "@/db/prismaClient";

// a utility function just to check if the user exists in the db
// like of the very 1st login, make the new user entry to the db
export async function checkUser() {
  const user = await currentUser();
  if (!user) return null;

  try {
    const foundUser = await DbClient.User.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
    if (foundUser) return foundUser;

    // if user not found, create a new one

    const createdUser = await DbClient.User.create({
      data: {
        clerkUserId: user.id,
        name: user.fullName,
        username: user.username,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });

    return createdUser;
  } catch (error) {
    throw error;
  }
}
