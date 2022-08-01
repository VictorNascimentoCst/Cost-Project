
import { useNavigate } from 'react-router-dom'
import style from '../pages/Newproject.module.css'
import ProjectForm from '../project/projectForm'

function NewProject() {

  const history = useNavigate()

  function createPost(project) {
    project.cost = 0
    project.services = []

    fetch('http://localhost:5000/projects', {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        history('/projects', {state:{message: 'Projeto criado com sucesso' }})
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={style.newproject_cointainer}>
      <h1 >Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  )
}
export default NewProject