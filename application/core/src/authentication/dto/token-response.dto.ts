import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class TokenResponse {
  @Field()
  token: string
}
