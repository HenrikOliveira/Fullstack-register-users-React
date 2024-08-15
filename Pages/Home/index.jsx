import React, { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from "/src/assets/trash.svg"
import api from '../services/api.js'




// react Hook 




function Home() {
  
  // Estado para armazenar os usuários
  const [users, setUsers] = useState([]);
 

   const inputName = useRef()
   const inputAge = useRef()
   const inputEmail = useRef()


  // Função assíncrona para buscar os usuários
  async function getUsers(){
    try {
      const response = await api.get('/usuarios');
      // Atualiza o estado com os usuários obtidos
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }


  // Função assíncrona para Cria novo usuario 
  async function createUsers() {
    await api.post('/usuarios', {  // Adicionei uma vírgula aqui
      name: inputName.current.value,
      age: inputAge.current.value,  // Corrigi o nome da referência
      email: inputEmail.current.value  // Corrigi o nome da referência
    });
  }
  
// Função para deletar um usuario
async function deleteUser(userId) {
  try {
    await api.delete(`/usuarios/${userId}`);
    setUsers(users.filter(user => user.id !== userId)); // Remove o usuário da lista localmente
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
  }
}
  

    
  // useEffect para chamar getUsers quando o componente for montado
  useEffect(() => {
    getUsers();
  }, []);

  return (
      <div className='container'>
          <form> 
             <h1>Cadastro de usuários</h1>
             <input placeholder='Nome' name='nome' type="text" ref={inputName} />
             <input placeholder='Idade' name='idade' type="number" ref={inputAge} />
             <input placeholder='Email' name='email' type='email' ref={inputEmail} />
             <button type='button'onClick={createUsers} >Cadastrar</button>
          </form>
          
          {/* Renderiza a lista de usuários */}
          {users.map(user => (
            <div key={user.id} className="card">
              <div>
                <p>Nome: <span>{user.name}</span></p>
                <p>Idade: <span>{user.age}</span></p>
                <p>Email: <span>{user.email}</span></p>
              </div>
              <button onClick={() => deleteUser(user.id)}>
                <img src={Trash} alt="Deletar" />
              </button>
            </div>
          ))}
      </div>
  )
}

export default Home;
