import { json } from '@remix-run/node'
import { Container } from '@mantine/core'
import { useLoaderData } from '@remix-run/react'

import authenticator from '~/services/auth.server'
import { sessionStorage } from '~/services/session.server'

import LoginForm from '~/components/LoginForm'

import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import type FormError from '~/types/FormError'

export const action: ActionFunction = async ({ request, context }) => {
  const res = await authenticator.authenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/login',
    throwOnError: true,
    context,
  })
  return res
}

// this handles if a user is already logged in and mysteriously navigates to login
export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })

  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  )

  const error = session.get('sessionErrorKey')
  return json<any>({ error })
}

const LoginPage = () => {
  const loaderData = useLoaderData<FormError>()

  return (
    <Container py="10em" sx={{ maxWidth: "340px" }}>
      <LoginForm loaderData={loaderData} />
    </Container>
  )
}

export default LoginPage
