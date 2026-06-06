export type AdminUser = {
  email: string;
  password: string;
  institution: string;
  role: string;
};

export const ADMIN_USERS: AdminUser[] = [
  {
    email: "admin@uninacional.edu.co",
    password: "uninacional2024",
    institution: "Universidad Nacional de Colombia",
    role: "Registrador Académico",
  },
  {
    email: "admin@uniandes.edu.co",
    password: "uniandes2024",
    institution: "Universidad de los Andes",
    role: "Secretaría General",
  },
  {
    email: "admin@javeriana.edu.co",
    password: "javeriana2024",
    institution: "Pontificia Universidad Javeriana",
    role: "Registrador Académico",
  },
  {
    email: "admin@eafit.edu.co",
    password: "eafit2024",
    institution: "Universidad EAFIT",
    role: "Dirección Académica",
  },
];

export const SESSION_KEY = "zkcert_admin_session";

export type AdminSession = {
  email: string;
  institution: string;
  role: string;
  loginAt: number;
};
