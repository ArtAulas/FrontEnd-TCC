import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./ui/field"
import { Input } from "./ui/input"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"

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

  const [estado, setEstado] = useState("")
  const [cidade, setCidade] = useState("")
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // PASSWORD VALIDATOR
    if (password !== confirmPassword) {
      toast.warning("As senhas não coincidem!")
      return
    }

    // 🔥 ALTERAÇÃO 2: validar data
    if (!birthDate) {
      toast.warning("Selecione a data de nascimento")
      return
    }

    if (!estado || !cidade){
      toast.warning("É necessário compartilhar sua localização.")
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

        cidade,
        estado
      })

      toast.success("Conta criada com sucesso!")

      navigate("/signin")

    } catch (error: any) {
      console.error("Erro ao cadastrar:", error)

      if (error.response) {
        toast.error(error.response.data.message || "Erro ao cadastrar usuário")
      } else {
        toast.error("Erro de conexão com o servidor")
      }
    }
  }

  const buscarLocal = async () =>{
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        )
        const data = await response.json()
        setEstado(data.address.state)
        setCidade(data.address.city)
      },
      (error) => {
        if (error.code===1){
          toast.error("Por Favor, permita acesso a sua localização.")
        }
        console.error(error)
      })}

  useEffect(()=>{
    buscarLocal()
  },[])

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crie uma conta</CardTitle>
        <CardDescription>
          Preencha suas informações abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
              <Input 
                id="name" 
                type="text" 
                placeholder="José Silva"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="josesilva@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FieldDescription>
                O email só será usado para identificação. Nós não iremos compartilhar suas informações
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="birthDate">Data de Nascimento</FieldLabel>
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

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="cidade">Cidade</FieldLabel>
                  <Input 
                    id="cidade" 
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    disabled={true}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="estado">Estado</FieldLabel>
                  <Input 
                    id="estado" 
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    disabled={true}
                  />
                </Field>
              </div>
                <FieldDescription>
                  Buscamos sua localização automaticamente, ela será exibida para outros usuários.
                  <br/>Guardamos somente o Estado e a Cidade em que você realizou o cadastro.
                  <br/>Por favor, permita que o navegador identifique sua localização.
                </FieldDescription>
            </div>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input 
                id="password" 
                type="password"
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <FieldDescription>
                Deve ter ao menos 8 caracteres.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirme a Senha
              </FieldLabel>
              <Input 
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FieldDescription>Por Favor, confirme sua senha.</FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit">Criar Conta</Button>

                <FieldDescription className="px-6 text-center">
                  Já tem uma conta?{" "}
                  <a 
                    onClick={() => navigate("/signin")} 
                    className="cursor-pointer hover:underline"
                  >
                    Entrar
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