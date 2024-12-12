import { LoginType } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, params, locals: { safeGetSession } }) => {
  const { session } = await safeGetSession()

  // if the user is already logged in return them to the account page
  if (session) {
    redirect(303, '/account')
  }

  return { url: url.origin }
}

export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    const formData = await request.formData();
    const loginTypeParam = formData.get('loginType') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const loginType = loginTypeParam as keyof typeof LoginType;

    const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)
    if (!validEmail) {
      return fail(400, { errors: { email: 'Please enter a valid email address' }, email })
    }
    console.log('loginType', loginType);
    if (loginType == LoginType.EmailPassword) {
      console.log('EmailPassword login');
      // Validate input
      if (!email || !password) {
        return fail(400, { error: 'Email and password are required.' });
      }

      // Authenticate with Supabase
      const { error } = await locals.supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return fail(400, { error: error?.message || 'Invalid credentials.' });
      }

      // Redirect to profile page upon successful login
      throw redirect(303, '/profile');
    } else if (loginType == LoginType.MagicLink) {
      console.log('Magic login');
      const { data, error } = await locals.supabase.auth.signInWithOtp({
        email: email,
        options: {
          // set this to false if you do not want the user to be automatically signed up
          shouldCreateUser: true,
          // emailRedirectTo: 'https://example.com/welcome',
        },
      })
      if (error) {
        return fail(400, {
          success: false,
          email,
          message: `There was an issue, Please contact support.`,
        })
      }
      return {
        success: true,
        message: 'Please check your email for a magic link to log into the website.',
      }
    }


  },
};
