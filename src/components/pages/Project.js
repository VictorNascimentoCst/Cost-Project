import style from '../pages/project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Load from '../layout/Load'
import Container from '../layout/container'
import ProjectForm from '../project/projectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import {parse, v4 as uuidv4} from 'uuid'

function Project() {
    const { id } = useParams()

    const [services, setServices] = useState([])
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage]  = useState()
    const [type, setType]  = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch(err => console.log(err))
        }, 5000)
    }, [id])

    function editPost(project) {
        setMessage('')
        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto ')
            setShowProjectForm('Error')
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function createService(project) {
        setMessage('')
        
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage("Projeto atualizado")
            setType("success")
            setShowServiceForm(false)
            
        })
        .catch((err) => console.log(err))

    }

    function removeService(id, cost) {

        const servicesUpdated = project.services.filter((service) => service.id !==id)

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso')
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {project.name ?
                (<div className={style.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message}/>}
                        <div className={style.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={style.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
                            {!showProjectForm ?
                                (<div className={style.project_info}><p><span>Categoria:</span> {project.category.name} </p>
                                    <p><span>Total de Orçamento:</span> {project.budget} </p>
                                    <p><span>Total utilizado:</span> {project.cost} </p>
                                </div>) :
                                (<div className={style.project_info}><ProjectForm handleSubmit={editPost}
                                    btnText="Concluir Edição"
                                    projectData={project} />
                                    </div>)}
                        </div>
                        <div className={style.service_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button className={style.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                            <div className={style.project_info}>
                                    {showServiceForm && (<ServiceForm
                                    handleSubmit={createService}
                                    btnText='Adicionar Serviço'
                                    projectData={project}
                                     />)}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 && 
                                services.map((service) =>(
                                <ServiceCard
                                id={service.id}
                                cost={service.cost}
                                description={service.description}
                                name={service.name}
                                key={service.id}
                                handleRemove={removeService}/>
                                    ))}
                            {services.length === 0 && <p>Não há serviço</p>}
                        </Container>
                    </Container>
                </div>)
                : (<Load />)}
        </>

    )
}
export default Project