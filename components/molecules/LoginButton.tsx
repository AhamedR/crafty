import { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { storeToken } from '@/features/auth/authSlice'
import { useAppDispatch } from '@/app/hooks'
import Button from '../atoms/Button'
import { Col, Row } from 'react-bootstrap'

const LoginButton = () => {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()

  useEffect(() => {
    const token = session?.accessToken
    if (token) {
      dispatch(storeToken({token}))
    }

  }, [session, dispatch])

  return (
    <Row className='mt-5 mb-5'>
      <Col>
        {
          session ?
            <>
              <p>Signed in as {session?.user?.name}</p>
              <Button variant='danger' className='' onClick={() => signOut()}>Sign out</Button>
            </> :
            <>
              <p>Are you an admin ?</p>
              <Button className='ml-2' onClick={() => signIn()}>Sign in</Button>
            </>
        }
      </Col>
    </Row>
  )
}

export default LoginButton
