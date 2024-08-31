import bcrypt from "bcryptjs";

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (
  oriPassword: string,
  hashPassword: string
): Promise<boolean> => {
  return bcrypt.compare(oriPassword, hashPassword);
};
