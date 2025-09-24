const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const authApi = {
  signUp: async (data: SignUpData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Sign up failed');
    }
    
    return response.json();
  },

  signIn: async (data: SignInData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Sign in failed');
    }
    
    return response.json();
  },

  getProfile: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to get profile');
    }
    
    return response.json();
  },
};