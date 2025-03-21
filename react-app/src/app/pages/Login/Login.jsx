import {useContext, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {AuthContext} from "../../../contexts/auth.jsx";
import {Alert, Input} from "@material-tailwind/react";
import {toast, ToastContainer} from "react-toastify";


export const Login = () => {

        const [sucess, setSucess] = useState(false)
        const [form, setForm] = useState({
            email: '',
            password: ''
        })
        const [error, setError] = useState("")
        const {signIn, signed} = useContext(AuthContext)



        async function handleSubmit(e) {
            e.preventDefault()
            const emptyValues = Object.values(form).some((value) => value === "") ? setError(<Alert className="mt-4" color="red">Preencha todos os campos</Alert>) : setError("")

            try {
                const data = {
                    email: form.email,
                    password: form.password
                }

                    await signIn(data).then((response) => {
                        if(response.error) {
                            setError(<Alert className="mt-4" color="red">{response.error}</Alert>)
                            return
                        } else {
                            toast.info("Logado com sucesso")
                        }
                    })

                setSucess(true)

            }catch (error) {
                console.log(error)
            }
        }

        return(
            signed ? <Navigate to={"/"} /> :
                <div className="flex h-screen w-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-neutral-50">
                    <ToastContainer />
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 bg-gray-50 rounded-2xl shadow-2xl">
                        <h2 className="font-semibold text-black flex justify-center w-full text-4xl mb-4">DevNotes</h2>
                        <form onSubmit={handleSubmit} className="space-y-6" >
                            <div>
                                <div className="mt-2">
                                    <Input
                                        type="text"
                                        color="black"
                                        label="E-mail"
                                        className="pr-20"
                                        containerProps={{
                                            className: "min-w-[288px]",
                                        }}
                                        onChange={e => {
                                            setForm({
                                                ...form,
                                                email: e.target.value
                                            }),
                                                setError("")
                                        }} autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-end">
                                    <div className="text-sm">
                                        <Link to="/forgetpasswordemail" className="font-semibold text-black hover:text-gray-600">Esqueceu sua senha?</Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Input
                                        type="password"
                                        color="black"
                                        label="Senha"
                                        className="pr-20"
                                        containerProps={{
                                            className: "min-w-[288px]",
                                        }}
                                        onChange={e => {
                                            setForm({
                                                ...form,
                                                password: e.target.value
                                            }),
                                                setError("")
                                        }} autoComplete="current-password"
                                    />
                                </div>
                                {error}
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Logar</button>
                            </div>
                            <div className="flex justify-center items-center">
                                <Link to="/register" className="font-semibold text-black hover:text-gray-600">Não tem uma conta? <b>Registre-se</b></Link>
                            </div>
                        </form>

                    </div>
                </div>
        )
}