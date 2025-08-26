'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { toaster } from '@/components/ui/toaster';

export type UserRole = 'Requester' | 'Provider';

interface UserRoleContextType {
  userRole: UserRole;
  isProvider: boolean;
  toggleUserRole: () => void;
  setUserRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export const useUserRole = (): UserRoleContextType => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

// Safe version that returns null instead of throwing
export const useUserRoleSafe = (): UserRoleContextType | null => {
  const context = useContext(UserRoleContext);
  return context || null;
};

interface UserRoleProviderProps {
  children: ReactNode;
  defaultRole?: UserRole;
}

export const UserRoleProvider = ({ children, defaultRole = 'Requester' }: UserRoleProviderProps) => {
  const [userRole, setUserRole] = useState<UserRole>(defaultRole);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isProvider = userRole === 'Provider';

  const toggleUserRole = useCallback(() => {
    const newRole = userRole === 'Provider' ? 'Requester' : 'Provider';
    setUserRole(newRole);
    
    // Only show toast on client side after mounting
    if (mounted && typeof window !== 'undefined') {
      toaster.create({
        title: `Switched to ${newRole} mode`,
        description: `You are now viewing the platform as a ${newRole.toLowerCase()}.`,
        type: 'info',
        duration: 2500,
      });
    }
  }, [userRole, mounted]);

  const setUserRoleValue = useCallback((role: UserRole) => {
    setUserRole(role);
  }, []);

  const value = useMemo<UserRoleContextType>(() => ({
    userRole,
    isProvider,
    toggleUserRole,
    setUserRole: setUserRoleValue,
  }), [userRole, isProvider, toggleUserRole, setUserRoleValue]);

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};
