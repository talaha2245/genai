import { cn } from "@/lib/utils"
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
import { useRef } from "react"
import axios from "axios"
import { baseUrl } from "@/store/user"
import { useAtom } from "jotai"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  // getting the base url 
  const [baseurl , _ ] = useAtom(baseUrl)
  // username and passwors

  const username = useRef("")
  const password = useRef("")
  const handleUserlogin = async() =>{
    console.log("this is the " + baseurl)
    const response = await axios({
      method : "post",
      url: baseurl + "/auth/login",
      data :{
        username : username.current,
        password : password.current
      }
    })
    console.log(response.data.msg == "error occured in auth" )
    if (response.data.msg == "error occured in auth"){
      alert("some Errro has occured")
    }
    else{

      alert("Sucessfully Logged in ")
    }
  }


  // useEffect(() => {
  //   handleUserlogin()
  // }, [])


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
       
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="username@app.com"
                  required
                  onChange={(e)=>{
                    username.current = e.target.value
                  }}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password </FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                  </a>
                </div>
                <Input id="password" type="password" required 
                onChange={(e)=>{
                  password.current = e.target.value
                }} />
              </Field>
              <Field>
                <Button type="submit" onClick={(e)=>{
                  e.preventDefault()
                  handleUserlogin()
                }}>Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    
    </div>
  )
}
