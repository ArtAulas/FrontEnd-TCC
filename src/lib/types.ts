export const Magnitudes = [
    {value:"MUNICIPAL", label:"Municipal (cidade)"},
    {value:"ESTADUAL", label:"Estadual (estado)"},
    {value:"FEDERAL", label:"Federal (país todo)"},
];

export const MAGNITUDES_LABEL = Object.fromEntries(
  Magnitudes.map(m => [m.value, m.label])
)

export const Temas = [
    {value:"SAUDE",label:"Saúde"},
    {value:"EDUCACAO",label:"Educação"},
    {value:"SEGURANCA",label:"Segurança"},
    {value:"TRANSPORTE",label:"Transporte"},
    {value:"MEIO_AMBIENTE",label:"Meio Ambiente"},
    {value:"TECNOLOGIA",label:"Tenologia/Inovação"},
    {value:"OUTRO",label:"Outros"},
]

export const TEMAS_LABEL = Object.fromEntries(
  Temas.map(t => [t.value, t.label])
)

export const Tipos = [
    {value:"SUGESTAO",label:"Sugestão"},
    {value:"PROBLEMA",label:"Problema"},
    {value:"APOIO",label:"Apoio"},
    {value:"CONSULTA",label:"Consulta"},
]

export const TIPOS_LABEL = Object.fromEntries(
  Tipos.map(t => [t.value, t.label])
)

export const Impactos = [
    {value:"SOCIAL",label:"Social"},
    {value:"ECONOMICO",label:"Econômico"},
    {value:"AMBIENTAL",label:"Ambiental"},
    {value:"OUTRO",label:"Outros"},
]

export const IMPACTOS_LABEL = Object.fromEntries(
  Impactos.map(i => [i.value, i.label])
)

export const Custos = [
    {value:"BAIXO",label:"Baixo"},
    {value:"MEDIO",label:"Médio"},
    {value:"ALTO",label:"Alto"},
    {value:"NAO_SEI",label:"Não sei"},
]

export const CUSTOS_LABEL = Object.fromEntries(
  Custos.map(c => [c.value, c.label])
)

export type Magnitude =
  | "MUNICIPAL"
  | "ESTADUAL"
  | "FEDERAL"

export type Tema =
  | "SAUDE"
  | "EDUCACAO"
  | "SEGURANCA"
  | "TRANSPORTE"
  | "MEIO_AMBIENTE"
  | "TECNOLOGIA"
  | "OUTRO"

export type Tipo =
  | "SUGESTAO"
  | "PROBLEMA"
  | "APOIO"
  | "CONSULTA"

export type Impacto =
  | "SOCIAL"
  | "ECONOMICO"
  | "AMBIENTAL"
  | "OUTRO"

export type Custo =
  | "BAIXO"
  | "MEDIO"
  | "ALTO"
  | "NAO_SEI"

export type ReactionType =
  | "LIKE"
  | "DISLIKE"

export type UserReaction = "LIKE" | "DISLIKE" | null

export type User = {
    id : string, 
    email : string, 
    name : string, 
    birthDate : string, 
    cpf : string,
    cidade : string, 
    estado : string
}

export type Post = {
  id: string

  title?: string
  content: string

  published: boolean

  authorId: string
  author: User

  parentId?: string | null
  parent?: Post | null
  comments: Post[]

  magnitude?: Magnitude | null
  tema?: Tema | null
  tipo?: Tipo | null
  impacto?: Impacto | null
  custo?: Custo | null

  likes: number
  dislikes: number

  userReaction?: UserReaction

  createdAt: string
}