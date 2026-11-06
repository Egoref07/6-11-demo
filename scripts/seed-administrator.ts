import "dotenv/config";
import bcrypt from "bcrypt";
import { createDb } from "../src/lib/create-db";

const administratorAccount = {
  login: "Admin",
  fullName: "Администратор портала",
  phone: "8(000)000-00-00",
  email: "admin@korochki.est",
  role: "admin",
} as const;

async function seedAdministrator() {
  const seedDatabase = createDb();
  try {
    const administratorPasswordHash = await bcrypt.hash("KorokNET", 10);
    await seedDatabase.user.upsert({
      where: { login: administratorAccount.login },
      update: {},
      create: { ...administratorAccount, passwordHash: administratorPasswordHash },
    });
    console.log("Учётная запись администратора готова: Admin / KorokNET");
  } finally {
    await seedDatabase.$disconnect();
  }
}

seedAdministrator().catch((cause: unknown) => {
  console.error("Не удалось создать администратора:", cause);
  process.exitCode = 1;
});
