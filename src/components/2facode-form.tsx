import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./ui/input-otp"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

export function VerifyCode() {
  const [code, setCode]=useState('');
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/verify-code`, {
        userId,
        code
      })

      if (response.status === 200) {
        alert("Login completo!")
        navigate("/home")
      }

    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("Código inválido ou expirado")
      } else {
        alert("Erro ao verificar código")
      }
    }
  }

 return (
    <div className="flex flex-col items-center justify-center gap-6">
      
      {/* ✅ Título */}
      <div className="text-center">
        <h1 className="text-xl font-semibold">
          Verificação em duas etapas
        </h1>
        <p className="text-sm text-muted-foreground">
          Digite o código enviado para seu email
        </p>
      </div>

      {/* ✅ Input OTP */}
      <InputOTP
        maxLength={6}
        value={code}
        onChange={(value) => setCode(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      {/* ✅ Botão */}
      <Button onClick={handleVerifyCode}>
        Verificar código
      </Button>
    </div>
  )
}