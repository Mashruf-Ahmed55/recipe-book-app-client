import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import auth from '../Firebase/firebaseConfig';
import AxiosInstance from '../services/axiosInstance';

type User = {
  id?: string;
  name: string | '';
  email: string | '';
  photo_url: string | '';
  password?: string;
};

type AuthContextType = {
  user: User | null;
  logout: Function;
  signInWithGoogleHandler: Function;
  signInWithEmailAndPasswordHandler: Function;
  createUserWithEmailAndPasswordHandler: Function;
  updateUserProfile: Function;
  forgotPasswordHandler: Function;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await AxiosInstance.post('/api/users/login', {
          email: user.email,
        });
        setUser({
          id: response.data.user._id,
          name: response.data.user.name,
          email: response.data.user.email,
          photo_url: response.data.user.photo_url,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // LOG IN WITH GOOGLE
  const signInWithGoogleHandler = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;

      const response = await AxiosInstance.post('/api/users/create-user', {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        photo_url: loggedInUser.photoURL,
        auth_type: 'google',
      });

      setUser({
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        photo_url: response.data.user.photo_url,
      });
      toast.success('Signed in successfully.');
    } catch (error: any) {
      console.error('Google login error:', error);
      toast.error('Google sign-in failed.');
    }
  };

  // SIGN UP
  const createUserWithEmailAndPasswordHandler = async (data: User) => {
    const { email, password, name, photo_url } = data;

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password as string
      );

      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo_url,
      });

      const response = await AxiosInstance.post('/api/users/create-user', {
        name,
        email,
        photo_url: photo_url as string,
        auth_type: 'email',
      });
      setUser({
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        photo_url: response.data.user.photo_url,
      });
      toast.success('Sign up successfully.');
    } catch (error: any) {
      console.error('Email signup error:', error);
      toast.error('Sign up failed.');
    }
  };

  // LOG IN WITH EMAIL AND PASSWORD
  const signInWithEmailAndPasswordHandler = async (
    data: {
      email: string;
      password: string;
    },
    rememberMe: boolean
  ) => {
    console.log(data);
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    );

    const result = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = result.user;
    const response = await AxiosInstance.post('/api/users/login', {
      email: user.email,
    });
    setUser({
      id: response.data.user._id,
      name: response.data.user.name,
      email: response.data.user.email,
      photo_url: response.data.user.photo_url,
    });

    toast.success('Signed in successfully.');
  };

  const forgotPasswordHandler = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success('Check your email.');
          setTimeout(() => {
            window.open(
              'https://mail.google.com/',
              '_blank',
              'noopener,noreferrer'
            );
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  const updateUserProfile = async (name: string, photoURL: string) => {
    await updateProfile(auth.currentUser!, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        toast.success('Profile updated.');
        setUser({
          name: name,
          email: auth.currentUser?.email as string,
          photo_url: photoURL,
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //  LOG OUT
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };
  const value = {
    signInWithGoogleHandler,
    user,
    logout,
    signInWithEmailAndPasswordHandler,
    createUserWithEmailAndPasswordHandler,
    updateUserProfile,
    forgotPasswordHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
