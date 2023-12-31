import { apiZipCode } from '@/lib/zipCode-api'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const formZipCodeSchema = z.object({
  state: z
    .string()
    .min(2, { message: 'Precisa ter no minímo 2 caracteres' })
    .max(2, { message: 'Apenas a sigla do estado' })
    .transform((value) => value.toUpperCase()),
  city: z.string(),
  street: z.string(),
})

type FormZipCodeData = z.infer<typeof formZipCodeSchema>

interface ResponseZipCode {
  cep: string
  logradouro: string
  complemento?: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export default function ZipCode() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormZipCodeData>({
    resolver: zodResolver(formZipCodeSchema),
  })

  const [zipCode, setZipCode] = useState<Array<ResponseZipCode>>([])
  const [noZipCodeFound, setNoZipCodeFound] = useState(false)

  async function handleSearchZipCode(data: FormZipCodeData) {
    console.log(data)
    const res = await apiZipCode(
      `/${data.state}/${data.city}/${data.street}/json`,
    )
    if (res.data.length === 0) {
      setNoZipCodeFound(true)
    }
    setZipCode(res.data)
  }
  return (
    <>
      <div className="bg-slate-600 p-5 pr-5 rounded-3xl 2xl:w-1/2 xl:w-[50rem]">
        <form
          onSubmit={handleSubmit(handleSearchZipCode)}
          className="flex flex-col gap-2"
        >
          <label htmlFor="zipCode" className="">
            Não sabe seu CEP?
          </label>
          <div className="flex gap-4 ">
            <input
              type="text"
              placeholder="SP"
              required
              {...register('state')}
              className="rounded-lg bg-transparent border  border-slate-400 px-2 py-1 placeholder:text-slate-200 w-16"
            />

            <input
              type="text"
              placeholder="São Paulo"
              required
              {...register('city')}
              className="rounded-lg bg-transparent border border-slate-400 px-2 py-1 placeholder:text-slate-200"
            />

            <input
              type="text"
              {...register('street')}
              required
              placeholder="Avenida Paulista"
              className="rounded-lg bg-transparent border border-slate-400 px-2 py-1 placeholder:text-slate-200"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-sky-700 px-5 py-2 rounded-3xl hover:bg-sky-800 font-bold disabled:cursor-not-allowed"
            >
              Buscar
            </button>
          </div>
        </form>
        <div className="flex gap-4">
          {errors.state && (
            <span className="font-semibold text-red-500">
              {errors.state.message}
            </span>
          )}
        </div>
      </div>

      <div className="bg-slate-600 rounded-3xl p-5">
        <h1 className="mb-4 text-2xl font-semibold">
          Ceps disponíveis nesse endereço:
        </h1>
        {zipCode.length > 0 && (
          <div className="bg-slate-600">
            <ul className="grid  grid-cols-5 gap-2">
              {zipCode.map((cep) => (
                <li
                  className="p-2 border border-white text-slate-300"
                  key={cep.cep}
                >
                  <span className="text-white">CEP:</span> {cep.cep}
                </li>
              ))}
            </ul>
          </div>
        )}
        {zipCode.length === 0 && (
          <h1 className="text-red-500 text-lg font-semibold">
            {noZipCodeFound === true && (
              <h1>Não foi possivel achar nenhum cep nesse endereço</h1>
            )}
            {zipCode.length === 0 && noZipCodeFound === false && (
              <h1>Insira um endereço</h1>
            )}
          </h1>
        )}
      </div>
    </>
  )
}
