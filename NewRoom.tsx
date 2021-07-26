import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import {FormEvent} from "react";

import { Link, useHistory } from "react-router-dom";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useState } from "react";
import { database } from "../services/firebases";
import { useAuth } from "../hooks/useAuth";


export function NewRoom() {

  const {user} = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');
  

  async function handleCreateRoom(event: FormEvent) {
    //tira o evento de recarregar a pagina
    event.preventDefault();
    //trim verifica se tem espaco vazio, e nao dei criar a sala vazia
    if (newRoom.trim() === ''){
      return;
    }
    //criar um ref com o nome rooms no firebase 
    const roomRef = database.ref('rooms')
    const firebaseRoom = roomRef.push({
      title: newRoom,
      authorId: user?.id, 
    })
    //novo caminho com a key
    history.push(`/rooms/${firebaseRoom.key}`) 
  }

  return (
    <div id="page-author">
      <aside>
        <img src={illustrationImg} alt="ilustracao" />
        <strong>Crie salas de Q&amp; Ao vivo</strong>
        <p>Tire suas duvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo" />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input type="text" 
            placeholder="Nome da sala"
            onChange={event => setNewRoom(event.target.value)}
            value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala já existente?
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
