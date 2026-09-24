import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import defaultAvatar from '../assets/images/neelambika_portrait_1790233946216.jpg';

interface AvatarContextType {
  avatarUrl: string;
  isCustom: boolean;
  setAvatar: (dataUrl: string) => void;
  resetAvatar: () => void;
  openUploadModal: () => void;
  closeUploadModal: () => void;
  isUploadModalOpen: boolean;
}

const STORAGE_KEY = 'neelambika_portfolio_avatar';

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [avatarUrl, setAvatarUrlState] = useState<string>(defaultAvatar);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.startsWith('data:image/')) {
        setAvatarUrlState(saved);
        setIsCustom(true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setAvatar = (dataUrl: string) => {
    setAvatarUrlState(dataUrl);
    setIsCustom(true);
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl);
    } catch (e) {
      console.warn('Could not persist avatar to localStorage:', e);
    }
  };

  const resetAvatar = () => {
    setAvatarUrlState(defaultAvatar);
    setIsCustom(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  return (
    <AvatarContext.Provider
      value={{
        avatarUrl,
        isCustom,
        setAvatar,
        resetAvatar,
        openUploadModal,
        closeUploadModal,
        isUploadModalOpen,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};
