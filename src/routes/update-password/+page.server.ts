import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const supabase = locals.supabase;
    const password = formData.get('password') as string;

    // Validate input
    if (!password) {
      return fail(400, { error: 'Password are required.' });
    }

    // Update user password 
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      return fail(400, { error: error?.message || 'Failed to update password.' });
    }

  },
};
