import style from '../project/projectForm.module.css'
import {useState} from 'react'
import Input from '../form/input'
import Submit from '../form/submit'

function ServiceForm ({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState({})

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
}

return(
    <form onSubmit={submit} className={style.form}>
            <Input
        type="text"
        text="Nome do serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}/>
            <Input
        type="number"
        text="Custo do serviço"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}/>
            <Input
        type="text"
        text="Descrição do serviço"
        name="description"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}/>
            <Submit
        text={btnText}/>
    </form>
)
}
export default ServiceForm