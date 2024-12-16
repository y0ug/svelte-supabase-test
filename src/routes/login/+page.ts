import { LoginType } from '$lib/types';
import type { PageLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ url, params, }) => {
  // const { session } = await safeGetSession()
  //
  // // if the user is already logged in return them to the account page
  // if (session) {
  //   redirect(303, '/account')
  // }

  const loginType = url.searchParams.get('type') === 'password'
    ? LoginType.EmailPassword
    : LoginType.MagicLink;

  return {
    url: url.origin,
    loginType
  }
}
