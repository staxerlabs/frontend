// login.ts (or wherever your login logic is)
import supabase from './supabase';

async function login(email: string, password: string) {
  const { user, error } = await supabase.auth.signIn({ email, password });

  if (error) {
    console.error('Error logging in:', error.message);
    return;
  }

  if (user) {
    // Store user information in localStorage
    localStorage.setItem('user_id', user.id);
    // Redirect or perform other actions upon successful login
  }
}
