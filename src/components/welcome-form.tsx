import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import fotoArthur from "../assets/foto_arthur.png"
import fotoGuilherme from "../assets/foto_guilherme.png"
import fotoRenato from "../assets/foto_renato.png"
import fotoVictor from "../assets/foto_victor.png"

export function Welcomeform() {
  const navigate = useNavigate();

  return (
    <>
      {/* Cabeçalho fixo */}
      <header className="fixed top-0 left-0 w-full bg-background border-b border-border z-50">
        <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-base font-medium">Projeto TCC</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/signin")}
            >
              Login
            </Button>
            <Button
              size="sm"
              onClick={() => navigate("/signup")}
            >
              Cadastre-se
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="w-full mt-16 py-10 flex flex-col gap-4">
        <div className="w-full mx-auto text-center">
            <h1 className="text-3xl font-medium">Projeto para Trabalho de Conclusão de Curso</h1>
        </div>
        <div className="w-full mx-auto text-center">
          <div className="pb-3">
            <h2 className="text-xl font-medium">
              Sobre o Projeto
            </h2>
            <hr className="border-border mt-1" />
          </div>
          <div className="text-sm text-muted-foreground flex flex-col gap-3">
            <p>Bem vindo(a) ao nosso trabalho de Conclusão de Curso, uma rede social voltada para participação política.</p>
            <p>Nosso objetivo com esse projeto é oferecer uma rede social que permita discussões e compartilhamento de ideias de forma saudável e produtiva.</p>
          </div>
        </div>

        <div className="w-full mx-auto text-center">
          <div className="pb-3">
            <h2 className="text-xl font-medium">
              Nossas Motivações
            </h2>
            <hr className="border-border mt-1" />
          </div>
          <div className="text-sm text-muted-foreground flex flex-col gap-3">
            <p>Fomos motivados a desenvolver esse projeto ao perceber a frequência em que conversas sobre política se tornavam discussões acaloradas, envolvendo xingamentos e ameaças.</p> 
            <p>Observando esse cenário, buscamos criar uma rede social em que as conversas possam acontecer de forma civilizada, sem xingamentos ou ameaças.</p>
          </div>
        </div>

        <div className="w-full mx-auto text-center">
          <div className="pb-3">
            <h2 className="text-xl font-medium">
              Sobre Nós
            </h2>
            <hr className="border-border mt-1" />
          </div>
          <div className="text-sm text-muted-foreground">
            <div className="flex justify-center gap-6">
              <img  src={fotoArthur}
                    alt="Arthur Carelli da Silva"
                    className="w-24 h-24 rounded-full object-cover" />
              <img  src={fotoGuilherme}
                    alt="Guilherme Carvalho de Oliveira"
                    className="w-24 h-24 rounded-full object-cover" />
              <img  src={fotoRenato}
                    alt="Renato Martin Garcia de Oliveira"
                    className="w-24 h-24 rounded-full object-cover" />
              <img  src={fotoVictor}
                    alt="Victor Scervino Brito"
                    className="w-24 h-24 rounded-full object-cover" />
            </div>
            <p>Somos estudantes de Sistemas de Informação, atuando em diversos ramos da área de tecnologia.</p>
          </div>
        </div>

      </main>
    </>
  );
}