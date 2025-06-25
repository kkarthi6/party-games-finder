import React, { useState } from 'react';
import GameFinder from './components/GameFinder';
import AuthScreen from './components/AuthScreen';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <GameFinder user={user} onLogout={handleLogout} />;
}

export default App;