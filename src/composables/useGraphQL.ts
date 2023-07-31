import { ref } from 'vue'
import { logErrorMessages } from '@vue/apollo-util'
import { provideApolloClient, useQuery, useMutation } from '@vue/apollo-composable'
import apolloClient from '../includes/apollo-config'
import useNotification from './useNotification'

// Require code to use apollo outside of setup()
provideApolloClient(apolloClient)

const queryRef = ref()
const { setNotification } = useNotification()

const useGraphQL = () => {

  const useQueryComposable = (query) => {
    queryRef.value = query
    const { result, loading, error } = useQuery(query)

    return { result, loading, error }
  }

  const useMutationComposable = (mutation) => {
    const { refetch: refetchListingsQuery } = useQuery(queryRef.value)
    const { mutate, onError, onDone } = useMutation(mutation)

    // When mutation is successful
    onDone(() => {
      refetchListingsQuery() // GET: Update memory cache
      setNotification("Listing has been deleted")
    })

    onError((error) => {
      logErrorMessages(error)
      // console.log('networkError', networkError)
      // console.log('graphQLErrors', graphQLErrors)
      // graphQLErrors.map(({ message }) => console.log(message))
    })

    return { mutate }
  }

  return { 
    useQueryComposable,
    useMutationComposable
  }
}

export default useGraphQL