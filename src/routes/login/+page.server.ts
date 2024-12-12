import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate input
    if (!email || !password) {
      return fail(400, { error: 'Email and password are required.' });
    }

    // Authenticate with Supabase
    const { data, error } = await locals.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return fail(400, { error: error?.message || 'Invalid credentials.' });
    }

    // Redirect to profile page upon successful login
    throw redirect(303, '/profile');
  },
};
