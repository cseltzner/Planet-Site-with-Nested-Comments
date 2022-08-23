export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateRegistration = (registrationData: RegistrationData) => {
  const { username, email, password, confirmPassword } = registrationData;
  if (!username) throw new Error("Username must be provided");
  if (!email) throw new Error("Email must be provided");
  if (!password) throw new Error("Password must be provided");
  if (!confirmPassword) throw new Error("Password must be provided");
  if (password !== confirmPassword) throw new Error("Passwords must match");
};
