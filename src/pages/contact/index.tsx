import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ContainerBanner from '../../components/containerWithBanner'

const formContactSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  content: z.string().max(300, { message: 'Maxímo de 300 caracteres' }),
  file: z.any().refine((val) => val.length > 0, 'File is required'),
})

type FormContactData = z.infer<typeof formContactSchema>

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormContactData>({
    resolver: zodResolver(formContactSchema),
  })

  async function handleFormContact(data: FormContactData) {
    console.log(data)
  }
  return (
    <div className="bg-slate-900 h-screen flex p-8 text-white">
      <ContainerBanner />
      <div className="flex-1 pt-20 flex flex-col items-center px-20">
        <h1 className="font-bold text-3xl">Formulario de contato</h1>

        <form
          onSubmit={handleSubmit(handleFormContact)}
          className="mt-8 w-full space-y-4  flex flex-col items-center"
        >
          <input
            type="text"
            {...register('name')}
            placeholder="Seu nome:"
            className="bg-transparent border border-slate-500 w-full py-1 px-4 rounded-lg placeholder:text-white"
          />
          {errors.name && (
            <span className="text-red-600 font-semibold">
              {errors.name.message}
            </span>
          )}

          <input
            type="email"
            {...register('email')}
            placeholder="Seu email:"
            className="bg-transparent border border-slate-500 w-full py-1 px-4 rounded-lg placeholder:text-white"
          />
          {errors.email && (
            <span className="text-red-600 font-semibold">
              {errors.email.message}
            </span>
          )}
          <textarea
            {...register('content')}
            placeholder="Maxímo de 300 caracteres"
            className="w-full bg-transparent border border-slate-500  py-1 px-4 rounded-lg placeholder:text-white"
          ></textarea>
          {errors.content && (
            <span className="text-red-600 font-semibold">
              {errors.content.message}
            </span>
          )}

          <div className="w-full">
            <label
              className="block mb-1 text-sm font-medium text-white"
              htmlFor="large_size"
            >
              Apenas PDF
            </label>
            <input
              className="block w-full text-lg text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400 "
              accept="application/pdf"
              type="file"
              {...register('file')}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-sky-700 py-2 px-4 w-full rounded-xl font-semibold hover:bg-sky-800 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}
