import * as dotenv from 'dotenv';

// .env config
dotenv.config({ path: '.env.local' });

export default async function getOfficerData(
  committeeName: string,
): Promise<object[]> {
  // Mock data to prevent build errors
  const officers = [
    {
      id: 1,
      position: 'President',
      name: 'John Doe',
      pronouns: 'he/him',
      email: 'johndoe@example.com',
      github: 'johndoe',
      imageURL: '/profile.png',
    },
    {
      id: 2,
      position: 'Vice President',
      name: 'Jane Smith',
      pronouns: 'she/her',
      email: 'janesmith@example.com',
      github: 'janesmith',
      imageURL: '/profile.png',
    },
  ];

  return officers.filter((officer) =>
    officer.position.toLowerCase().includes(committeeName.toLowerCase()),
  );
}
