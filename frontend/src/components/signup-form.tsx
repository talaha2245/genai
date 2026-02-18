import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRef } from "react"
import { baseUrl } from "@/store/user"
import { useAtom } from "jotai"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [baseurl , _] = useAtom(baseUrl)

  const username = useRef("")
  const password = useRef("")
  const handleSubmitButtonClicked = async () =>{
    const response = await axios({
      method : "post",
      url: baseurl + "/auth/signup",
      data:{
        username : username.current,
        password : password.current
      }
    })
    console.log(response.data)
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">User Name</FieldLabel>
              <Input
                id="Username"
                type="text"
                placeholder="m@example.com"
                required
                onChange={(e)=>{
                  username.current = e.target.value
                }}
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required 
              onChange={(e)=>{
                password.current = e.target.value
              }}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" onClick={(e)=>{
                  e.preventDefault()
                  handleSubmitButtonClicked()
                  
                }}>Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
