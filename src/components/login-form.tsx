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
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e : any) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/login',{
          "email" : email,
          "password" : password
        })

      if (response.status===200){
        alert("Login realizado com sucesso")
      }
      localStorage.setItem("userId", response.data.user_id)
      navigate("/verify")

    } catch (error){
      alert("Erro ao realizar Login")
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Entre com sua conta</CardTitle>
          <CardDescription>
            Informe seu email para realizar login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@email.com"
                  required
                  value = {email}
                  onChange={(e:any) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required
                  value = {password}
                  onChange={(e:any) => setPassword(e.target.value)} 
                />
              </Field>
              <Field>
                <Button type="submit">Entrar</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Não tem uma conta?{" "}
                  <a onClick={() => navigate("/signup")} className="cursor-pointer hover:underline">
                    Cadastrar
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
