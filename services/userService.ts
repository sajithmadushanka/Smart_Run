
import { User } from "@/model/user.model";
import { getDb } from "./db";
export const registerUser = async (username: string, password: string) => {
  const db = getDb();

  try {
    await db.withTransactionAsync(async () => {
      const query = `INSERT INTO users (username, password) VALUES ('${username.toLowerCase()}', '${password}')`;
      await db.execAsync(query);
    });

    return { success: true };
  } catch (err: any) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return { success: false, error: "Username already exists" };
    }
    return { success: false, error: "Registration failed" };
  }
};

export const loginUser = async (username: string, password: string): Promise<User | null> => {
  const db = getDb();

  const result = await db.getAllAsync(
    `SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1`,
    [username.toLowerCase(), password]
  ) as User[];

  return result.length > 0 ? result[0] : null;
};
