"use client";

import { useEffect, useState } from "react";
import { ADMIN_USERS, AdminSession, SESSION_KEY } from "./config";

export const useAuth = () => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setSession(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const admin = ADMIN_USERS.find(u => u.email === email && u.password === password);
    if (!admin) return false;

    const newSession: AdminSession = {
      email: admin.email,
      institution: admin.institution,
      role: admin.role,
      loginAt: Date.now(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return { session, loading, login, logout, isAuthenticated: !!session };
};
