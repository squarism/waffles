import { Form } from '@remix-run/react'
import {
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Text,
} from '@mantine/core'
import { At, Lock, Login } from 'tabler-icons-react'
import type { FC } from 'react'
import type FormError from '~/types/FormError'

interface Props {
  loaderData: FormError
}

const LoginForm: FC<Props> = ({ loaderData }) => {
  return (
    <Form method='post' autoComplete='off'>
      <Stack>
        <TextInput
          name='email'
          label='Email'
          placeholder='Your Email'
          icon={<At size={16} />}
          required
        />
        <PasswordInput
          name='password'
          label='Password'
          placeholder='Your Password'
          icon={<Lock size={16} />}
          required
        />
        {loaderData?.error ? (
          <Text size='sm' color='red'>
            {loaderData?.error?.message}
          </Text>
        ) : null}
        <Button type='submit' rightIcon={<Login size={18} />}>
          Log In
        </Button>
      </Stack>
    </Form>
  )
}

export default LoginForm
