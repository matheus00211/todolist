document.addEventListener('DOMContentLoaded', function () {
    // Seleciona os elementos do modal e botões de ação
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("open-modal");
    const closeModal = document.getElementsByClassName("close")[0];
    const addTaskButton = document.getElementById("adicionar-tarefa");
    const taskList = document.getElementById("lista-tarefas");
  
    // Variável para armazenar o elemento arrastado
    let draggingElement = null;
  
    // Função para abrir o modal de adicionar tarefa
    openModal.onclick = function () {
      modal.style.display = "block";
    };
  
    // Função para fechar o modal
    closeModal.onclick = function () {
      modal.style.display = "none";
    };
  
    // Fecha o modal clicando fora dele
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  
    // Função para adicionar uma nova tarefa
    addTaskButton.addEventListener('click', function () {
      const taskInput = document.getElementById("nova-tarefa").value;
      
      // Verifica se o campo de tarefa está vazio
      if (taskInput === "") return alert("Por favor, insira uma tarefa.");
  
      // Cria um novo item de tarefa (li)
      const taskItem = document.createElement("li");
      taskItem.textContent = taskInput;
      taskItem.setAttribute("draggable", true); // Permite que o item seja arrastável
  
      // Criar um contêiner para os botões de ação (navegar e remover)
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('actions');
  
      // Botão de navegação anterior
      const previousButton = document.createElement('button');
      previousButton.classList.add('nav-button');
      previousButton.textContent = "<";
      previousButton.addEventListener('click', function () {
        alert('Navegar para o status anterior (em desenvolvimento)'); // Placeholder de navegação
      });
  
      // Botão de navegação próximo
      const nextButton = document.createElement('button');
      nextButton.classList.add('nav-button');
      nextButton.textContent = ">";
      nextButton.addEventListener('click', function () {
        alert('Navegar para o próximo status (em desenvolvimento)'); // Placeholder de navegação
      });
  
      // Botão de remover tarefa
      const removeButton = document.createElement("button");
      removeButton.classList.add("remover-tarefa");
      removeButton.textContent = "Remover";
  
      // Função para remover a tarefa da lista
      removeButton.onclick = function () {
        taskItem.remove(); // Remove o item da lista
      };
  
      // Adiciona os botões ao contêiner de ações
      actionsDiv.appendChild(previousButton);
      actionsDiv.appendChild(nextButton);
      actionsDiv.appendChild(removeButton);
  
      // Adiciona o contêiner de ações ao item da tarefa
      taskItem.appendChild(actionsDiv);
  
      // Adiciona a nova tarefa à lista de tarefas
      taskList.appendChild(taskItem);
  
      // Exibe uma mensagem de confirmação de que a tarefa foi adicionada
      alert('Tarefa adicionada com sucesso!');
  
      // Limpa o campo de input após adicionar a tarefa
      document.getElementById("nova-tarefa").value = "";
  
      // Fecha o modal após adicionar a tarefa
      modal.style.display = "none";
  
      // Funções de arrastar e soltar para a nova tarefa adicionada
      taskItem.addEventListener('dragstart', function (e) {
        draggingElement = taskItem; // Armazena o item que está sendo arrastado
        setTimeout(function () {
          taskItem.style.display = 'none'; // Oculta temporariamente o item para facilitar a visualização ao arrastar
        }, 0);
      });
  
      taskItem.addEventListener('dragend', function (e) {
        setTimeout(function () {
          draggingElement.style.display = 'flex'; // Volta a exibir o item após soltar
          draggingElement = null; // Reseta o item arrastado
        }, 0);
      });
  
      // Configura as listas para receber os itens arrastados
      document.querySelectorAll('.lista').forEach(function (list) {
        list.addEventListener('dragover', function (e) {
          e.preventDefault(); // Previne o comportamento padrão para permitir o drop
        });
  
        list.addEventListener('drop', function (e) {
          if (draggingElement) {
            list.appendChild(draggingElement); // Move o item arrastado para a nova lista
          }
        });
      });
    });
  
    // Configura as funções de arrastar e soltar para as listas de tarefas existentes
    document.querySelectorAll('li').forEach(function (taskItem) {
      taskItem.addEventListener('dragstart', function (e) {
        draggingElement = taskItem; // Armazena o item arrastado
        setTimeout(function () {
          taskItem.style.display = 'none'; // Oculta o item temporariamente ao arrastar
        }, 0);
      });
  
      taskItem.addEventListener('dragend', function (e) {
        setTimeout(function () {
          draggingElement.style.display = 'flex'; // Exibe o item após o arraste
          draggingElement = null; // Reseta a referência ao item arrastado
        }, 0);
      });
    });
  
    // Adiciona a capacidade de drop para todas as listas
    document.querySelectorAll('.lista').forEach(function (list) {
      list.addEventListener('dragover', function (e) {
        e.preventDefault(); // Previne o comportamento padrão para permitir o drop
      });
  
      list.addEventListener('drop', function (e) {
        if (draggingElement) {
          list.appendChild(draggingElement); // Solta o item arrastado na nova lista
        }
      });
    });
  });
  // Selecionando os elementos
const tasks = document.querySelectorAll('li'); // Supondo que as tarefas sejam listadas em <li>
const statusContainers = document.querySelectorAll('.status');

// Adicionando eventos de arrastar e soltar
tasks.forEach(task => {
    task.setAttribute('draggable', 'true');

    task.addEventListener('dragstart', () => {
        task.classList.add('dragging');
    });

    task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
    });
});

statusContainers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permitir o drop
    });

    container.addEventListener('drop', (e) => {
        const draggingTask = document.querySelector('.dragging');
        
        // Mudar a cor da tarefa de acordo com o status
        if (container.classList.contains('em-progresso')) {
            draggingTask.style.backgroundColor = 'orange';
        } else if (container.classList.contains('em-revisao')) {
            draggingTask.style.backgroundColor = 'purple';
        } else if (container.classList.contains('concluida')) {
            draggingTask.style.backgroundColor = 'green';
        } else {
            draggingTask.style.backgroundColor = 'white'; // Cor padrão
        }

        // Adiciona a tarefa ao novo container
        container.appendChild(draggingTask);
    });
});
document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.todo-container').classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');

    // Alterar as classes dos itens da lista
    const items = document.querySelectorAll('li');
    items.forEach(item => {
        item.classList.toggle('dark-mode');
    });

    // Alterar o fundo do modal, se visível
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.classList.toggle('dark-mode');
    }
});
