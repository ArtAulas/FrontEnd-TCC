import { useState } from "react"
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
import axios from "axios"

//EXPORT FUNCTION
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  
  // 🔥 ALTERAÇÃO 1: renomeado de "age" → "birthDate"
  const [birthDate, setBirthDate] = useState("")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // PASSWORD VALIDATOR
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }

    // 🔥 ALTERAÇÃO 2: validar data
    if (!birthDate) {
      alert("Selecione a data de nascimento")
      return
    }

    // CPF FUNCTION
    const cpfLimpo = cpf.replace(/\D/g, "")

    try {
      const response = await axios.post("http://localhost:3000/users", {
        name,
        email,
        cpf: cpfLimpo,
        password,

        // 🔥 ALTERAÇÃO 3: enviar birthDate (não age)
        birthDate: new Date(birthDate),
      })

      console.log("Usuário criado:", response.data)

      alert("Conta criada com sucesso!")

      navigate("/signin")

    } catch (error: any) {
      console.error("Erro ao cadastrar:", error)

      if (error.response) {
        alert(error.response.data.message || "Erro ao cadastrar usuário")
      } else {
        alert("Erro de conexão com o servidor")
      }
    }
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
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="your@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="birthDate">Birth date</FieldLabel>
              <Input
                id="birthDate"
                type="date"
                
                // 🔥 ALTERAÇÃO 4: setBirthDate
                onChange={(e) => setBirthDate(e.target.value)}
                
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="cpf">CPF</FieldLabel>
              <Input 
                id="cpf" 
                type="text" 
                placeholder="000.000.000-00" 
                inputMode="numeric"
                maxLength={14}
                onChange={(e) => setCpf(e.target.value)}
                required 
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input 
                id="password" 
                type="password"
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input 
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <a 
                    onClick={() => navigate("/signin")} 
                    className="cursor-pointer hover:underline"
                  >
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}