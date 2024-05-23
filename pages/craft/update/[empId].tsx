import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

import { getCraftById, updateCraft } from '@/features/craft/craftSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import ICraft from '@/models/Craft'
import ManageCraft from '@/components/templates/ManageCraft'
import notify from '@/helpers/toast'

const UpdateCraft = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const dispatch = useAppDispatch()
  const craft = useAppSelector(state => state.craftSlice.selectedCraft)
  const isLoading = useAppSelector(state => state.craftSlice.loading)
  const error = useAppSelector(state => state.craftSlice.error)

  const { empId } = router.query
  const id = empId as string

  useEffect(() => {
    if (!session) {
      router.replace('/', undefined, { shallow: true })
      notify("Unauthorized!", 'warning')
    }
  }, [])

  useEffect(() => {
    const getCraft = (id: string) => {
      dispatch(getCraftById(id))
    }

    id && getCraft(id)
  }, [id, dispatch])

  useEffect(() => {
    if (error) {
      notify(`Failed! - ${error}`, 'error')
    }
  }, [error, router])

  const update = (craft: ICraft) => {
    dispatch(updateCraft({
      id: id,
      craft: craft
    })).then((response) => {
      if (response.payload) {
        notify("Update successful!")
        router.replace('/', undefined, { shallow: true })
      }
    })
  }

  return (
    <>
      <Head>
        <title>Update craft</title>
      </Head>
      <main>
        {isLoading && <LoadingSpinner/>}
        {!craft && !isLoading && 'Craft not found'}
        {!isLoading && craft && session && <ManageCraft craft={craft} onSubmit={update} />}
      </main>
    </>
  )
}

export default UpdateCraft
