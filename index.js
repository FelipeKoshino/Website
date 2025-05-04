const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } //else {
    //To aways repeat the animation:
    //entry.target.classList.remove('show')
    //}
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
const menu = document.querySelector(".menu-1")


document.addEventListener('scroll', function () {
  const mensagens = document.querySelectorAll('.mensagem');
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const alturaMensagem = 58; // Altura aproximada de cada mensagem (ajuste conforme o seu CSS)
  let posicaoVertical = 20; // Posição vertical inicial da primeira mensagem (ajuste conforme necessário)

  mensagens.forEach(mensagem => {
    const apareceEm = parseInt(mensagem.dataset.apareceEm); // 6100, 6400, 6600, 6800

    if (scrollTop > apareceEm && !mensagem.classList.contains('animado')) {
      console.log("A scroll-Y ", apareceEm)
      mensagem.classList.add('visivel');
      if (mensagem.classList.contains('esquerda')) {
        mensagem.classList.add('animar-esquerda');
      } else if (mensagem.classList.contains('direita')) {
        mensagem.classList.add('animar-direita');
      }
      mensagem.style.top = `${posicaoVertical}px`; // Define a posição vertical da mensagem
      mensagem.classList.add('animado');
      posicaoVertical += alturaMensagem + 10; // Atualiza a posição para a próxima mensagem (adiciona margem)
    } else if (scrollTop <= apareceEm) {
      console.log("B scroll-Y ", apareceEm)
      mensagem.classList.remove('visivel');
      mensagem.classList.remove('animar-esquerda');
      mensagem.classList.remove('animar-direita');
      mensagem.classList.remove('animado');
      mensagem.style.top = '50%'; // Reseta a posição vertical para o estado inicial (centralizado)
    }
  });

  // Recalcula a posição vertical ao scrollar para cima para evitar sobreposição
  if (scrollTop < window.innerHeight) { // Se estiver no início da página, reseta tudo
    posicaoVertical = 20;
    mensagens.forEach(mensagem => {
      if (!mensagem.classList.contains('animado')) {
        mensagem.style.top = '50%';
      }
    });
  } else {
    posicaoVertical = 20;
    const mensagensAnimadas = document.querySelectorAll('.mensagem.animado');
    mensagensAnimadas.forEach(mensagem => {
      const mensagemId = parseInt(mensagem.dataset.mensagemId);
      mensagem.style.top = `${20 + (mensagemId - 1) * (alturaMensagem + 28)}px`;
    });
  }
});


window.addEventListener('scroll', function () {
  const nav = document.getElementById('mainNav');
  if (nav) {
    if (window.scrollY > 50) { // Ajuste este valor conforme necessário (a distância para ativar a transparência)
      nav.classList.add('nav-scrolled');
      menu.classList.add("sumir-m1")

    } else {
      nav.classList.remove('nav-scrolled');
      menu.classList.remove("sumir-m1")
    }
  }

});

//Toast messages
async function showToast(position, type) {
  let message = "";
  const toast = document.getElementById("toast");

  if(position !== ""){ toast.className = toast.className + ` ${position}` };
  if(type !== ""){ toast.className = toast.className + ` ${type}` };

  document.getElementById('myForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const dataa = Object.fromEntries(formData.entries());
    const webhookUrl = 'https://n8n.srv792540.hstgr.cloud/webhook/2b676df2-4e49-49d7-9817-8c8a09292a2a';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'bearer': 'd3v0lt44c4b4n4'
      },
      body: JSON.stringify(dataa)

    }).then(async response => {
      return response.text(); // Webhook Response gives 200 or 400

    })
      .then(data => {
        console.log(data); // Exibe mensagem de sucesso ou erro
        message = data; // Captura a mensagem de resposta do webhook
        console.log('Sucesso, dados enviados(não necessariamente registrados).');
        //alert(data); // Exibe mensagem de sucesso ou erro

      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Ocorreu um erro ao enviar os dados.'); // Mensagem genérica de erro de rede ou falha inesperada
      });

      
      if(message){ toast.innerText = message; }
      toast.className = toast.className + " show";
      
      setTimeout(function () {
        toast.className = toast.className.replace(" show", "");
      }, 10500);

  });

}