import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    const { supabase } = locals;
    const formData = await request.formData();
    const email = formData.get('email') as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.log('error', error);
      throw fail(500, error.message);
    }
    return redirect(303, '/');
  },
};
