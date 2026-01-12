
import { prisma } from './config/db'



async function test() {
    const user = await prisma.user.create({
        data:{
            id: crypto.randomUUID(),
            email: "Myguy@guy.com",
            password: "hashed",
            name: "New_Guy",
            role: "user"
        },
    });
  console.log(user);
  process.exit(0);
}

test();

