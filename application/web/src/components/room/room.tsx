import { Box, Spinner } from "@chakra-ui/react"
import {
  CallControls,
  type User as ChatUser,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { useEffect, useMemo } from "react"

import { useAuthUser } from "@/hooks/auth/use-auth-user"
import { useCreateStreamToken } from "@/hooks/auth/use-create-stream-token"
import { Route } from "@/routes/room.$roomId.lazy"

import "./room.css"

export function Room() {
  const auth = useAuthUser()
  const user = auth.data?.authUser.user
  if (!user) {
    throw new Error("User should be authenticated.")
  }
  const chatUser: ChatUser = useMemo(
    () => ({
      id: user.id,
      name: "Guest",
    }),
    [user]
  )

  const [createStreamToken, { data, loading }] = useCreateStreamToken()
  useEffect(() => {
    createStreamToken()
  }, [createStreamToken])

  if (loading) return <Spinner />
  const streamToken = data?.createStreamToken.token
  if (!streamToken) return null

  return (
    <Stream
      streamToken={streamToken}
      user={chatUser}
    />
  )
}

function Stream({
  streamToken,
  user,
}: {
  streamToken: string
  user: ChatUser
}) {
  const { roomId } = Route.useParams()
  const client = useMemo(
    () =>
      new StreamVideoClient({
        apiKey: "nkz32n9y386u",
        token: streamToken,
        user,
      }),
    [streamToken, user]
  )
  const call = useMemo(() => client.call("default", roomId), [client, roomId])
  useEffect(() => {
    call.join({ create: true })
    return () => {
      /**
       * @todo: fix why user doesn't leave on live reload.
       */
      call.leave()
    }
  }, [call])

  return (
    <Box h={"100vh"}>
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <SpeakerLayout participantsBarPosition="bottom" />
            <CallControls />
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    </Box>
  )
}
