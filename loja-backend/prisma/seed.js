const prisma = require('../src/models/PrismaService');
const bcrypt = require('bcrypt');

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);

  // Verifica se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { username: 'admin' },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        username: 'admin',
        password: passwordHash,
      },
    });
    console.log('✔️ Usuário admin criado com sucesso!');
  } else {
    console.log('Usuário admin já existe, pulando criação.');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
