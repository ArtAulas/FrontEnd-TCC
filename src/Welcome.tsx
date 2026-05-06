import { Welcomeform } from "./components/welcome-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Welcomeform />
      </div>
    </div>
  )
}


